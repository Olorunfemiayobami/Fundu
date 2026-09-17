"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import BasicInfo from "./components/BasicInfo";
import Story from "./components/Story";
import PreviewCampaign from "./components/PreviewCampaign";
import PublishCampaign from "./components/PublishCampaign";

import { saveCampaign } from "@/lib/saveCampaign";
import { supabase } from "@/lib/supabase";

import "./styles/campaignform.css";

function CreateCampaignContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const editId = searchParams.get("campaign") || searchParams.get("id");

  const isRestarting =
    searchParams.get("restart") === "true" && Boolean(editId);

  const [step, setStep] = useState(1);

  const [campaignId, setCampaignId] = useState(editId || null);

  const campaignIdRef = useRef(editId || null);

  const autosaveTimerRef = useRef(null);

  const loadingExistingRef = useRef(Boolean(editId));

  const saveInProgressRef = useRef(false);

  /*
   * Keep track of the campaign's database status.
   */
  const existingStatusRef = useRef(null);

  /*
   * Prevent a new campaign's draft activity from being
   * created more than once during autosave.
   */
  const draftActivityCreatedRef = useRef(Boolean(editId));

  /*
   * Keep the campaign's previous end date while restarting.
   */
  const originalEndDateRef = useRef("");

  /*
   * =========================================================
   * ORIGINAL CAMPAIGN SNAPSHOT
   * =========================================================
   *
   * This stores the campaign exactly as it existed before
   * the organizer started editing it.
   *
   * We use it to determine whether something actually changed.
   *
   * Autosave does NOT update this snapshot.
   */

  const originalCampaignRef = useRef({
    title: "",
    categoryId: "",
    goal: "",
    organiser: "",
    shortDescription: "",
    isPublic: true,
    storyBlocks: [],
    imageUrl: "",
    endDate: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  const [saveStatus, setSaveStatus] = useState("idle");

  const [isLoading, setIsLoading] = useState(Boolean(editId));

  const [isPublished, setIsPublished] = useState(false);

  const [campaignLink, setCampaignLink] = useState("");

  const [formData, setFormData] = useState({
    title: "",

    category: "",
    categoryId: "",

    goal: "",

    organiser: "",

    duration: "",

    imagePreview: "",
    coverImageFile: null,

    coverImage: "",
    cover_image: "",
    image_url: "",
    preview_image: "",

    coverImageChanged: false,

    currency: "NGN",
    country: "Nigeria",

    /*
     * All new campaigns are public by default.
     */
    isPublic: true,

    shortDescription: "",

    storyBlocks: [],
  });

  const [blocks, setBlocks] = useState([]);

  /*
   * =========================================================
   * KEEP CAMPAIGN ID REF UPDATED
   * =========================================================
   */

  useEffect(() => {
    campaignIdRef.current = campaignId;
  }, [campaignId]);

  /*
   * =========================================================
   * ACTIVITY HELPERS
   * =========================================================
   */

  const addCampaignActivity = async ({
    userId,
    campaignId: activityCampaignId,
    activityType,
    title,
    description,
    isNotification = false,
    metadata = {},
  }) => {
    if (!userId || !activityCampaignId) {
      return false;
    }

    try {
      const { error } = await supabase.from("activity_feed").insert({
        user_id: userId,
        campaign_id: activityCampaignId,
        activity_type: activityType,
        title,
        description,
        metadata,
        is_notification: isNotification,
        is_read: !isNotification,
        read_at: isNotification ? null : new Date().toISOString(),
      });

      if (error) {
        console.error(`Could not create ${activityType} activity:`, error);

        return false;
      }

      return true;
    } catch (error) {
      console.error(`Could not create ${activityType} activity:`, error);

      return false;
    }
  };

  /*
   * Convert story blocks to a stable string so we can
   * compare the old story with the new story.
   */

  const normalizeStoryBlocks = (storyBlocks = []) => {
    try {
      return JSON.stringify(Array.isArray(storyBlocks) ? storyBlocks : []);
    } catch {
      return "[]";
    }
  };

  /*
   * Normalize normal text before comparing it.
   *
   * This prevents harmless leading/trailing spaces from
   * being treated as a campaign edit.
   */

  const normalizeText = (value) => {
    return String(value ?? "").trim();
  };

  /*
   * Normalize goal amounts before comparing them.
   *
   * For example:
   * "50000" and 50000 should be considered the same value.
   */

  const normalizeGoal = (value) => {
    if (value === "" || value === null || value === undefined) {
      return "";
    }

    const number = Number(value);

    if (Number.isNaN(number)) {
      return normalizeText(value);
    }

    return String(number);
  };

  /*
   * Return whichever campaign image value is currently
   * available in the form.
   */

  const getCurrentCampaignImage = (data) => {
    return (
      data?.imagePreview ||
      data?.coverImage ||
      data?.cover_image ||
      data?.image_url ||
      data?.preview_image ||
      ""
    );
  };

  /*
   * =========================================================
   * LOAD EXISTING CAMPAIGN
   * =========================================================
   */

  useEffect(() => {
    if (!editId) {
      loadingExistingRef.current = false;

      setIsLoading(false);

      return;
    }

    let mounted = true;

    async function fetchCampaignData() {
      try {
        loadingExistingRef.current = true;

        setIsLoading(true);

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
          throw authError;
        }

        if (!user) {
          router.replace("/signin");
          return;
        }

        const { data, error } = await supabase
          .from("campaigns")
          .select("*")
          .eq("id", editId)
          .eq("creator_id", user.id)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (!data) {
          console.error(
            "Campaign not found or you do not have permission to edit it.",
          );

          return;
        }

        if (!mounted) {
          return;
        }

        /*
         * Remember the campaign's current database status.
         */

        existingStatusRef.current = data.status || null;

        /*
         * Existing campaign means we must never create a new
         * campaign_draft_created activity for this edit session.
         */

        draftActivityCreatedRef.current = true;

        /*
         * Category
         */

        let categoryName = "";

        if (data.category_id) {
          const { data: categoryRow, error: categoryError } = await supabase
            .from("categories")
            .select("id, name")
            .eq("id", data.category_id)
            .maybeSingle();

          if (categoryError) {
            console.error("Could not load category:", categoryError);
          }

          categoryName = categoryRow?.name || "";
        }

        /*
         * Story blocks
         */

        let parsedBlocks = [];

        if (Array.isArray(data.story_blocks)) {
          parsedBlocks = data.story_blocks;
        } else if (typeof data.story_blocks === "string") {
          try {
            parsedBlocks = JSON.parse(data.story_blocks);

            if (!Array.isArray(parsedBlocks)) {
              parsedBlocks = [];
            }
          } catch (parseError) {
            console.error("Could not parse campaign story blocks:", parseError);

            parsedBlocks = [];
          }
        }

        /*
         * Existing cover image
         */

        const existingImage =
          data.cover_image || data.image_url || data.preview_image || "";

        /*
         * Existing end date
         */

        let loadedEndDate = "";

        if (data.end_date) {
          loadedEndDate = String(data.end_date).slice(0, 10);
        } else if (
          data.duration &&
          typeof data.duration === "string" &&
          data.duration.includes("-")
        ) {
          loadedEndDate = data.duration.slice(0, 10);
        }

        originalEndDateRef.current = loadedEndDate;

        /*
         * =====================================================
         * SAVE ORIGINAL SNAPSHOT
         * =====================================================
         *
         * These are the values that existed in Supabase when
         * the organizer opened the campaign for editing.
         */

        originalCampaignRef.current = {
          title: data.title || "",

          categoryId: data.category_id || "",

          goal: data.goal_amount != null ? String(data.goal_amount) : "",

          organiser: data.organiser_name || "",

          shortDescription: data.short_description || data.description || "",

          isPublic: data.is_public !== false,

          storyBlocks: parsedBlocks,

          imageUrl: existingImage,

          endDate: loadedEndDate,
        };

        const existingEndDate = isRestarting ? "" : loadedEndDate;

        setCampaignId(data.id);

        campaignIdRef.current = data.id;

        setFormData((current) => ({
          ...current,

          title: data.title || "",

          category: categoryName,

          categoryId: data.category_id || "",

          goal: data.goal_amount != null ? String(data.goal_amount) : "",

          organiser: data.organiser_name || "",

          duration: existingEndDate,

          imagePreview: existingImage,

          coverImage: data.cover_image || "",

          cover_image: data.cover_image || "",

          image_url: data.image_url || "",

          preview_image: data.preview_image || "",

          coverImageFile: null,

          coverImageChanged: false,

          currency: data.currency || "NGN",

          country: data.country || "Nigeria",

          isPublic: data.is_public !== false,

          shortDescription: data.short_description || data.description || "",

          storyBlocks: parsedBlocks,
        }));

        setBlocks(parsedBlocks);

        if (isRestarting) {
          setStep(1);
        }
      } catch (error) {
        console.error("Error loading campaign for edit:", error);
      } finally {
        loadingExistingRef.current = false;

        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    fetchCampaignData();

    return () => {
      mounted = false;
    };
  }, [editId, isRestarting, router]);

  /*
   * =========================================================
   * SAVE CAMPAIGN
   * =========================================================
   */

  const handleSaveProcess = async (
    currentFormData = formData,
    currentBlocks = blocks,
    payoutDetails = null,
    isFinalPublish = false,
    options = {},
  ) => {
    const { silent = false } = options;

    if (saveInProgressRef.current) {
      return false;
    }

    saveInProgressRef.current = true;

    setIsSaving(true);
    setSaveStatus("saving");

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        setSaveStatus("error");

        if (!silent) {
          alert("Authentication error: Please sign in to save your campaign.");
        }

        return false;
      }

      /*
       * =========================================================
       * SAVE STATUS
       * =========================================================
       *
       * New campaign:
       * autosave / Save & Exit = draft
       * Publish = active
       *
       * Existing campaign:
       * preserve its existing status during normal edits
       *
       * Restart:
       * while editing = ended
       * final Publish = active
       */

      let statusToSave = "draft";

      if (isFinalPublish) {
        statusToSave = "active";
      } else if (isRestarting) {
        statusToSave = "ended";
      } else if (editId && existingStatusRef.current) {
        statusToSave = existingStatusRef.current;
      }

      /*
       * =========================================================
       * RESTART END DATE PROTECTION
       * =========================================================
       */

      let formDataToSave = currentFormData;

      if (isRestarting && !currentFormData.duration) {
        formDataToSave = {
          ...currentFormData,

          duration: originalEndDateRef.current || "",
        };
      }

      const previousCampaignId = campaignIdRef.current || editId || null;

      const result = await saveCampaign({
        campaignId: previousCampaignId,

        userId: user.id,

        formData: formDataToSave,

        blocks: currentBlocks,

        payoutDetails,

        status: statusToSave,
      });

      if (!result.success) {
        setSaveStatus("error");

        if (!silent) {
          alert("Save failed: " + result.error);
        }

        return false;
      }

      setCampaignId(result.campaignId);

      campaignIdRef.current = result.campaignId;

      /*
       * =========================================================
       * NEW DRAFT ACTIVITY
       * =========================================================
       */

      const isNewCampaign = !editId && !previousCampaignId;

      if (
        isNewCampaign &&
        !isFinalPublish &&
        !draftActivityCreatedRef.current
      ) {
        const activityCreated = await addCampaignActivity({
          userId: user.id,

          campaignId: result.campaignId,

          activityType: "campaign_draft_created",

          title: "Campaign draft created",

          description: `You created a draft for ${
            currentFormData.title?.trim() || "your campaign"
          }.`,

          isNotification: false,

          metadata: {
            campaign_title: currentFormData.title?.trim() || "",
          },
        });

        if (activityCreated) {
          draftActivityCreatedRef.current = true;
        }
      }

      /*
       * Replace temporary crop URL with
       * permanent Supabase image URL.
       */

      if (result.imageUrl && currentFormData.coverImageFile) {
        setFormData((current) => ({
          ...current,

          imagePreview: result.imageUrl,

          coverImage: result.imageUrl,

          cover_image: result.imageUrl,

          image_url: result.imageUrl,

          coverImageFile: null,

          coverImageChanged: false,
        }));
      }

      if (typeof window !== "undefined") {
        setCampaignLink(
          `${window.location.origin}/campaign/${result.campaignId}`,
        );
      }

      setSaveStatus("saved");

      return true;
    } catch (error) {
      console.error("Unexpected error saving campaign:", error);

      setSaveStatus("error");

      return false;
    } finally {
      saveInProgressRef.current = false;

      setIsSaving(false);
    }
  };

  /*
   * =========================================================
   * AUTOSAVE
   * =========================================================
   */

  useEffect(() => {
    if (isLoading || loadingExistingRef.current) {
      return;
    }

    const hasMeaningfulContent =
      Boolean(formData.title?.trim()) ||
      Boolean(formData.categoryId) ||
      Boolean(formData.goal) ||
      Boolean(formData.organiser?.trim()) ||
      Boolean(formData.duration) ||
      Boolean(formData.coverImageFile) ||
      Boolean(formData.imagePreview) ||
      blocks.length > 0;

    if (!hasMeaningfulContent) {
      return;
    }

    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current);
    }

    autosaveTimerRef.current = setTimeout(() => {
      if (saveInProgressRef.current) {
        return;
      }

      handleSaveProcess(formData, blocks, null, false, {
        silent: true,
      });
    }, 800);

    return () => {
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current);
      }
    };
  }, [formData, blocks, isLoading, isRestarting]);

  /*
   * =========================================================
   * SAVE AND EXIT
   * =========================================================
   */

  const handleSaveAndExit = async () => {
    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current);

      autosaveTimerRef.current = null;
    }

    while (saveInProgressRef.current) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const saved = await handleSaveProcess(formData, blocks, null, false);

    if (saved) {
      router.push("/campaigns");
    }
  };

  /*
   * =========================================================
   * CANCEL
   * =========================================================
   */

  const handleCancel = () => {
    if (isRestarting && editId) {
      router.push(`/campaigns/${editId}`);

      return;
    }

    router.push("/campaigns");
  };

  /*
   * =========================================================
   * PUBLISH
   * =========================================================
   */

  const handlePublish = async (payoutDetails) => {
    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current);

      autosaveTimerRef.current = null;
    }

    while (saveInProgressRef.current) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    /*
     * Extra restart protection.
     */

    if (isRestarting) {
      if (!formData.duration) {
        alert(
          "Choose a new campaign end date before restarting this campaign.",
        );

        setStep(1);

        return;
      }

      const selectedEndDate = new Date(`${formData.duration}T23:59:59`);

      const now = new Date();

      if (Number.isNaN(selectedEndDate.getTime()) || selectedEndDate <= now) {
        alert("Choose a future end date before restarting this campaign.");

        setStep(1);

        return;
      }
    }

    /*
     * =========================================================
     * CAPTURE VALUES BEFORE SAVING
     * =========================================================
     */

    const previousStatus = existingStatusRef.current;

    const originalCampaign = originalCampaignRef.current;

    /*
     * =========================================================
     * BASIC INFO CHANGES
     * =========================================================
     *
     * Campaign edited is now created ONLY when one or more
     * of these basic campaign values actually changed:
     *
     * title
     * category
     * goal
     * organizer
     * short description
     * visibility
     */

    const titleChanged =
      Boolean(editId) &&
      normalizeText(formData.title) !== normalizeText(originalCampaign.title);

    const categoryChanged =
      Boolean(editId) &&
      normalizeText(formData.categoryId) !==
        normalizeText(originalCampaign.categoryId);

    const goalChanged =
      Boolean(editId) &&
      normalizeGoal(formData.goal) !== normalizeGoal(originalCampaign.goal);

    const organiserChanged =
      Boolean(editId) &&
      normalizeText(formData.organiser) !==
        normalizeText(originalCampaign.organiser);

    const shortDescriptionChanged =
      Boolean(editId) &&
      normalizeText(formData.shortDescription) !==
        normalizeText(originalCampaign.shortDescription);

    const visibilityChanged =
      Boolean(editId) &&
      Boolean(formData.isPublic !== false) !==
        Boolean(originalCampaign.isPublic !== false);

    const basicInfoChanged =
      titleChanged ||
      categoryChanged ||
      goalChanged ||
      organiserChanged ||
      shortDescriptionChanged ||
      visibilityChanged;

    /*
     * =========================================================
     * STORY CHANGE
     * =========================================================
     */

    const storyChanged =
      Boolean(editId) &&
      normalizeStoryBlocks(blocks) !==
        normalizeStoryBlocks(originalCampaign.storyBlocks);

    /*
     * =========================================================
     * IMAGE CHANGE
     * =========================================================
     */

    const imageBeforeSave = getCurrentCampaignImage(formData);

    const imagesChanged =
      Boolean(editId) &&
      (formData.coverImageChanged === true ||
        Boolean(formData.coverImageFile) ||
        imageBeforeSave !== originalCampaign.imageUrl);

    /*
     * =========================================================
     * END DATE CHANGE
     * =========================================================
     */

    const currentEndDate = formData.duration || "";

    const endDateChanged =
      Boolean(editId) &&
      !isRestarting &&
      currentEndDate !== originalCampaign.endDate;

    /*
     * =========================================================
     * SAVE
     * =========================================================
     */

    const saved = await handleSaveProcess(
      formData,
      blocks,
      payoutDetails,
      true,
    );

    if (saved) {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        console.error("Could not get user for campaign activity:", authError);
      }

      const savedCampaignId = campaignIdRef.current || editId;

      const campaignTitle = formData.title?.trim() || "Your campaign";

      /*
       * =========================================================
       * NEW / DRAFT / RESTARTED CAMPAIGN
       * =========================================================
       */

      if (user?.id && savedCampaignId) {
        if (!editId || isRestarting || previousStatus !== "active") {
          await addCampaignActivity({
            userId: user.id,

            campaignId: savedCampaignId,

            activityType: "campaign_published",

            title: "Campaign published",

            description: `${campaignTitle} was published successfully.`,

            isNotification: false,

            metadata: {
              campaign_title: campaignTitle,
            },
          });
        } else {
          /*
           * =====================================================
           * EXISTING ACTIVE CAMPAIGN
           * =====================================================
           *
           * Each activity is now independent.
           *
           * This means several real changes can correctly create
           * several activity records during the same save.
           */

          /*
           * BASIC INFO
           */

          if (basicInfoChanged) {
            await addCampaignActivity({
              userId: user.id,

              campaignId: savedCampaignId,

              activityType: "campaign_edited",

              title: "Campaign edited",

              description: `You edited ${campaignTitle}.`,

              isNotification: false,

              metadata: {
                campaign_title: campaignTitle,

                changed_fields: {
                  title: titleChanged,
                  category: categoryChanged,
                  goal: goalChanged,
                  organiser: organiserChanged,
                  short_description: shortDescriptionChanged,
                  visibility: visibilityChanged,
                },
              },
            });
          }

          /*
           * STORY
           */

          if (storyChanged) {
            await addCampaignActivity({
              userId: user.id,

              campaignId: savedCampaignId,

              activityType: "campaign_story_updated",

              title: "Campaign story updated",

              description: `You updated the story for ${campaignTitle}.`,

              isNotification: false,

              metadata: {
                campaign_title: campaignTitle,
              },
            });
          }

          /*
           * IMAGES
           */

          if (imagesChanged) {
            await addCampaignActivity({
              userId: user.id,

              campaignId: savedCampaignId,

              activityType: "campaign_images_updated",

              title: "Campaign images updated",

              description: `You updated images for ${campaignTitle}.`,

              isNotification: false,

              metadata: {
                campaign_title: campaignTitle,
              },
            });
          }

          /*
           * END DATE
           */

          if (endDateChanged) {
            await addCampaignActivity({
              userId: user.id,

              campaignId: savedCampaignId,

              activityType: "campaign_end_date_changed",

              title: "Campaign end date changed",

              description: `You changed the end date for ${campaignTitle}.`,

              isNotification: false,

              metadata: {
                campaign_title: campaignTitle,

                previous_end_date: originalCampaign.endDate,

                new_end_date: currentEndDate,
              },
            });
          }

          /*
           * IMPORTANT:
           *
           * There is intentionally NO fallback
           * campaign_edited activity here.
           *
           * If nothing changed, no activity is created.
           */
        }
      }

      /*
       * =========================================================
       * UPDATE ORIGINAL SNAPSHOT
       * =========================================================
       *
       * The campaign was successfully saved.
       *
       * Its current values now become the baseline for any
       * future edit performed during this session.
       */

      originalCampaignRef.current = {
        title: formData.title || "",

        categoryId: formData.categoryId || "",

        goal: formData.goal || "",

        organiser: formData.organiser || "",

        shortDescription: formData.shortDescription || "",

        isPublic: formData.isPublic !== false,

        storyBlocks: blocks,

        imageUrl: getCurrentCampaignImage(formData),

        endDate: formData.duration || "",
      };

      /*
       * Once successfully published/re-published,
       * this campaign is active.
       */

      existingStatusRef.current = "active";

      /*
       * The newly selected date is now the campaign's
       * current end date.
       */

      originalEndDateRef.current = formData.duration || "";

      /*
       * If this was a brand-new campaign published before
       * draft activity was created, prevent any later draft
       * activity from being created in this session.
       */

      draftActivityCreatedRef.current = true;

      setIsPublished(true);
    }
  };

  /*
   * =========================================================
   * NEXT STEP
   * =========================================================
   */

  const nextStep = async () => {
    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current);

      autosaveTimerRef.current = null;
    }

    while (saveInProgressRef.current) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    if (step === 1 || step === 2) {
      const saved = await handleSaveProcess();

      if (!saved) {
        return;
      }
    }

    setStep((previousStep) => Math.min(4, previousStep + 1));
  };

  /*
   * =========================================================
   * PREVIOUS STEP
   * =========================================================
   */

  const prevStep = () => {
    setStep((previousStep) => Math.max(1, previousStep - 1));
  };

  const steps = [
    {
      id: 1,
      label: "Basic Info",
    },
    {
      id: 2,
      label: "Story",
    },
    {
      id: 3,
      label: "Preview",
    },
    {
      id: 4,
      label: "Publish",
    },
  ];

  /*
   * =========================================================
   * LOADING
   * =========================================================
   */

  if (isLoading) {
    return (
      <div
        className="create-campaign-page"
        style={{
          justifyContent: "center",

          alignItems: "center",

          minHeight: "70vh",
        }}
      >
        <div className="spinner" />

        <p
          style={{
            marginTop: "12px",
          }}
        >
          Loading your campaign...
        </p>
      </div>
    );
  }

  /*
   * =========================================================
   * SUCCESS SCREEN
   * =========================================================
   */

  if (isPublished) {
    return (
      <div
        className="create-campaign-page"
        style={{
          justifyContent: "center",

          alignItems: "center",

          minHeight: "80vh",
        }}
      >
        <div
          className="success-card-container"
          style={{
            backgroundColor: "#fff",

            padding: "40px",

            borderRadius: "24px",

            boxShadow: "0px 10px 30px rgba(0,0,0,0.05)",

            textAlign: "center",

            maxWidth: "420px",

            width: "90%",

            border: "1px solid #F0F0F0",
          }}
        >
          <div
            className="success-icon-circle"
            style={{
              width: "80px",

              height: "80px",

              backgroundColor: "#1B827F",

              borderRadius: "50%",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              margin: "0 auto 24px",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13L9 17L19 7"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h2
            style={{
              fontSize: "24px",

              fontWeight: "700",

              color: "#0A0A0A",

              marginBottom: "8px",
            }}
          >
            {isRestarting
              ? "Your campaign is live again! 🥳"
              : "Your campaign is live! 🥳"}
          </h2>

          <p
            style={{
              color: "#666",

              marginBottom: "32px",

              lineHeight: "1.5",
            }}
          >
            {isRestarting
              ? "Your campaign has been restarted successfully with its new end date."
              : "Congratulations! Your campaign has been published successfully."}
          </p>

          <button
            type="button"
            onClick={() => {
              window.location.href = campaignLink;
            }}
            style={{
              width: "100%",

              height: "48px",

              backgroundColor: "#1B827F",

              color: "#fff",

              borderRadius: "8px",

              border: "none",

              fontWeight: "600",

              fontSize: "16px",

              cursor: "pointer",

              marginBottom: "16px",
            }}
          >
            View Campaign
          </button>

          <div
            style={{
              display: "flex",

              gap: "12px",
            }}
          >
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(campaignLink);

                  alert("Link copied!");
                } catch (error) {
                  console.error("Could not copy link:", error);
                }
              }}
              style={{
                flex: 1,

                height: "48px",

                borderRadius: "8px",

                border: "1px solid #E0E0E0",

                backgroundColor: "#fff",

                fontWeight: "500",

                cursor: "pointer",
              }}
            >
              Copy Link
            </button>

            <button
              type="button"
              onClick={async () => {
                if (navigator.share) {
                  try {
                    await navigator.share({
                      title: formData.title || "Fundu Campaign",

                      url: campaignLink,
                    });
                  } catch (error) {
                    if (error?.name !== "AbortError") {
                      console.error("Could not share campaign:", error);
                    }
                  }
                } else {
                  try {
                    await navigator.clipboard.writeText(campaignLink);

                    alert("Campaign link copied!");
                  } catch (error) {
                    console.error("Could not copy campaign link:", error);
                  }
                }
              }}
              style={{
                flex: 1,

                height: "48px",

                borderRadius: "8px",

                border: "1px solid #E0E0E0",

                backgroundColor: "#fff",

                fontWeight: "500",

                cursor: "pointer",
              }}
            >
              Share
            </button>
          </div>
        </div>
      </div>
    );
  }

  /*
   * =========================================================
   * MAIN CREATE / EDIT / RESTART UI
   * =========================================================
   */

  return (
    <div className="create-campaign-page">
      <div className="create-campaign-header">
        <button
          type="button"
          className="create-page-back"
          onClick={() => {
            if (isRestarting && editId) {
              router.push(`/campaigns/${editId}`);

              return;
            }

            router.push("/campaigns");
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M15.8333 10H4.16663"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M9.99996 15.8333L4.16663 10L9.99996 4.16667"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span>Back to Campaigns</span>
        </button>

        <div className="create-campaign-heading">
          <h1>
            {isRestarting
              ? "Restart Campaign"
              : editId
                ? "Edit Campaign"
                : "Create Campaign"}
          </h1>

          <p>
            {isRestarting
              ? "Review your campaign and choose a new end date to restart it."
              : editId
                ? "Update your campaign details and story."
                : "Set up your campaign and tell people what you need support for."}
          </p>
        </div>

        {saveStatus !== "idle" && (
          <div className={`autosave-status autosave-status--${saveStatus}`}>
            {saveStatus === "saving" && "Saving..."}

            {saveStatus === "saved" && "Saved"}

            {saveStatus === "error" && "Couldn’t save"}
          </div>
        )}
      </div>

      <div className="create-campaign-content-card">
        <div className="campaign-inner-container">
          {/* PROGRESS */}

          <div className="progress-container-main">
            {steps.map((item, index) => (
              <React.Fragment key={item.id}>
                <div className="step-wrapper">
                  <div
                    className={`step-circle ${
                      step >= item.id ? "active" : "inactive"
                    }`}
                  >
                    {item.id}
                  </div>

                  <span
                    className={`step-label-bottom ${
                      step >= item.id ? "active" : "inactive"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div className="step-connector-line" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* BASIC INFO */}

          {step === 1 && (
            <BasicInfo
              formData={formData}
              setFormData={setFormData}
              onNext={nextStep}
              onSaveDraft={handleSaveProcess}
              onSaveAndExit={handleSaveAndExit}
              onCancel={handleCancel}
              isSaving={isSaving}
              isRestarting={isRestarting}
            />
          )}

          {/* STORY */}

          {step === 2 && (
            <Story
              formData={formData}
              setFormData={setFormData}
              blocks={blocks}
              setBlocks={setBlocks}
              onNext={nextStep}
              onBack={prevStep}
              onSaveDraft={handleSaveProcess}
              onSaveAndExit={handleSaveAndExit}
              onCancel={handleCancel}
              isSaving={isSaving}
            />
          )}

          {/* PREVIEW */}

          {step === 3 && (
            <div className="preview-step-wrapper">
              <PreviewCampaign
                campaignData={formData}
                blocks={blocks}
                onNext={nextStep}
                onBack={prevStep}
                onSaveAndExit={handleSaveAndExit}
                isSaving={isSaving}
              />
            </div>
          )}

          {/* PUBLISH */}

          {step === 4 && (
            <PublishCampaign
              onBack={prevStep}
              onPublish={handlePublish}
              onSaveAndExit={handleSaveAndExit}
              isSaving={isSaving}
              duration={formData.duration}
              campaignId={campaignId}
              campaignData={formData}
              setCampaignData={setFormData}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function CreateCampaign() {
  return (
    <Suspense
      fallback={
        <div className="create-campaign-page">
          <div className="spinner" />
        </div>
      }
    >
      <CreateCampaignContent />
    </Suspense>
  );
}
