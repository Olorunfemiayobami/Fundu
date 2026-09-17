"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import "@/styles/campaign-detail.css";

export default function CampaignDetailPage() {
  const params = useParams();
  const router = useRouter();

  const campaignId = params?.id;

  const [campaign, setCampaign] = useState(null);
  const [creator, setCreator] = useState(null);
  const [category, setCategory] = useState(null);
  const [bankAccount, setBankAccount] = useState(null);
  const [activity, setActivity] = useState([]);
  const [campaignUpdates, setCampaignUpdates] = useState([]);

  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  const [showAmountModal, setShowAmountModal] = useState(false);
  const [newAmountRaised, setNewAmountRaised] = useState("");
  const [savingAmount, setSavingAmount] = useState(false);
  const [endingCampaign, setEndingCampaign] = useState(false);
  const [countdownNow, setCountdownNow] = useState(null);

  const [showRestartModal, setShowRestartModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingCampaign, setDeletingCampaign] = useState(false);

  /* =========================================================
     POST UPDATE
  ========================================================= */

  const [showPostUpdateModal, setShowPostUpdateModal] = useState(false);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContent, setUpdateContent] = useState("");
  const [updateImages, setUpdateImages] = useState([]);
  const [existingUpdateImages, setExistingUpdateImages] = useState([]);
  const [editingUpdate, setEditingUpdate] = useState(null);
  const [viewingUpdateImage, setViewingUpdateImage] = useState(null);
  const [postingUpdate, setPostingUpdate] = useState(false);
  const [updateError, setUpdateError] = useState("");

  const updateFileInputRef = useRef(null);

  useEffect(() => {
    if (campaignId) {
      loadCampaign();
    }
  }, [campaignId]);

  useEffect(() => {
    if (!campaign?.end_date || campaign?.status !== "active") {
      setCountdownNow(null);
      return;
    }

    const updateCountdown = () => {
      setCountdownNow(Date.now());
    };

    updateCountdown();

    const intervalId = window.setInterval(updateCountdown, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [campaign?.end_date, campaign?.status]);

  async function loadCampaign() {
    setLoading(true);
    setPageError("");

    try {
      /* =========================
         CURRENT USER
      ========================= */

      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        throw authError;
      }

      if (!authUser) {
        setPageError("You need to sign in to view this campaign.");
        setLoading(false);
        return;
      }

      /* =========================
         CAMPAIGN
      ========================= */

      const { data: campaignRow, error: campaignError } = await supabase
        .from("campaigns")
        .select(
          `
          id,
          creator_id,
          category_id,
          title,
          description,
          short_description,
          story_content,
          story_blocks,
          goal_amount,
          amount_raised,
          currency,
          country,
          cover_image,
          preview_image,
          image_url,
          status,
          start_date,
          end_date,
          created_at,
          updated_at
        `,
        )
        .eq("id", campaignId)
        .maybeSingle();

      if (campaignError) {
        throw campaignError;
      }

      if (!campaignRow) {
        setPageError("Campaign not found.");
        setLoading(false);
        return;
      }

      if (campaignRow.creator_id !== authUser.id) {
        setPageError("You do not have permission to manage this campaign.");
        setLoading(false);
        return;
      }

      setCampaign(campaignRow);
      setNewAmountRaised(String(Number(campaignRow.amount_raised || 0)));

      /* =========================
         CREATOR
      ========================= */

      const creatorPromise = supabase
        .from("users")
        .select("id, full_name, display_name, avatar_url")
        .eq("id", campaignRow.creator_id)
        .maybeSingle();

      /* =========================
         CATEGORY
      ========================= */

      const categoryPromise = campaignRow.category_id
        ? supabase
            .from("categories")
            .select("id, name, slug")
            .eq("id", campaignRow.category_id)
            .maybeSingle()
        : Promise.resolve({
            data: null,
            error: null,
          });

      /* =========================
         BANK ACCOUNT
      ========================= */

      const bankPromise = supabase
        .from("campaign_bank_accounts")
        .select(
          `
          id,
          campaign_id,
          user_id,
          account_holder_name,
          bank_name,
          account_number,
          account_type,
          is_active,
          is_verified,
          created_at,
          updated_at
        `,
        )
        .eq("campaign_id", campaignRow.id)
        .eq("is_active", true)
        .order("updated_at", {
          ascending: false,
        })
        .limit(1);

      /* =========================
         ACTIVITY
      ========================= */

      const activityPromise = supabase
        .from("activity_feed")
        .select(
          `
          id,
          user_id,
          activity_type,
          title,
          description,
          campaign_id,
          metadata,
          created_at
        `,
        )
        .eq("campaign_id", campaignRow.id)
        .order("created_at", {
          ascending: false,
        })
        .limit(30);

      /* =========================
         CAMPAIGN UPDATES
      ========================= */

      const updatesPromise = supabase
        .from("campaign_updates")
        .select(
          `
          id,
          campaign_id,
          user_id,
          title,
          content,
          image_urls,
          is_final_update,
          created_at,
          updated_at
        `,
        )
        .eq("campaign_id", campaignRow.id)
        .order("created_at", {
          ascending: false,
        });

      const [
        creatorResult,
        categoryResult,
        bankResult,
        activityResult,
        updatesResult,
      ] = await Promise.all([
        creatorPromise,
        categoryPromise,
        bankPromise,
        activityPromise,
        updatesPromise,
      ]);

      if (creatorResult.error) {
        console.error("Creator profile error:", creatorResult.error);
      }

      if (categoryResult.error) {
        console.error("Category error:", categoryResult.error);
      }

      if (bankResult.error) {
        console.error("Bank account error:", bankResult.error);
      }

      if (activityResult.error) {
        console.error("Campaign activity error:", activityResult.error);
      }

      if (updatesResult.error) {
        console.error("Campaign updates error:", updatesResult.error);
      }

      setCreator(creatorResult.data || null);
      setCategory(categoryResult.data || null);
      setBankAccount(bankResult.data?.[0] || null);
      setActivity(activityResult.data || []);
      setCampaignUpdates(updatesResult.data || []);
    } catch (error) {
      console.error("Campaign detail load error:", error);

      setPageError(
        error?.message || "Something went wrong while loading this campaign.",
      );
    } finally {
      setLoading(false);
    }
  }

  /* =========================================================
     DERIVED DATA
  ========================================================= */

  const organizerName = useMemo(() => {
    return creator?.display_name || creator?.full_name || "Campaign organizer";
  }, [creator]);

  const amountRaised = Number(campaign?.amount_raised || 0);

  const goalAmount = Number(campaign?.goal_amount || 0);

  const progressPercent =
    goalAmount > 0 ? (amountRaised / goalAmount) * 100 : 0;

  const progressBarPercent = Math.min(Math.max(progressPercent, 0), 100);

  const daysRemaining = calculateDaysRemaining(campaign?.end_date);

  const countdown = getCampaignCountdown(campaign?.end_date, countdownNow);

  const isExpired = campaignHasExpired(campaign);

  const isInactive =
    campaign?.status === "ended" ||
    campaign?.status === "inactive" ||
    campaign?.status === "completed" ||
    (campaign?.status === "active" && isExpired);

  const isActive = campaign?.status === "active" && !isInactive;

  const displayStatus = isInactive ? "ended" : campaign?.status;

  /* =========================================================
     POST UPDATE MODAL
  ========================================================= */

  function openPostUpdateModal() {
    cleanupUpdatePreviews();

    setEditingUpdate(null);
    setExistingUpdateImages([]);
    setUpdateTitle("");
    setUpdateContent("");
    setUpdateImages([]);
    setUpdateError("");
    setShowPostUpdateModal(true);

    if (updateFileInputRef.current) {
      updateFileInputRef.current.value = "";
    }
  }

  function closePostUpdateModal() {
    if (postingUpdate) {
      return;
    }

    cleanupUpdatePreviews();

    setEditingUpdate(null);
    setExistingUpdateImages([]);
    setUpdateImages([]);
    setUpdateTitle("");
    setUpdateContent("");
    setUpdateError("");
    setShowPostUpdateModal(false);

    if (updateFileInputRef.current) {
      updateFileInputRef.current.value = "";
    }
  }

  function cleanupUpdatePreviews() {
    updateImages.forEach((item) => {
      if (item?.previewUrl) {
        URL.revokeObjectURL(item.previewUrl);
      }
    });
  }

  function handleUpdateImageSelect(event) {
    const files = Array.from(event.target.files || []);

    if (!files.length) {
      return;
    }

    const availableSlots = Math.max(
      0,
      4 - existingUpdateImages.length - updateImages.length,
    );
    const validFiles = files
      .filter((file) => file.type?.startsWith("image/"))
      .slice(0, availableSlots);

    const newImages = validFiles.map((file) => ({
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`,

      file,

      previewUrl: URL.createObjectURL(file),
    }));

    setUpdateImages((current) => [...current, ...newImages]);
    setUpdateError("");

    event.target.value = "";
  }

  function removeUpdateImage(imageId) {
    setUpdateImages((current) => {
      const imageToRemove = current.find((item) => item.id === imageId);

      if (imageToRemove?.previewUrl) {
        URL.revokeObjectURL(imageToRemove.previewUrl);
      }

      return current.filter((item) => item.id !== imageId);
    });
  }

  function removeExistingUpdateImage(imageUrl) {
    setExistingUpdateImages((current) =>
      current.filter((url) => url !== imageUrl),
    );

    setUpdateError("");
  }

  async function uploadCampaignUpdateImages(userId) {
    if (!updateImages.length) {
      return [];
    }

    const uploadedUrls = [];

    for (const item of updateImages) {
      const file = item.file;

      if (!file) {
        continue;
      }

      const originalExtension =
        file.name?.split(".").pop()?.toLowerCase() || "jpg";

      const safeExtension =
        originalExtension === "jpeg"
          ? "jpg"
          : originalExtension.replace(/[^a-z0-9]/g, "") || "jpg";

      const uniqueId =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

      const filePath = `campaign-updates/${userId}/${campaign.id}/${uniqueId}.${safeExtension}`;

      const { error: uploadError } = await supabase.storage
        .from("campaign-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type || "image/jpeg",
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage
        .from("campaign-images")
        .getPublicUrl(filePath);

      if (!publicUrlData?.publicUrl) {
        throw new Error(
          "An update photo was uploaded, but its public URL could not be created.",
        );
      }

      uploadedUrls.push(publicUrlData.publicUrl);
    }

    return uploadedUrls;
  }

  async function handlePostCampaignUpdate(event) {
    event.preventDefault();

    if (!campaign?.id || postingUpdate) {
      return;
    }

    const cleanTitle = updateTitle.trim();
    const cleanContent = updateContent.trim();

    if (!cleanTitle) {
      setUpdateError("Add a title for your update.");
      return;
    }

    if (!cleanContent) {
      setUpdateError("Tell supporters what has changed.");
      return;
    }

    setPostingUpdate(true);
    setUpdateError("");

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        throw authError;
      }

      if (!user) {
        throw new Error("You need to sign in to post an update.");
      }

      if (user.id !== campaign.creator_id) {
        throw new Error(
          "You do not have permission to post an update to this campaign.",
        );
      }

      /* Upload any selected photos first */

      const imageUrls = await uploadCampaignUpdateImages(user.id);

      /* Save the update */

      const { data: newUpdate, error: insertError } = await supabase
        .from("campaign_updates")
        .insert({
          campaign_id: campaign.id,
          user_id: user.id,
          title: cleanTitle,
          content: cleanContent,
          image_urls: imageUrls,
          is_final_update: isInactive,
        })
        .select(
          `
          id,
          campaign_id,
          user_id,
          title,
          content,
          image_urls,
          is_final_update,
          created_at,
          updated_at
        `,
        )
        .single();

      if (insertError) {
        throw insertError;
      }

      /* Add a record to Campaign Activity */

      const { error: activityError } = await supabase
        .from("activity_feed")
        .insert({
          user_id: user.id,
          campaign_id: campaign.id,
          activity_type: isInactive
            ? "final_campaign_update_published"
            : "campaign_update_published",
          title: isInactive
            ? "Final campaign update published"
            : "Campaign update published",
          description: `"${cleanTitle}" was published to ${campaign.title}`,
          metadata: {
            campaign_update_id: newUpdate.id,
            campaign_title: campaign.title,
            update_title: cleanTitle,
            is_final_update: isInactive,
          },
          is_notification: false,
          is_read: true,
          read_at: new Date().toISOString(),
        });

      if (activityError) {
        console.error("Campaign update activity error:", activityError);
      }

      cleanupUpdatePreviews();

      setUpdateImages([]);
      setUpdateTitle("");
      setUpdateContent("");
      setUpdateError("");
      setShowPostUpdateModal(false);

      if (updateFileInputRef.current) {
        updateFileInputRef.current.value = "";
      }

      await loadCampaign();
    } catch (error) {
      console.error("Post campaign update error:", error);

      setUpdateError(
        error?.message || "We couldn't publish this update. Please try again.",
      );
    } finally {
      setPostingUpdate(false);
    }
  }

  /* =========================================================
   OPEN EDIT UPDATE
========================================================= */

  function handleOpenEditUpdate(update) {
    if (!update) {
      return;
    }

    cleanupUpdatePreviews();

    setEditingUpdate(update);
    setUpdateTitle(update.title || "");
    setUpdateContent(update.content || "");
    setExistingUpdateImages(
      Array.isArray(update.image_urls) ? update.image_urls : [],
    );
    setUpdateImages([]);
    setUpdateError("");

    if (updateFileInputRef.current) {
      updateFileInputRef.current.value = "";
    }

    setShowPostUpdateModal(true);
  }
  async function handleEditCampaignUpdate(event) {
    event.preventDefault();

    if (!campaign?.id || !editingUpdate?.id || postingUpdate) {
      return;
    }

    const cleanTitle = updateTitle.trim();
    const cleanContent = updateContent.trim();

    if (!cleanTitle) {
      setUpdateError("Add a title for your update.");
      return;
    }

    if (!cleanContent) {
      setUpdateError("Tell supporters what has changed.");
      return;
    }

    if (existingUpdateImages.length + updateImages.length > 4) {
      setUpdateError("You can add up to 4 photos.");
      return;
    }

    setPostingUpdate(true);
    setUpdateError("");

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        throw authError;
      }

      if (!user) {
        throw new Error("You need to sign in to edit this update.");
      }

      if (user.id !== campaign.creator_id) {
        throw new Error(
          "You do not have permission to edit this campaign update.",
        );
      }

      /*
       * Upload any newly selected photos.
       */

      const newImageUrls = await uploadCampaignUpdateImages(user.id);

      /*
       * Keep existing photos and add the new ones.
       */

      const finalImageUrls = [...existingUpdateImages, ...newImageUrls].slice(
        0,
        4,
      );

      /*
       * Update the existing campaign update.
       */

      const { data: updatedUpdate, error: updateError } = await supabase
        .from("campaign_updates")
        .update({
          title: cleanTitle,
          content: cleanContent,
          image_urls: finalImageUrls,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingUpdate.id)
        .eq("campaign_id", campaign.id)
        .eq("user_id", user.id)
        .select(
          `
        id,
        campaign_id,
        user_id,
        title,
        content,
        image_urls,
        is_final_update,
        created_at,
        updated_at
      `,
        )
        .maybeSingle();

      if (updateError) {
        throw updateError;
      }

      if (!updatedUpdate) {
        throw new Error("The campaign update could not be updated.");
      }

      /*
       * Record Update edited in Activity.
       * This is history only, not an unread notification.
       */

      const { error: activityError } = await supabase
        .from("activity_feed")
        .insert({
          user_id: user.id,
          campaign_id: campaign.id,
          activity_type: "campaign_update_edited",
          title: "Update edited",
          description: `You edited an update on ${campaign.title}`,
          metadata: {
            campaign_title: campaign.title,
            campaign_update_id: updatedUpdate.id,
            update_title: cleanTitle,
          },
          is_notification: false,
          is_read: true,
          read_at: new Date().toISOString(),
        });

      if (activityError) {
        console.error("Edit update activity error:", activityError);
      }

      cleanupUpdatePreviews();

      setEditingUpdate(null);
      setExistingUpdateImages([]);
      setUpdateImages([]);
      setUpdateTitle("");
      setUpdateContent("");
      setUpdateError("");
      setShowPostUpdateModal(false);

      if (updateFileInputRef.current) {
        updateFileInputRef.current.value = "";
      }

      await loadCampaign();
    } catch (error) {
      console.error("Edit campaign update error:", error);

      setUpdateError(
        error?.message || "We couldn't save your changes. Please try again.",
      );
    } finally {
      setPostingUpdate(false);
    }
  }
  /* =========================================================
     DELETE CAMPAIGN UPDATE
  ========================================================= */

  async function handleDeleteCampaignUpdate(update) {
    if (!update?.id) {
      return;
    }

    const confirmed = window.confirm(
      "Delete this campaign update? This action cannot be undone.",
    );

    if (!confirmed) {
      return;
    }

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        throw authError;
      }

      if (!user) {
        throw new Error("You need to sign in to delete this update.");
      }

      if (user.id !== campaign.creator_id) {
        throw new Error(
          "You do not have permission to delete this campaign update.",
        );
      }

      const { data: deletedUpdate, error: deleteError } = await supabase
        .from("campaign_updates")
        .delete()
        .eq("id", update.id)
        .eq("campaign_id", campaign.id)
        .eq("user_id", user.id)
        .select("id")
        .maybeSingle();

      if (deleteError) {
        throw deleteError;
      }

      if (!deletedUpdate) {
        throw new Error("The campaign update could not be deleted.");
      }

      /*
       * Record the deletion as account history.
       */

      const { error: activityError } = await supabase
        .from("activity_feed")
        .insert({
          user_id: user.id,
          campaign_id: campaign.id,
          activity_type: "campaign_update_deleted",
          title: "Update deleted",
          description: `An update was deleted from ${campaign.title}`,
          metadata: {
            campaign_title: campaign.title,
            campaign_update_id: update.id,
            update_title: update.title || "",
          },
          is_notification: false,
          is_read: true,
          read_at: new Date().toISOString(),
        });

      if (activityError) {
        console.error("Delete update activity error:", activityError);
      }

      setCampaignUpdates((current) =>
        current.filter((item) => item.id !== update.id),
      );

      /*
       * Add the activity locally so the Campaign Activity
       * section updates without requiring a full reload.
       */
      await loadCampaign();
    } catch (error) {
      console.error("Delete campaign update error:", error);

      alert(error?.message || "Unable to delete this campaign update.");
    }
  }

  /* =========================================================
     UPDATE AMOUNT RAISED + MILESTONE NOTIFICATIONS
  ========================================================= */

  async function handleUpdateAmountRaised(event) {
    event.preventDefault();

    if (!campaign?.id || savingAmount) {
      return;
    }

    const parsedAmount = Number(newAmountRaised);

    if (Number.isNaN(parsedAmount) || parsedAmount < 0) {
      alert("Enter a valid total amount raised.");
      return;
    }

    setSavingAmount(true);

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        throw authError;
      }

      if (!user) {
        throw new Error("You need to sign in to update this campaign.");
      }

      if (user.id !== campaign.creator_id) {
        throw new Error("You do not have permission to update this campaign.");
      }

      const previousAmount = Number(campaign.amount_raised || 0);
      const campaignGoal = Number(campaign.goal_amount || 0);

      /*
       * Update the organizer-reported total first.
       */

      const { error } = await supabase
        .from("campaigns")
        .update({
          amount_raised: parsedAmount,
          updated_at: new Date().toISOString(),
        })
        .eq("id", campaign.id)
        .eq("creator_id", user.id);

      if (error) {
        throw error;
      }

      /*
       * =====================================================
       * AMOUNT RAISED HISTORY
       * =====================================================
       *
       * This is an action the organizer performed, so it is
       * history only and does not increase the unread badge.
       */

      if (parsedAmount !== previousAmount) {
        const { error: activityError } = await supabase
          .from("activity_feed")
          .insert({
            user_id: user.id,
            campaign_id: campaign.id,
            activity_type: "amount_raised_updated",
            title: "Amount raised updated",
            description: `You updated ${campaign.title} from ${formatMoney(
              previousAmount,
              campaign.currency,
            )} to ${formatMoney(parsedAmount, campaign.currency)}`,
            metadata: {
              campaign_title: campaign.title,
              previous_amount: previousAmount,
              amount_raised: parsedAmount,
              new_amount: parsedAmount,
              goal_amount: campaignGoal,
            },
            is_notification: false,
            is_read: true,
            read_at: new Date().toISOString(),
          });

        if (activityError) {
          console.error("Activity insert error:", activityError);
        }
      }

      /*
       * =====================================================
       * MILESTONE NOTIFICATIONS
       * =====================================================
       *
       * These are genuine notifications.
       *
       * Example:
       * Goal = ₦100,000
       * Previous amount = ₦10,000
       * New amount = ₦80,000
       *
       * Fundu records:
       * 25%
       * 50%
       * 75%
       *
       * Each milestone can only be created once for this
       * campaign, even if the organizer later lowers the
       * reported amount and raises it again.
       */

      if (campaignGoal > 0 && parsedAmount > previousAmount) {
        const previousPercent = (previousAmount / campaignGoal) * 100;

        const newPercent = (parsedAmount / campaignGoal) * 100;

        const milestones = [
          {
            percent: 25,
            activityType: "campaign_reached_25",
            title: "Campaign reached 25%",
            description: `${campaign.title} has reached 25% of its goal!`,
          },
          {
            percent: 50,
            activityType: "campaign_reached_50",
            title: "Campaign reached 50%",
            description: `${campaign.title} has reached 50% of its goal!`,
          },
          {
            percent: 75,
            activityType: "campaign_reached_75",
            title: "Campaign reached 75%",
            description: `${campaign.title} has reached 75% of its goal!`,
          },
          {
            percent: 100,
            activityType: "campaign_reached_100",
            title: "Campaign reached 100%",
            description: `${campaign.title} has reached 100% of its goal! 🎉`,
          },
        ];

        /*
         * Work out which milestone thresholds were crossed
         * by this particular amount update.
         */

        const crossedMilestones = milestones.filter(
          (milestone) =>
            previousPercent < milestone.percent &&
            newPercent >= milestone.percent,
        );

        if (crossedMilestones.length > 0) {
          const milestoneTypes = crossedMilestones.map(
            (milestone) => milestone.activityType,
          );

          /*
           * Check which milestone records already exist.
           *
           * This prevents duplicates if the organizer lowers
           * the amount and later crosses the same threshold
           * again.
           */

          const { data: existingMilestones, error: milestoneCheckError } =
            await supabase
              .from("activity_feed")
              .select("activity_type")
              .eq("campaign_id", campaign.id)
              .in("activity_type", milestoneTypes);

          if (milestoneCheckError) {
            console.error(
              "Could not check existing campaign milestones:",
              milestoneCheckError,
            );
          } else {
            const existingMilestoneTypes = new Set(
              (existingMilestones || []).map((item) => item.activity_type),
            );

            const newMilestones = crossedMilestones.filter(
              (milestone) =>
                !existingMilestoneTypes.has(milestone.activityType),
            );

            if (newMilestones.length > 0) {
              const milestoneRows = newMilestones.map((milestone) => ({
                user_id: user.id,
                campaign_id: campaign.id,
                activity_type: milestone.activityType,
                title: milestone.title,
                description: milestone.description,
                metadata: {
                  campaign_title: campaign.title,
                  milestone_percent: milestone.percent,
                  amount_raised: parsedAmount,
                  goal_amount: campaignGoal,
                },

                /*
                 * These are unread notifications.
                 */
                is_notification: true,
                is_read: false,
                read_at: null,
              }));

              const { error: milestoneInsertError } = await supabase
                .from("activity_feed")
                .insert(milestoneRows);

              if (milestoneInsertError) {
                console.error(
                  "Could not create milestone notifications:",
                  milestoneInsertError,
                );
              }
            }
          }
        }
      }

      setShowAmountModal(false);

      /*
       * Tell the SideNav to refresh its unread Activity count.
       */
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("fundu:activity-updated"));
      }

      await loadCampaign();
    } catch (error) {
      console.error("Update amount error:", error);

      alert(error?.message || "Unable to update the amount raised.");
    } finally {
      setSavingAmount(false);
    }
  }

  /* =========================================================
     END CAMPAIGN
  ========================================================= */

  async function handleEndCampaignEarly() {
    const confirmed = window.confirm(
      "Are you sure you want to end this campaign early? Supporters will no longer be encouraged to contribute.",
    );

    if (!confirmed) {
      return;
    }

    setEndingCampaign(true);

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        throw authError;
      }

      if (!user) {
        throw new Error("You need to sign in to end this campaign.");
      }

      if (user.id !== campaign.creator_id) {
        throw new Error("You do not have permission to end this campaign.");
      }

      const endedAt = new Date().toISOString();

      const { error } = await supabase
        .from("campaigns")
        .update({
          status: "ended",
          end_date: endedAt,
          updated_at: endedAt,
        })
        .eq("id", campaign.id)
        .eq("creator_id", user.id);

      if (error) {
        throw error;
      }

      /*
       * Ending the campaign is an organizer action.
       * It appears in history but is already read.
       */

      const { error: activityError } = await supabase
        .from("activity_feed")
        .insert({
          user_id: user.id,
          campaign_id: campaign.id,
          activity_type: "campaign_ended_early",
          title: "Campaign ended early",
          description: `${campaign.title} was ended early`,
          metadata: {
            campaign_title: campaign.title,
            ended_at: endedAt,
          },
          is_notification: false,
          is_read: true,
          read_at: endedAt,
        });

      if (activityError) {
        console.error("Activity insert error:", activityError);
      }

      await loadCampaign();
    } catch (error) {
      console.error("End campaign error:", error);

      alert(error?.message || "Unable to end the campaign.");
    } finally {
      setEndingCampaign(false);
    }
  }

  /* =========================================================
     RESTART CAMPAIGN
  ========================================================= */

  function handleRestartCampaign() {
    setShowRestartModal(true);
  }

  function handleContinueRestart() {
    setShowRestartModal(false);

    router.push(`/create-campaign?campaign=${campaign.id}&restart=true`);
  }

  /* =========================================================
     DELETE CAMPAIGN
  ========================================================= */

  function handleDeleteCampaign() {
    setShowDeleteModal(true);
  }

  async function handleConfirmDeleteCampaign() {
    if (!campaign?.id || deletingCampaign) {
      return;
    }

    setDeletingCampaign(true);

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        throw authError;
      }

      if (!user) {
        throw new Error("You need to sign in to delete this campaign.");
      }

      if (user.id !== campaign.creator_id) {
        throw new Error("You do not have permission to delete this campaign.");
      }

      const { data: deletedCampaign, error: deleteError } = await supabase
        .from("campaigns")
        .delete()
        .eq("id", campaign.id)
        .eq("creator_id", user.id)
        .select("id")
        .maybeSingle();

      if (deleteError) {
        throw deleteError;
      }

      if (!deletedCampaign) {
        throw new Error(
          "The campaign could not be deleted. It may already have been removed or you may not have permission.",
        );
      }

      setShowDeleteModal(false);

      router.replace("/campaigns");
      router.refresh();
    } catch (error) {
      console.error("Delete campaign error:", error);

      alert(
        error?.message || "Unable to delete this campaign. Please try again.",
      );
    } finally {
      setDeletingCampaign(false);
    }
  }

  /* =========================================================
     SHARE
  ========================================================= */

  async function handleShareCampaign() {
    const url = `${window.location.origin}/campaign/${campaign.id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: campaign.title,
          text: `View ${campaign.title} on Fundu`,
          url,
        });

        return;
      } catch (error) {
        if (error?.name === "AbortError") {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(url);

      alert("Campaign link copied.");
    } catch {
      window.prompt("Copy this campaign link:", url);
    }
  }

  /* =========================================================
     STATES
  ========================================================= */

  if (loading) {
    return (
      <div className="campaign-detail-state">
        <div className="campaign-detail-state__card">
          <p>Loading campaign...</p>
        </div>
      </div>
    );
  }

  if (pageError || !campaign) {
    return (
      <div className="campaign-detail-state">
        <div className="campaign-detail-state__card">
          <h1>Campaign unavailable</h1>

          <p>{pageError || "This campaign could not be found."}</p>

          <Link href="/campaigns" className="campaign-detail-primary-btn">
            Back to Campaigns
          </Link>
        </div>
      </div>
    );
  }

  const coverImage =
    campaign.cover_image ||
    campaign.image_url ||
    campaign.preview_image ||
    "/images/dashboard/campaign-cover.png";

  const statusLabel = getCampaignStatusLabel(displayStatus);

  const statusDescription = getCampaignStatusDescription(displayStatus);

  return (
    <>
      <div className="campaign-detail-page">
        {/* BREADCRUMB */}

        <button
          type="button"
          className="campaign-detail-back"
          onClick={() => router.push("/campaigns")}
        >
          <img src="/images/campaign-detail/arrow-left.svg" alt="" />

          <span>Back to Campaigns</span>
        </button>

        {/* CAMPAIGN HEADER */}

        <section className="campaign-detail-header-card">
          <div className="campaign-detail-header-meta">
            <div className="campaign-detail-title-row">
              <h1>{campaign.title}</h1>

              <p>Organized by {organizerName}</p>
            </div>

            <div className="campaign-detail-badges-row">
              <div className="campaign-detail-badges">
                <span className="campaign-detail-category">
                  {category?.name || "Uncategorized"}
                </span>

                <span
                  className={`campaign-detail-status campaign-detail-status--${displayStatus}`}
                >
                  {statusLabel}
                </span>
              </div>

              <div className="campaign-detail-dates">
                <span>
                  {campaign.status === "draft"
                    ? `Created ${formatShortDate(campaign.created_at)}`
                    : `Published ${formatShortDate(
                        campaign.start_date || campaign.created_at,
                      )}`}
                </span>

                {campaign.end_date && (
                  <>
                    <span>·</span>

                    <span>
                      {isInactive ? "Ended" : "Ends"}{" "}
                      {formatShortDate(campaign.end_date)}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="campaign-detail-divider" />

            <div className="campaign-detail-header-actions">
              <div className="campaign-detail-header-buttons">
                {!isInactive && (
                  <Link
                    href={`/create-campaign?campaign=${campaign.id}`}
                    className="campaign-detail-primary-btn"
                  >
                    Edit Campaign
                  </Link>
                )}

                <button
                  type="button"
                  className={
                    isInactive
                      ? "campaign-detail-primary-btn"
                      : "campaign-detail-outline-btn"
                  }
                  onClick={handleShareCampaign}
                >
                  Share Campaign
                </button>
              </div>

              <Link
                href={`/campaign/${campaign.id}`}
                className="campaign-detail-public-link"
              >
                <span>View Public Campaign</span>

                <img src="/images/campaign-detail/external-link.svg" alt="" />
              </Link>
            </div>
          </div>

          <div className="campaign-detail-cover">
            <img src={coverImage} alt={campaign.title} />
          </div>
        </section>

        {/* DESKTOP TWO-COLUMN CONTENT */}

        <div className="campaign-detail-columns">
          <main className="campaign-detail-primary-column">
            {/* FUNDRAISING */}

            <section className="campaign-detail-card campaign-progress-card">
              <h2>Fundraising Progress</h2>

              <div className="campaign-progress-amount">
                <strong>{formatMoney(amountRaised, campaign.currency)}</strong>

                <span>
                  raised of {formatMoney(goalAmount, campaign.currency)} goal
                </span>
              </div>

              <div className="campaign-progress-meta">
                <strong>
                  {isInactive
                    ? "Campaign ended"
                    : campaign.end_date
                      ? daysRemaining > 0
                        ? `${daysRemaining} ${
                            daysRemaining === 1 ? "day" : "days"
                          } remaining`
                        : "Campaign ended"
                      : "No end date"}
                </strong>

                <strong>{Math.round(progressPercent)}% complete</strong>
              </div>

              <div className="campaign-progress-track">
                <div
                  className="campaign-progress-fill"
                  style={{
                    width: `${progressBarPercent}%`,
                  }}
                />
              </div>

              <div className="campaign-progress-note">
                <img src="/images/campaign-detail/info.svg" alt="" />

                <p>
                  This amount is based on contributions you&apos;ve recorded.
                  Fundu does not track incoming bank transfers.
                </p>
              </div>

              <button
                type="button"
                className="campaign-detail-primary-btn campaign-detail-full-btn"
                onClick={() => {
                  setNewAmountRaised(String(amountRaised));
                  setShowAmountModal(true);
                }}
              >
                Update Amount Raised
              </button>
            </section>

            {/* CAMPAIGN UPDATES */}

            <section className="campaign-detail-card">
              <div className="campaign-detail-section-header">
                <h2>Campaign Updates</h2>

                <button
                  type="button"
                  className="campaign-detail-outline-btn campaign-detail-small-action"
                  onClick={openPostUpdateModal}
                >
                  {isInactive ? "Post Final Update" : "Post an Update"}
                </button>
              </div>

              {campaignUpdates.length > 0 ? (
                <div className="campaign-updates-list">
                  {campaignUpdates.map((update) => {
                    const images = Array.isArray(update.image_urls)
                      ? update.image_urls
                      : [];

                    return (
                      <article className="campaign-update-card" key={update.id}>
                        <div className="campaign-update-card__header">
                          <div>
                            {update.is_final_update && (
                              <span className="campaign-update-final-badge">
                                Final Update
                              </span>
                            )}

                            <h3>{update.title || "Campaign update"}</h3>
                          </div>
                        </div>

                        {update.content && <p>{update.content}</p>}

                        {images.length > 0 && (
                          <div
                            className={`campaign-update-images campaign-update-images--${Math.min(
                              images.length,
                              4,
                            )}`}
                          >
                            {images.map((url, index) => (
                              <button
                                type="button"
                                className="campaign-update-image"
                                key={`${url}-${index}`}
                                onClick={() => setViewingUpdateImage(url)}
                                aria-label={`View ${
                                  update.title || "Campaign update"
                                } photo ${index + 1}`}
                              >
                                <img
                                  src={url}
                                  alt={`${update.title || "Campaign update"} photo ${
                                    index + 1
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        )}

                        <div className="campaign-update-footer">
                          <span>
                            Posted on {formatLongDate(update.created_at)}
                          </span>

                          <div className="campaign-update-footer__actions">
                            <button
                              type="button"
                              onClick={() => handleOpenEditUpdate(update)}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteCampaignUpdate(update)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="campaign-detail-empty">
                  <strong>No campaign updates yet</strong>

                  <p>
                    {isInactive
                      ? "Share a final update to let supporters know how the campaign ended."
                      : "Share progress, milestones, photos, and how funds are being used to keep supporters informed."}
                  </p>
                </div>
              )}
            </section>

            {/* STORY */}

            <section className="campaign-detail-card">
              <div className="campaign-detail-section-header">
                <h2>Campaign Story</h2>

                {!isInactive && (
                  <Link
                    href={`/create-campaign?campaign=${campaign.id}`}
                    className="campaign-detail-outline-btn campaign-detail-small-action"
                  >
                    Edit Story
                  </Link>
                )}
              </div>

              <div className="campaign-story-content">
                <CreatorStoryBlocks
                  blocks={campaign.story_blocks}
                  fallbackText={
                    campaign.story_content ||
                    campaign.description ||
                    "No campaign story has been added yet."
                  }
                  campaignTitle={campaign.title}
                />
              </div>
            </section>

            {/* ACTIVITY */}

            <section className="campaign-detail-card">
              <div className="campaign-detail-section-header">
                <h2>Campaign Activity</h2>
              </div>

              {activity.length > 0 ? (
                <div className="campaign-activity-list">
                  {activity.map((item) => (
                    <div className="campaign-activity-row" key={item.id}>
                      <p>{item.description || item.title}</p>

                      <span>{formatActivityDate(item.created_at)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="campaign-detail-empty">
                  <strong>No campaign activity yet</strong>

                  <p>Changes to this campaign will appear here.</p>
                </div>
              )}
            </section>
          </main>

          {/* SIDEBAR */}

          <aside className="campaign-detail-sidebar">
            {/* STATUS */}

            <section className="campaign-detail-side-card">
              <div className="campaign-status-heading">
                <h3>Campaign Status</h3>

                <span
                  className={`campaign-detail-status campaign-detail-status--${displayStatus}`}
                >
                  {statusLabel}
                </span>
              </div>

              <div className="campaign-status-description">
                <p>{statusDescription}</p>

                {campaign.end_date && (
                  <span>
                    {isInactive ? "Ended on " : "Ends on "}
                    {formatLongDate(campaign.end_date)}

                    {!isInactive && daysRemaining > 0
                      ? ` (${daysRemaining} ${
                          daysRemaining === 1 ? "day" : "days"
                        } remaining)`
                      : ""}
                  </span>
                )}
              </div>

              {isActive && campaign.end_date && countdown && (
                <div className="campaign-countdown">
                  <span className="campaign-countdown__label">
                    Time remaining
                  </span>

                  <div
                    className="campaign-countdown__units"
                    aria-label={`${countdown.days} days, ${countdown.hours} hours, ${countdown.minutes} minutes, ${countdown.seconds} seconds remaining`}
                  >
                    <CountdownUnit
                      value={countdown.days}
                      label={countdown.days === 1 ? "Day" : "Days"}
                    />

                    <CountdownUnit
                      value={countdown.hours}
                      label={countdown.hours === 1 ? "Hr" : "Hrs"}
                    />

                    <CountdownUnit
                      value={countdown.minutes}
                      label={countdown.minutes === 1 ? "Min" : "Mins"}
                    />

                    <CountdownUnit
                      value={countdown.seconds}
                      label={countdown.seconds === 1 ? "Sec" : "Secs"}
                    />
                  </div>

                  <p className="campaign-countdown__end-date">
                    Ends {formatCampaignEndDateTime(campaign.end_date)}
                  </p>
                </div>
              )}

              {isActive && (
                <button
                  type="button"
                  className="campaign-detail-danger-btn"
                  onClick={handleEndCampaignEarly}
                  disabled={endingCampaign}
                >
                  {endingCampaign ? "Ending Campaign..." : "End Campaign Early"}
                </button>
              )}

              {isInactive && (
                <div className="campaign-detail-inactive-actions">
                  <button
                    type="button"
                    className="campaign-detail-primary-btn campaign-detail-full-btn"
                    onClick={handleRestartCampaign}
                  >
                    Restart Campaign
                  </button>

                  <button
                    type="button"
                    className="campaign-detail-danger-btn"
                    onClick={handleDeleteCampaign}
                    disabled={deletingCampaign}
                  >
                    Delete Campaign
                  </button>
                </div>
              )}
            </section>
            {/* CAMPAIGN INFO */}

            <section className="campaign-detail-side-card">
              <h3>Campaign Info</h3>

              <div className="campaign-info-list">
                <InfoRow
                  label="Category"
                  value={category?.name || "Uncategorized"}
                />

                <InfoRow
                  label="Goal"
                  value={formatMoney(goalAmount, campaign.currency)}
                />

                <InfoRow label="Organizer" value={organizerName} />

                <InfoRow
                  label={campaign.status === "draft" ? "Created" : "Published"}
                  value={formatLongDate(
                    campaign.start_date || campaign.created_at,
                  )}
                />

                {isInactive && campaign.end_date && (
                  <InfoRow
                    label="Ended"
                    value={formatLongDate(campaign.end_date)}
                  />
                )}
              </div>

              {!isInactive && (
                <Link
                  href={`/create-campaign?campaign=${campaign.id}`}
                  className="campaign-detail-outline-btn campaign-detail-full-btn"
                >
                  Edit Campaign Info
                </Link>
              )}
            </section>

            {/* BANK */}

            <section className="campaign-detail-side-card">
              <div className="campaign-bank-heading">
                <div className="campaign-bank-icon">
                  <img src="/images/campaign-detail/credit-card.svg" alt="" />
                </div>

                <h3>Direct Bank Account</h3>
              </div>

              <p className="campaign-bank-description">
                {isInactive
                  ? "This is the bank account that was linked to this campaign."
                  : "Your supporters send contributions directly to this account. Fundu does not hold your campaign funds."}
              </p>

              {bankAccount ? (
                <div className="campaign-bank-details">
                  <BankField label="Bank" value={bankAccount.bank_name} />

                  <BankField
                    label="Account Name"
                    value={bankAccount.account_holder_name}
                  />

                  <BankField
                    label="Account Number"
                    value={bankAccount.account_number}
                    highlight
                    last
                  />
                </div>
              ) : (
                <div className="campaign-detail-empty campaign-bank-empty">
                  <strong>No bank account linked</strong>

                  <p>
                    {isInactive
                      ? "No bank account is currently linked to this campaign."
                      : "Add bank details so supporters can send contributions directly to you."}
                  </p>
                </div>
              )}

              {!isInactive && (
                <Link
                  href="/settings"
                  className="campaign-detail-outline-btn campaign-detail-full-btn"
                >
                  {bankAccount ? "Manage Bank Details" : "Add Bank Details"}
                </Link>
              )}
            </section>

            {/* SUPPORTERS CTA */}

            <section className="campaign-supporter-cta">
              <div>
                <h3>
                  {isInactive
                    ? "Close the loop with supporters"
                    : "Keep supporters engaged"}
                </h3>

                <p>
                  {isInactive
                    ? "Share a final update with your community about how the campaign ended and what their support helped achieve."
                    : "Share progress, photos, milestones, and receipts directly with your community to build trust."}
                </p>
              </div>

              <button
                type="button"
                className="campaign-detail-primary-btn campaign-detail-full-btn"
                onClick={openPostUpdateModal}
              >
                {isInactive ? "Post Final Update" : "Post an Update"}
              </button>
            </section>
          </aside>
        </div>
      </div>
      {/* UPDATE IMAGE VIEWER */}

      {viewingUpdateImage && (
        <div
          className="campaign-update-lightbox"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setViewingUpdateImage(null);
            }
          }}
        >
          <div className="campaign-update-lightbox__content">
            <button
              type="button"
              className="campaign-update-lightbox__close"
              onClick={() => setViewingUpdateImage(null)}
              aria-label="Close image"
            >
              ×
            </button>

            <img
              src={viewingUpdateImage}
              alt="Campaign update"
              className="campaign-update-lightbox__image"
            />
          </div>
        </div>
      )}
      {/* UPDATE AMOUNT MODAL */}

      {showAmountModal && (
        <div
          className="campaign-detail-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowAmountModal(false);
            }
          }}
        >
          <div className="campaign-detail-modal">
            <div className="campaign-detail-modal-header">
              <div>
                <h2>Update Amount Raised</h2>

                <p>Record the total amount raised so far.</p>
              </div>

              <button
                type="button"
                className="campaign-detail-modal-close"
                onClick={() => setShowAmountModal(false)}
              >
                ×
              </button>
            </div>

            <div className="campaign-detail-modal-current">
              <span>Current amount</span>

              <strong>{formatMoney(amountRaised, campaign.currency)}</strong>
            </div>

            <form onSubmit={handleUpdateAmountRaised}>
              <label
                className="campaign-detail-field"
                htmlFor="newAmountRaised"
              >
                <span>New total amount raised</span>

                <input
                  id="newAmountRaised"
                  type="number"
                  min="0"
                  step="1"
                  value={newAmountRaised}
                  onChange={(event) => setNewAmountRaised(event.target.value)}
                  placeholder="0"
                  required
                />
              </label>

              <p className="campaign-detail-field-help">
                Enter the total raised, not the amount from the latest
                contribution.
              </p>

              <div className="campaign-detail-modal-preview">
                <div>
                  <span>Amount</span>

                  <strong>
                    {formatMoney(
                      Number(newAmountRaised || 0),
                      campaign.currency,
                    )}
                  </strong>
                </div>

                <div>
                  <span>Goal</span>

                  <strong>{formatMoney(goalAmount, campaign.currency)}</strong>
                </div>

                <div>
                  <span>Progress</span>

                  <strong>
                    {goalAmount > 0
                      ? `${Math.round(
                          (Number(newAmountRaised || 0) / goalAmount) * 100,
                        )}%`
                      : "0%"}
                  </strong>
                </div>
              </div>

              <div className="campaign-detail-modal-note">
                Fundu does not track or verify transfers sent to your bank
                account. Only enter an amount you can confirm.
              </div>

              <div className="campaign-detail-modal-actions">
                <button
                  type="button"
                  className="campaign-detail-outline-btn"
                  onClick={() => setShowAmountModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="campaign-detail-primary-btn"
                  disabled={savingAmount}
                >
                  {savingAmount ? "Updating..." : "Update Amount"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POST UPDATE MODAL */}

      {showPostUpdateModal && (
        <div
          className="campaign-update-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !postingUpdate) {
              closePostUpdateModal();
            }
          }}
        >
          <div
            className="campaign-update-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="campaign-post-update-title"
          >
            <div className="campaign-update-modal__header">
              <div>
                <h2 id="campaign-post-update-title">
                  {editingUpdate
                    ? "Edit Update"
                    : isInactive
                      ? "Post Final Update"
                      : "Post an Update"}
                </h2>

                <p>
                  {editingUpdate
                    ? "Make changes to this campaign update."
                    : "Share progress, milestones, photos, and important news with your supporters."}
                </p>
              </div>

              <button
                type="button"
                className="campaign-update-modal__close"
                onClick={closePostUpdateModal}
                disabled={postingUpdate}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <form
              className="campaign-update-modal__form"
              onSubmit={
                editingUpdate
                  ? handleEditCampaignUpdate
                  : handlePostCampaignUpdate
              }
            >
              <label className="campaign-update-modal__field">
                <span>Update title</span>

                <input
                  type="text"
                  value={updateTitle}
                  onChange={(event) => {
                    setUpdateTitle(event.target.value);
                    setUpdateError("");
                  }}
                  placeholder="Give your update a title"
                  maxLength={120}
                  disabled={postingUpdate}
                  autoFocus
                />
              </label>

              <label className="campaign-update-modal__field">
                <span>What&apos;s new?</span>

                <textarea
                  value={updateContent}
                  onChange={(event) => {
                    setUpdateContent(event.target.value);
                    setUpdateError("");
                  }}
                  placeholder="Tell your supporters what has happened since your last update..."
                  rows={6}
                  maxLength={3000}
                  disabled={postingUpdate}
                />

                <small>{updateContent.length}/3000</small>
              </label>

              <div className="campaign-update-modal__photos">
                <div className="campaign-update-modal__photos-heading">
                  <div>
                    <span>Add photos</span>

                    <p>
                      Add up to 4 photos to help supporters see your progress.
                    </p>
                  </div>

                  <span>
                    {existingUpdateImages.length + updateImages.length}/4
                  </span>
                </div>

                <input
                  ref={updateFileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleUpdateImageSelect}
                />

                {existingUpdateImages.length + updateImages.length < 4 && (
                  <button
                    type="button"
                    className="campaign-update-upload"
                    onClick={() => updateFileInputRef.current?.click()}
                    disabled={postingUpdate}
                  >
                    <span className="campaign-update-upload__icon">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M12 16V4M7 9L12 4L17 9"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        <path
                          d="M5 14V19C5 19.5523 5.44772 20 6 20H18C18.5523 20 19 19.5523 19 19V14"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>

                    <strong>Upload photos</strong>

                    <span>JPG, PNG or WEBP</span>
                  </button>
                )}

                {(existingUpdateImages.length > 0 ||
                  updateImages.length > 0) && (
                  <div className="campaign-update-preview-grid">
                    {existingUpdateImages.map((imageUrl, index) => (
                      <div
                        className="campaign-update-preview"
                        key={`existing-${imageUrl}-${index}`}
                      >
                        <img
                          src={imageUrl}
                          alt={`Existing update photo ${index + 1}`}
                        />

                        <button
                          type="button"
                          onClick={() => removeExistingUpdateImage(imageUrl)}
                          disabled={postingUpdate}
                          aria-label={`Remove existing photo ${index + 1}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}

                    {updateImages.map((image, index) => (
                      <div className="campaign-update-preview" key={image.id}>
                        <img
                          src={image.previewUrl}
                          alt={`New update photo ${index + 1}`}
                        />

                        <button
                          type="button"
                          onClick={() => removeUpdateImage(image.id)}
                          disabled={postingUpdate}
                          aria-label={`Remove new photo ${index + 1}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {isInactive && (
                <div className="campaign-update-final-note">
                  <strong>Final campaign update</strong>

                  <p>
                    This campaign has ended. This post will be marked as your
                    final update to supporters.
                  </p>
                </div>
              )}

              {updateError && (
                <p className="campaign-update-modal__error">{updateError}</p>
              )}

              <div className="campaign-update-modal__actions">
                <button
                  type="button"
                  className="campaign-update-modal__cancel"
                  onClick={closePostUpdateModal}
                  disabled={postingUpdate}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="campaign-update-modal__publish"
                  disabled={postingUpdate}
                >
                  {postingUpdate
                    ? editingUpdate
                      ? "Saving..."
                      : "Publishing..."
                    : editingUpdate
                      ? "Save Changes"
                      : isInactive
                        ? "Post Final Update"
                        : "Post Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RESTART CAMPAIGN MODAL */}

      {showRestartModal && (
        <div
          className="campaign-detail-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowRestartModal(false);
            }
          }}
        >
          <div className="campaign-detail-modal campaign-detail-action-modal">
            <div className="campaign-detail-modal-header">
              <div>
                <h2>Restart Campaign</h2>

                <p>
                  You&apos;ll need to choose a new end date before this campaign
                  can go live again.
                </p>
              </div>

              <button
                type="button"
                className="campaign-detail-modal-close"
                onClick={() => setShowRestartModal(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="campaign-detail-restart-message">
              <strong>Choose a new end date</strong>

              <p>
                We&apos;ll take you to Basic Info where you can review your
                campaign and select a new end date.
              </p>
            </div>

            <div className="campaign-detail-modal-actions">
              <button
                type="button"
                className="campaign-detail-outline-btn"
                onClick={() => setShowRestartModal(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="campaign-detail-primary-btn"
                onClick={handleContinueRestart}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CAMPAIGN MODAL */}

      {showDeleteModal && (
        <div
          className="campaign-detail-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !deletingCampaign) {
              setShowDeleteModal(false);
            }
          }}
        >
          <div className="campaign-detail-modal campaign-detail-action-modal">
            <div className="campaign-detail-modal-header">
              <div>
                <h2>Delete Campaign?</h2>

                <p>
                  This will permanently remove this campaign from your Fundu
                  account.
                </p>
              </div>

              <button
                type="button"
                className="campaign-detail-modal-close"
                onClick={() => setShowDeleteModal(false)}
                disabled={deletingCampaign}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="campaign-detail-delete-warning">
              <strong>This action cannot be undone.</strong>

              <p>
                The campaign page and its shared Fundu link will no longer be
                available after deletion.
              </p>
            </div>

            <div className="campaign-detail-modal-actions">
              <button
                type="button"
                className="campaign-detail-outline-btn"
                onClick={() => setShowDeleteModal(false)}
                disabled={deletingCampaign}
              >
                Cancel
              </button>

              <button
                type="button"
                className="campaign-detail-delete-confirm-btn"
                onClick={handleConfirmDeleteCampaign}
                disabled={deletingCampaign}
              >
                {deletingCampaign ? "Deleting..." : "Delete Campaign"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */
function CountdownUnit({ value, label }) {
  return (
    <div className="campaign-countdown__unit">
      <strong>{String(value).padStart(2, "0")}</strong>
      <span>{label}</span>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="campaign-info-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function BankField({ label, value, highlight = false, last = false }) {
  return (
    <div
      className={`campaign-bank-field ${
        last ? "campaign-bank-field--last" : ""
      }`}
    >
      <span>{label}</span>

      <strong className={highlight ? "campaign-bank-field__highlight" : ""}>
        {value}
      </strong>
    </div>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function formatMoney(value, currency = "NGN") {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency || "NGN",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function formatShortDate(date) {
  if (!date) {
    return "Not set";
  }

  return new Date(date).toLocaleDateString("en-NG", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatLongDate(date) {
  if (!date) {
    return "Not set";
  }

  return new Date(date).toLocaleDateString("en-NG", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatActivityDate(date) {
  if (!date) {
    return "";
  }

  return new Date(date).toLocaleDateString("en-NG", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getCampaignCountdown(endDate, nowValue) {
  if (!endDate || !nowValue) {
    return null;
  }

  const end = new Date(endDate);

  if (Number.isNaN(end.getTime())) {
    return null;
  }

  const difference = Math.max(0, end.getTime() - nowValue);

  const totalSeconds = Math.floor(difference / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function formatCampaignEndDateTime(date) {
  if (!date) {
    return "Not set";
  }

  return new Date(date).toLocaleString("en-NG", {
    timeZone: "Africa/Lagos",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function calculateDaysRemaining(endDate) {
  if (!endDate) {
    return 0;
  }

  const today = new Date();
  const end = new Date(endDate);

  today.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const difference = end.getTime() - today.getTime();

  return Math.max(0, Math.ceil(difference / (1000 * 60 * 60 * 24)));
}

function campaignHasExpired(campaign) {
  if (!campaign?.end_date) {
    return false;
  }

  const endDate = new Date(campaign.end_date);

  if (Number.isNaN(endDate.getTime())) {
    return false;
  }

  return endDate < new Date();
}

function getCampaignStatusLabel(status) {
  switch (status) {
    case "active":
      return "Active";

    case "draft":
      return "Draft";

    case "pending":
      return "Pending";

    case "paused":
      return "Paused";

    case "inactive":
    case "ended":
    case "completed":
      return "Ended";

    default:
      return status?.charAt(0).toUpperCase() + status?.slice(1) || "Draft";
  }
}

function getCampaignStatusDescription(status) {
  switch (status) {
    case "active":
      return "Accepting support";

    case "draft":
      return "Not published yet";

    case "pending":
      return "Waiting to go live";

    case "paused":
      return "Support is temporarily paused";

    case "inactive":
    case "ended":
    case "completed":
      return "Campaign has ended and is no longer accepting support";

    default:
      return "Campaign status";
  }
}

/* =========================================================
   CREATOR CAMPAIGN STORY
========================================================= */

function CreatorStoryBlocks({ blocks, fallbackText, campaignTitle }) {
  const storyBlocks = parseStoryBlocks(blocks);

  const hasRenderableBlocks = storyBlocks.some((block) =>
    hasRenderableStoryBlock(block),
  );

  if (!hasRenderableBlocks) {
    return (
      <div className="campaign-story-fallback">
        {renderFallbackStory(fallbackText)}
      </div>
    );
  }

  return (
    <div className="campaign-story-blocks">
      {storyBlocks.map((block, index) => {
        if (!block) {
          return null;
        }

        if (typeof block === "string") {
          return block.trim() ? (
            <p className="campaign-story-text" key={`story-string-${index}`}>
              {block}
            </p>
          ) : null;
        }

        const blockType = String(
          block.type || block.blockType || "",
        ).toLowerCase();

        /* SECTION */

        if (blockType === "section") {
          const images = getStoryImages(block);

          return (
            <section
              className="campaign-story-section"
              key={block.id || `section-${index}`}
            >
              {block.title?.trim() && <h3>{block.title}</h3>}

              {block.content?.trim() && <p>{block.content}</p>}

              {images.length > 0 && (
                <CreatorStoryImages
                  images={images}
                  campaignTitle={campaignTitle}
                />
              )}
            </section>
          );
        }

        /* TEXT */

        if (blockType === "text") {
          const text =
            block.content || block.text || block.value || block.body || "";

          return text.trim() ? (
            <p
              className="campaign-story-text"
              key={block.id || `text-${index}`}
            >
              {text}
            </p>
          ) : null;
        }

        /* IMAGE / OLD MEDIA */

        if (blockType === "image" || blockType === "media") {
          const images = getStoryImages(block);

          return images.length > 0 ? (
            <CreatorStoryImages
              key={block.id || `images-${index}`}
              images={images}
              campaignTitle={campaignTitle}
            />
          ) : null;
        }

        /* VIDEO */

        if (blockType === "video") {
          return (
            <CreatorStoryVideo
              key={block.id || `video-${index}`}
              url={block.url || ""}
              blockId={block.id || index}
            />
          );
        }

        const legacyImages = getStoryImages(block);

        if (legacyImages.length > 0) {
          return (
            <CreatorStoryImages
              key={block.id || `legacy-images-${index}`}
              images={legacyImages}
              campaignTitle={campaignTitle}
            />
          );
        }

        const legacyText =
          block.content || block.text || block.value || block.body || "";

        if (typeof legacyText === "string" && legacyText.trim()) {
          return (
            <p
              className="campaign-story-text"
              key={block.id || `legacy-text-${index}`}
            >
              {legacyText}
            </p>
          );
        }

        return null;
      })}
    </div>
  );
}

/* =========================================================
   STORY IMAGES
========================================================= */

function CreatorStoryImages({ images, campaignTitle }) {
  const safeImages = images.filter(
    (url) =>
      typeof url === "string" && url.trim() && !url.trim().startsWith("blob:"),
  );

  if (!safeImages.length) {
    return null;
  }

  return (
    <div
      className={`campaign-story-images campaign-story-images--${Math.min(
        safeImages.length,
        4,
      )}`}
    >
      {safeImages.map((url, index) => (
        <div className="campaign-story-image" key={`${url}-${index}`}>
          <img
            src={url}
            alt={`${campaignTitle || "Campaign"} story image ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   STORY VIDEO
========================================================= */

function CreatorStoryVideo({ url, blockId }) {
  const embedUrl = getVideoEmbedUrl(url);

  if (!embedUrl) {
    return null;
  }

  return (
    <div className="campaign-story-video">
      <iframe
        src={embedUrl}
        title={`Campaign video ${blockId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

/* =========================================================
   STORY HELPERS
========================================================= */

function parseStoryBlocks(blocks) {
  if (Array.isArray(blocks)) {
    return blocks;
  }

  if (typeof blocks === "string" && blocks.trim()) {
    try {
      const parsed = JSON.parse(blocks);

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
}

function getStoryImages(block) {
  if (!block || typeof block !== "object") {
    return [];
  }

  if (Array.isArray(block.media)) {
    return block.media.filter(
      (url) =>
        typeof url === "string" &&
        url.trim() &&
        !url.trim().startsWith("blob:"),
    );
  }

  const singleImage =
    block.src || block.imageUrl || block.image_url || block.image || "";

  if (
    typeof singleImage === "string" &&
    singleImage.trim() &&
    !singleImage.trim().startsWith("blob:")
  ) {
    return [singleImage];
  }

  if (
    block.type !== "video" &&
    typeof block.url === "string" &&
    block.url.trim() &&
    !block.url.trim().startsWith("blob:")
  ) {
    return [block.url];
  }

  return [];
}

function hasRenderableStoryBlock(block) {
  if (!block) {
    return false;
  }

  if (typeof block === "string") {
    return Boolean(block.trim());
  }

  const blockType = String(block.type || block.blockType || "").toLowerCase();

  if (blockType === "video") {
    return Boolean(getVideoEmbedUrl(block.url || ""));
  }

  if (getStoryImages(block).length > 0) {
    return true;
  }

  return Boolean(
    block.title?.trim() ||
    block.content?.trim() ||
    block.text?.trim() ||
    block.value?.trim() ||
    block.body?.trim(),
  );
}

function renderFallbackStory(value) {
  if (!value) {
    return <p>No campaign story has been added yet.</p>;
  }

  const paragraphs = String(value)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) {
    return <p>No campaign story has been added yet.</p>;
  }

  return paragraphs.map((paragraph, index) => (
    <p key={`fallback-story-${index}`}>{paragraph}</p>
  ));
}

/* =========================================================
   VIDEO URL HELPER
========================================================= */

function getVideoEmbedUrl(value) {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(value.trim());

    const hostname = url.hostname.replace(/^www\./, "").toLowerCase();

    if (hostname === "youtu.be") {
      const videoId = url.pathname.split("/").filter(Boolean)[0];

      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      if (url.pathname === "/watch") {
        const videoId = url.searchParams.get("v");

        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }

      const parts = url.pathname.split("/").filter(Boolean);

      if (
        parts[0] === "embed" ||
        parts[0] === "shorts" ||
        parts[0] === "live"
      ) {
        const videoId = parts[1];

        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }
    }

    if (hostname === "vimeo.com" || hostname === "player.vimeo.com") {
      const parts = url.pathname.split("/").filter(Boolean);

      const videoId =
        hostname === "player.vimeo.com" && parts[0] === "video"
          ? parts[1]
          : parts[0];

      if (videoId && /^\d+$/.test(videoId)) {
        return `https://player.vimeo.com/video/${videoId}`;
      }
    }

    return null;
  } catch {
    return null;
  }
}
