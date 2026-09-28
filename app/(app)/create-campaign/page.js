"use client";

import LoadingScreen from "@/components/feedback/LoadingScreen";
import React, { Suspense, useEffect, useRef, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import BasicInfo from "./components/BasicInfo";
import ExploreDraftPreview from "./components/ExploreDraftPreview";
import useCreatorProfile from "./components/useCreatorProfile";
import CreateCampaignLayout from "./components/CreateCampaignLayout";
import ActionDialog from "@/components/feedback/ActionDialog";
import CampaignStorageImage from "@/components/campaigns/CampaignStorageImage";
import Story from "./components/Story";
import PreviewCampaign from "./components/PreviewCampaign";
import PublishCampaign from "./components/PublishCampaign";

import { saveCampaign } from "@/lib/saveCampaign";
import { supabase } from "@/lib/supabase";
import { legalAcceptanceRequest } from "@/lib/legalAcceptanceClient";

import "./styles/campaignform.css";
import "./styles/create-layout.css";

function CreateCampaignContent() {
  const router = useRouter();
  const creatorProfile = useCreatorProfile();
  const searchParams = useSearchParams();

  const editId = searchParams.get("campaign") || searchParams.get("id");

  const isRestarting =
    searchParams.get("restart") === "true" && Boolean(editId);

  const [step, setStep] = useState(1);
  const [isStoryUploading, setIsStoryUploading] = useState(false);

  const [campaignId, setCampaignId] = useState(editId || null);

  const campaignIdRef = useRef(editId || null);

  const autosaveTimerRef = useRef(null);

  const loadingExistingRef = useRef(Boolean(editId));

  const saveInProgressRef = useRef(false);
  const publishInProgressRef = useRef(false);
  const [publishing, setPublishing] = useState(false);
  const discardInProgressRef = useRef(false);
  const [isDiscarding, setIsDiscarding] = useState(false);
  const [discardOpen, setDiscardOpen] = useState(false);
  const [discardError, setDiscardError] = useState("");

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

  useEffect(() => {
    if (saveStatus !== "pending" && saveStatus !== "error") return;
    const warn = event => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [saveStatus]);

  const [isLoading, setIsLoading] = useState(Boolean(editId));

  const [publishError, setPublishError] = useState("");
  const [coverUploadFailed, setCoverUploadFailed] = useState(false);

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
        } else if (
          new URLSearchParams(window.location.search).get("preview") === "true"
        ) {
          setStep(3);
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

    if (discardInProgressRef.current || saveInProgressRef.current) {
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
        setCoverUploadFailed(result.failedStage === "cover");
        if (isFinalPublish) setPublishError("Couldn't publish. It's still a draft, and nothing is lost.");

        if (!silent && !isFinalPublish) {
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

      setSaveStatus("saved");
      setCoverUploadFailed(false);

      return true;
    } catch (error) {
      console.error("Unexpected error saving campaign:", error);

      setSaveStatus("error");
      if (isFinalPublish) setPublishError("Couldn't publish. It's still a draft, and nothing is lost.");

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
    if (discardInProgressRef.current || isLoading || loadingExistingRef.current) {
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

    setSaveStatus("pending");

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
    if (discardInProgressRef.current) return;
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

  const handleDiscardDraft = async () => {
    if (discardInProgressRef.current || (existingStatusRef.current && existingStatusRef.current !== "draft")) return;
    setDiscardError("");
    setDiscardOpen(true);
  };

  const confirmDiscardDraft = async () => {
    if (discardInProgressRef.current) return;
    discardInProgressRef.current=true; setIsDiscarding(true); setDiscardError("");
    clearTimeout(autosaveTimerRef.current); autosaveTimerRef.current=null;
    try {
      while(saveInProgressRef.current) await new Promise(resolve=>setTimeout(resolve,100));
      const id=campaignIdRef.current;
      if(id) {
        const {data:{user},error:authError}=await supabase.auth.getUser();
        if(authError || !user) throw new Error("Sign in again to discard your draft.");
        const {data,error}=await supabase.from("campaigns").delete().eq("id",id).eq("creator_id",user.id).eq("status","draft").select("id").maybeSingle();
        if(error) throw error;
        if(!data) throw new Error("This draft could not be deleted. It may already be published.");
      }
      router.push("/campaigns");
    } catch(error) {console.error("Could not discard draft:",error);setDiscardError("That didn't work. Nothing has changed yet. Try again."); discardInProgressRef.current=false; setIsDiscarding(false);}
  };

  const handleCancel = () => {
    if ((saveStatus === "pending" || saveStatus === "error") && !window.confirm("Your latest changes aren't saved yet. Leave this page?")) return;
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
    if (publishInProgressRef.current) return;
    publishInProgressRef.current = true;
    setPublishing(true);
    setPublishError("");
    try {
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

    // Give every publication a campaign-specific acceptance record before the
    // draft can become active. A brand-new campaign needs a draft ID first.
    if (!campaignIdRef.current && !editId) {
      const draftSaved = await handleSaveProcess(formData, blocks, null, false);
      if (!draftSaved) return;
    }
    try {
      await legalAcceptanceRequest("POST", {
        context: "campaign_publish",
        campaignId: campaignIdRef.current || editId,
      });
    } catch (error) {
      console.error("Could not record Terms acceptance:", error);
      setPublishError("Couldn't publish. It's still a draft, and nothing is lost.");
      return;
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

      router.replace(`/campaigns/${savedCampaignId}/published`);
    }
    } finally {
      publishInProgressRef.current = false;
      setPublishing(false);
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
      <LoadingScreen variant="list" label="Loading your campaign" />
    );
  }

  /*
   * =========================================================
   * MAIN CREATE / EDIT / RESTART UI
   * =========================================================
   */

  return (
    <CreateCampaignLayout
      isUploading={isStoryUploading}
      storyBlocks={blocks}
      sidebarPreview={step === 1 ? <ExploreDraftPreview formData={formData} creatorProfile={creatorProfile} /> : null}
      step={step}
      saveStatus={saveStatus}
      isSaving={isSaving}
      editId={editId}
      isRestarting={isRestarting}
      isDraft={existingStatusRef.current !== "active"}
      onSaveAndExit={handleSaveAndExit}
      onRetry={() => handleSaveProcess(formData, blocks, null, false, { silent: true })}
      onStepChange={setStep}
      onBack={handleCancel}
    >
      {step === 1 && (
            <BasicInfo
              profileName={creatorProfile.name}
              formData={formData}
              setFormData={setFormData}
              onNext={nextStep}
              onSaveDraft={handleSaveProcess}
              onSaveAndExit={handleSaveAndExit}
              onCancel={handleCancel}
              onDiscardDraft={handleDiscardDraft}
              coverUploadFailed={coverUploadFailed}
              onCoverChanged={() => setCoverUploadFailed(false)}
              onRetryCover={() => handleSaveProcess(formData, blocks, null, false, { silent: true })}
              isDraft={!existingStatusRef.current || existingStatusRef.current === "draft"}
              discardError={discardError}
              isSaving={isSaving || isDiscarding}
              isRestarting={isRestarting}
            />
          )}

      {step === 2 && (
            <Story
              onUploadingChange={setIsStoryUploading}
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

      {step === 3 && (
            <div className="preview-step-wrapper">
              <PreviewCampaign
                campaignId={campaignId}
                creatorProfile={creatorProfile}
                onEditStep={setStep}
                campaignData={formData}
                blocks={blocks}
                onNext={nextStep}
                onBack={prevStep}
                onSaveAndExit={handleSaveAndExit}
                isSaving={isSaving}
              />
            </div>
          )}

      {step === 4 && (
            <PublishCampaign
              onEditStep={setStep}
              onBack={prevStep}
              onPublish={handlePublish}
              onSaveAndExit={handleSaveAndExit}
              isSaving={isSaving || publishing}
              publishError={publishError}
              duration={formData.duration}
              campaignId={campaignId}
              campaignData={formData}
              setCampaignData={setFormData}
            />
          )}
      <ActionDialog open={discardOpen} onClose={() => setDiscardOpen(false)} busy={isDiscarding} error={discardError} title="Discard this draft?" description="This unpublished draft will be deleted. You can't get it back." icon="trash" tone="danger" safeLabel="Keep draft" actionLabel="Discard draft" busyLabel="Discarding…" onAction={confirmDiscardDraft}>
        <div className="action-dialog-campaign">{getCurrentCampaignImage(formData) && <CampaignStorageImage src={getCurrentCampaignImage(formData)} alt="" />}<div><small>Campaign</small><strong>{formData.title || "Untitled campaign"}</strong></div></div>
      </ActionDialog>
    </CreateCampaignLayout>
  );
}

export default function CreateCampaign() {
  return (
    <Suspense
      fallback={<LoadingScreen variant="list" label="Loading your campaign" />}
    >
      <CreateCampaignContent />
    </Suspense>
  );
}
