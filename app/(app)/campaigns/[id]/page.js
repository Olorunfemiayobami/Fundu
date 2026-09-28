"use client";

import LoadingScreen, { NotFoundScreen } from "@/components/feedback/LoadingScreen";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import CampaignStorageImage from "@/components/campaigns/CampaignStorageImage";
import ActionDialog from "@/components/feedback/ActionDialog";
import "@/styles/campaign-detail.css";
import Badge from "@/components/ui/Badge";

export default function CampaignDetailPage() {
  const params = useParams();
  const router = useRouter();

  const campaignId = params?.id;

  const [campaign, setCampaign] = useState(null);
  const [failedHeaderCover, setFailedHeaderCover] = useState(null);
  const [creator, setCreator] = useState(null);
  const [category, setCategory] = useState(null);
  const [bankAccount, setBankAccount] = useState(null);
  const [activity, setActivity] = useState([]);
  const [campaignUpdates, setCampaignUpdates] = useState([]);
  const [publicShareUrl, setPublicShareUrl] = useState("");
  const [shareCopied, setShareCopied] = useState(false);
  const [shareCopyError, setShareCopyError] = useState("");
  const shareCopyTimerRef = useRef(null);

  useEffect(() => {
    setPublicShareUrl(
      campaignId ? `${window.location.origin}/campaign/${campaignId}` : "",
    );
    setShareCopied(false);
    setShareCopyError("");
    return () => window.clearTimeout(shareCopyTimerRef.current);
  }, [campaignId]);
  const [campaignComments, setCampaignComments] = useState([]);
  const [commentAuthors, setCommentAuthors] = useState({});
  const [commentsLoadError, setCommentsLoadError] = useState(false);
  const [campaignMetrics, setCampaignMetrics] = useState(null);
  const [metricsLoadError, setMetricsLoadError] = useState(false);

  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  const [showAmountModal, setShowAmountModal] = useState(false);
  const [newAmountRaised, setNewAmountRaised] = useState("");
  const [savingAmount, setSavingAmount] = useState(false);
  const [endingCampaign, setEndingCampaign] = useState(false);
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [endError, setEndError] = useState("");
  const [countdownNow, setCountdownNow] = useState(null);

  const [showRestartModal, setShowRestartModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingCampaign, setDeletingCampaign] = useState(false);
  const [deleteError, setDeleteError] = useState("");

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
  const modalActionsRef = useRef(null);
  modalActionsRef.current = {
    busy: savingAmount || postingUpdate || deletingCampaign,
    close() {
      if (viewingUpdateImage) setViewingUpdateImage(null);
      else if (showPostUpdateModal) closePostUpdateModal();
      else if (showAmountModal) setShowAmountModal(false);
      else if (showRestartModal) setShowRestartModal(false);
      else if (showDeleteModal) setShowDeleteModal(false);
    },
  };

  useEffect(() => {
    if (
      !(
        viewingUpdateImage ||
        showPostUpdateModal ||
        showAmountModal ||
        showRestartModal ||
        showDeleteModal
      )
    )
      return;
    const trigger = document.activeElement;
    const dialog = document.querySelector(
      ".campaign-update-lightbox__content, .campaign-update-modal, .campaign-detail-modal",
    );
    if (!dialog) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function focusable() {
      return [
        ...dialog.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [tabindex="0"]',
        ),
      ].filter((element) => element.getClientRects().length > 0);
    }
    (focusable()[0] || dialog).focus();
    function onKey(event) {
      if (event.key === "Escape" && !modalActionsRef.current.busy) {
        event.preventDefault();
        modalActionsRef.current.close();
      }
      if (event.key !== "Tab") return;
      const controls = focusable();
      if (!controls.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = controls[0],
        last = controls[controls.length - 1];
      if (
        event.shiftKey &&
        (document.activeElement === first ||
          !dialog.contains(document.activeElement))
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last ||
          !dialog.contains(document.activeElement))
      ) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
      if (trigger?.isConnected) trigger.focus();
    };
  }, [
    viewingUpdateImage,
    showPostUpdateModal,
    showAmountModal,
    showRestartModal,
    showDeleteModal,
  ]);

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

    const intervalId = window.setInterval(updateCountdown, 60000);

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

      const commentsPromise = supabase
        .from("comments")
        .select("id, campaign_id, user_id, content, created_at")
        .eq("campaign_id", campaignRow.id)
        .order("created_at", { ascending: false });
      const metricsPromise = supabase
        .from("campaign_metrics")
        .select("campaign_id, donation_clicks")
        .eq("campaign_id", campaignRow.id)
        .maybeSingle();

      const [
        creatorResult,
        categoryResult,
        bankResult,
        activityResult,
        updatesResult,
        commentsResult,
        metricsResult,
      ] = await Promise.all([
        creatorPromise,
        categoryPromise,
        bankPromise,
        activityPromise,
        updatesPromise,
        commentsPromise,
        metricsPromise,
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
      setCommentsLoadError(Boolean(commentsResult.error));
      setCampaignComments(
        commentsResult.error ? [] : commentsResult.data || [],
      );
      setMetricsLoadError(Boolean(metricsResult.error));
      setCampaignMetrics(
        metricsResult.error ? null : metricsResult.data || null,
      );
      if (commentsResult.error)
        console.error("Campaign comments load error:", commentsResult.error);
      if (metricsResult.error)
        console.error("Campaign metrics load error:", metricsResult.error);
      const authorIds = [
        ...new Set(
          (commentsResult.data || []).map((row) => row.user_id).filter(Boolean),
        ),
      ];
      if (authorIds.length) {
        const { data: authors, error: authorsError } = await supabase
          .from("users")
          .select("id, display_name, full_name")
          .in("id", authorIds);
        if (authorsError)
          console.error("Comment authors load error:", authorsError);
        setCommentAuthors(
          Object.fromEntries(
            (authors || []).map((author) => [author.id, author]),
          ),
        );
      } else {
        setCommentAuthors({});
      }
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

  const liveStart = new Date(
    campaign?.start_date || campaign?.created_at || Date.now(),
  ).getTime();
  const daysLive = Number.isFinite(liveStart)
    ? Math.max(0, Math.floor((Date.now() - liveStart) / 86400000))
    : 0;

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
          cacheControl: "60",
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
    if (endingCampaign) return;
    setEndError("");
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

      const { data: endedRow, error } = await supabase
        .from("campaigns")
        .update({
          status: "ended",
          end_date: endedAt,
          updated_at: endedAt,
        })
        .eq("id", campaign.id)
        .eq("creator_id", user.id)
        .eq("status", "active")
        .select("id")
        .maybeSingle();

      if (error) {
        throw error;
      }
      if (!endedRow) throw new Error("Campaign could not be ended.");

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
      setShowEndDialog(false);
    } catch (error) {
      console.error("End campaign error:", error);
      setEndError("That didn't work. Nothing has changed yet. Try again.");
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
    setDeleteError("");
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
      window.sessionStorage.setItem("fundu-campaign-deleted", "1");

      router.replace("/campaigns");
      router.refresh();
    } catch (error) {
      console.error("Delete campaign error:", error);
      setDeleteError("That didn't work. Nothing has changed yet. Try again.");
    } finally {
      setDeletingCampaign(false);
    }
  }

  /* =========================================================
     SHARE
  ========================================================= */

  function handleShareCampaign() {
    const shareCard = document.getElementById("creator-campaign-share");
    shareCard?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "center",
    });
    shareCard?.focus({ preventScroll: true });
  }

  async function copyPublicCampaignLink() {
    if (!publicShareUrl) return;
    setShareCopyError("");
    try {
      await navigator.clipboard.writeText(publicShareUrl);
      setShareCopied(true);
      window.clearTimeout(shareCopyTimerRef.current);
      shareCopyTimerRef.current = window.setTimeout(
        () => setShareCopied(false),
        2500,
      );
    } catch {
      setShareCopyError("Copy the campaign link from the field above.");
      window.prompt("Copy this campaign link:", publicShareUrl);
    }
  }

  function sharePublicCampaignTo(platform) {
    if (!publicShareUrl || !campaign) return;
    const url = encodeURIComponent(publicShareUrl);
    const text = encodeURIComponent(
      `View ${campaign.title || "this campaign"} on Fundu`,
    );
    const links = {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      x: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    };
    if (links[platform])
      window.open(links[platform], "_blank", "noopener,noreferrer");
  }

  /* =========================================================
     STATES
  ========================================================= */

  if (loading) {
    return (
      <LoadingScreen variant="detail" label="Loading campaign" />
    );
  }

  if (pageError === "Campaign not found.") {
    return <NotFoundScreen homeHref="/dashboard" exploreHref="/explore" />;
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
    campaign.cover_image || campaign.image_url || campaign.preview_image || "";

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

        {/* CAMPAIGN HEADER — STEP 1 */}

        <section
          className="creator-campaign-header"
          aria-labelledby="creator-campaign-title"
        >
          <div className="creator-campaign-header__cover">
            {coverImage && failedHeaderCover !== coverImage ? (
              <CampaignStorageImage
                src={coverImage}
                alt={`${campaign.title || "Campaign"} cover`}
                onError={() => setFailedHeaderCover(coverImage)}
              />
            ) : (
              <Link
                href={`/create-campaign?campaign=${campaign.id}`}
                className="creator-campaign-header__missing-cover"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8" cy="8" r="1.5" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
                <span>Add a cover image</span>
              </Link>
            )}
          </div>

          <div className="creator-campaign-header__copy">
            <div className="creator-campaign-header__tags">
              <Badge status={isActive ? "Active" : statusLabel} />
              <span className="creator-campaign-header__category">
                {category?.name || "Uncategorized"}
              </span>
            </div>

            <h1 id="creator-campaign-title">
              {campaign.title || "Untitled campaign"}
            </h1>
            <p>Organized by {organizerName}.</p>
            <p>
              {campaign.status === "draft" ? "Created: " : "Published: "}
              {formatShortDate(
                campaign.status === "draft"
                  ? campaign.created_at
                  : campaign.start_date || campaign.created_at,
              )}
              .{" "}
              {campaign.end_date
                ? `${isInactive ? "Ended" : "Ends"}: ${formatShortDate(campaign.end_date)}.`
                : "No end date."}
            </p>
          </div>

          <div className="creator-campaign-header__actions">
            {!isInactive && (
              <Link
                href={`/create-campaign?campaign=${campaign.id}`}
                className="creator-campaign-header__button creator-campaign-header__edit"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m15 5 4 4M4 20l4-1L20 7a2.8 2.8 0 0 0-4-4L4 15l-1 5ZM12 20h9" />
                </svg>
                <span className="creator-campaign-header__edit-desktop">
                  Edit campaign
                </span>
                <span className="creator-campaign-header__edit-mobile">
                  Edit
                </span>
              </Link>
            )}

            <button
              type="button"
              className="creator-campaign-header__button creator-campaign-header__share"
              onClick={handleShareCampaign}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4" />
              </svg>
              Share campaign
            </button>

            <Link
              href={`/campaign/${campaign.id}`}
              className="creator-campaign-header__public"
            >
              View public page
              <img src="/images/campaign-detail/external-link.svg" alt="" />
            </Link>
          </div>
        </section>

        {/* DESKTOP TWO-COLUMN CONTENT */}

        <div className="campaign-detail-columns">
          <main className="campaign-detail-primary-column">
            {/* FUNDRAISING, UPDATES, COMMENTS AND STORY — STEP 2 */}
            <section
              className="creator-content-card creator-progress"
              aria-labelledby="creator-progress-title"
            >
              <div className="creator-progress__top">
                <div>
                  <h2 id="creator-progress-title">Fundraising progress</h2>
                  <div className="creator-progress__amount">
                    <strong>
                      {formatMoney(amountRaised, campaign.currency)}
                    </strong>
                    <span>
                      raised of {formatMoney(goalAmount, campaign.currency)}{" "}
                      goal
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="creator-content-button creator-content-button--teal creator-progress__edit"
                  onClick={() => {
                    setNewAmountRaised(String(amountRaised));
                    setShowAmountModal(true);
                  }}
                >
                  Update amount raised
                </button>
              </div>
              <div
                className="creator-progress__track"
                role="progressbar"
                aria-label="Campaign fundraising progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progressBarPercent)}
                aria-valuetext={`${formatMoney(amountRaised, campaign.currency)} reported raised of ${formatMoney(goalAmount, campaign.currency)} goal`}
              >
                <div style={{ width: `${progressBarPercent}%` }} />
              </div>
              <div className="creator-progress__meta">
                <strong>{Math.round(progressPercent)}% of goal</strong>
                <span>
                  {isInactive
                    ? `Campaign ended${campaign.end_date ? ` ${formatShortDate(campaign.end_date)}` : ""}`
                    : campaign.end_date
                      ? `Ends ${formatCampaignEndDateTime(campaign.end_date)}`
                      : "No end date"}
                </span>
              </div>
              <dl className="creator-progress__stats">
                <div>
                  <dd>
                    {campaign.status === "draft"
                      ? "Not started"
                      : isInactive
                        ? "Ended"
                        : campaign.end_date
                          ? `${daysRemaining} ${daysRemaining === 1 ? "day" : "days"}`
                          : `${daysLive} ${daysLive === 1 ? "day" : "days"}`}
                  </dd>
                  <dt>
                    {campaign.status === "draft"
                      ? "Draft campaign"
                      : isInactive
                        ? "Campaign status"
                        : campaign.end_date
                          ? "Left to go"
                          : "Live so far"}
                  </dt>
                </div>
                <div>
                  <dd>
                    {metricsLoadError
                      ? "Unavailable"
                      : (campaignMetrics?.donation_clicks ?? 0)}
                  </dd>
                  <dt>Link clicks</dt>
                </div>
                <div>
                  <dd>{campaignUpdates.length}</dd>
                  <dt>Updates posted</dt>
                </div>
              </dl>
              <div className="creator-progress__note">
                <img src="/images/campaign-detail/info.svg" alt="" />
                <p>
                  This amount is based on contributions you&apos;ve recorded.
                  Fundu doesn&apos;t track incoming bank transfers.
                </p>
              </div>
            </section>

            <section
              className="creator-content-card"
              aria-labelledby="creator-updates-title"
            >
              <div className="creator-content-card__header">
                <h2 id="creator-updates-title">
                  Updates <span>{campaignUpdates.length}</span>
                </h2>
                <button
                  type="button"
                  className="creator-content-button creator-content-button--orange"
                  onClick={openPostUpdateModal}
                >
                  <span aria-hidden="true">+</span>{" "}
                  {isInactive ? "Post final update" : "Post update"}
                </button>
              </div>
              {campaignUpdates.length ? (
                <div className="creator-updates">
                  {campaignUpdates.map((update) => {
                    const images = Array.isArray(update.image_urls)
                      ? update.image_urls
                      : [];
                    return (
                      <article className="creator-update" key={update.id}>
                        {update.is_final_update && (
                          <span className="creator-update__final">
                            Final update
                          </span>
                        )}
                        <h3>{update.title || "Campaign update"}</h3>
                        {update.content && <p>{update.content}</p>}
                        {images.length > 0 && (
                          <div className="creator-update__photos">
                            {images.map((url, index) => (
                              <button
                                type="button"
                                key={`${url}-${index}`}
                                onClick={() => setViewingUpdateImage(url)}
                                aria-label={`View ${update.title || "update"} photo ${index + 1}`}
                              >
                                <CampaignStorageImage
                                  src={url}
                                  alt={`${update.title || "Update"} photo ${index + 1}`}
                                />
                              </button>
                            ))}
                          </div>
                        )}
                        <div className="creator-update__footer">
                          <span>
                            Posted {formatLongDate(update.created_at)}
                          </span>
                          <div className="creator-update__actions">
                            <button
                              type="button"
                              className="creator-update__desktop-edit"
                              onClick={() => handleOpenEditUpdate(update)}
                            >
                              Edit
                            </button>
                            <details
                              className="creator-update__menu"
                              onKeyDown={(event) => {
                                if (event.key === "Escape") {
                                  event.currentTarget.open = false;
                                  event.currentTarget
                                    .querySelector("summary")
                                    ?.focus();
                                }
                              }}
                            >
                              <summary
                                aria-label={`More actions for ${update.title || "campaign update"}`}
                              >
                                ⋯
                              </summary>
                              <div>
                                <button
                                  type="button"
                                  className="creator-update__mobile-edit"
                                  onClick={(event) => {
                                    event.currentTarget.closest(
                                      "details",
                                    ).open = false;
                                    handleOpenEditUpdate(update);
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  className="creator-update__delete"
                                  onClick={(event) => {
                                    event.currentTarget.closest(
                                      "details",
                                    ).open = false;
                                    handleDeleteCampaignUpdate(update);
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </details>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="creator-content-empty">
                  <strong>No updates yet</strong>
                  <p>
                    {isInactive
                      ? "Share a final update about how the campaign ended and what supporters helped achieve."
                      : "Share progress, milestones, photos and how the money is being used. Updates appear on your public page and help keep supporters informed."}
                  </p>
                </div>
              )}
            </section>

            <section
              className="creator-content-card"
              aria-labelledby="creator-comments-title"
            >
              <div className="creator-content-card__header">
                <h2 id="creator-comments-title">
                  Comments <span>{campaignComments.length}</span>
                </h2>
                <Link
                  href={`/campaign/${campaign.id}`}
                  className="creator-content-link"
                >
                  See on public page
                </Link>
              </div>
              {commentsLoadError ? (
                <div className="creator-content-empty">
                  <p>
                    We couldn&apos;t load comments. Refresh the page to try
                    again.
                  </p>
                </div>
              ) : campaignComments.length ? (
                <div className="creator-comments">
                  {campaignComments.map((comment) => {
                    const author = commentAuthors[comment.user_id];
                    return (
                      <article className="creator-comment" key={comment.id}>
                        <div className="creator-comment__meta">
                          <strong>
                            {author?.display_name ||
                              author?.full_name ||
                              "Supporter"}
                          </strong>
                          <span>{formatLongDate(comment.created_at)}</span>
                        </div>
                        <p>{comment.content}</p>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="creator-content-empty">
                  <strong>No comments yet</strong>
                  <p>
                    When supporters leave a comment on your public page,
                    you&apos;ll see it here.
                  </p>
                </div>
              )}
            </section>

            <section
              className="creator-content-card"
              aria-labelledby="creator-story-title"
            >
              <div className="creator-content-card__header">
                <h2 id="creator-story-title">Campaign story</h2>
                {!isInactive && (
                  <Link
                    href={`/create-campaign?campaign=${campaign.id}`}
                    className="creator-content-button"
                  >
                    Edit story
                  </Link>
                )}
              </div>
              <div className="creator-story-content">
                <CreatorStoryBlocks
                  blocks={campaign.story_blocks}
                  fallbackText={
                    campaign.story_content ||
                    campaign.description ||
                    "No campaign story has been added yet."
                  }
                  campaignTitle={campaign.title}
                  onViewImage={setViewingUpdateImage}
                />
              </div>
            </section>
          </main>

          {/* SIDEBAR */}

          <aside className="campaign-detail-sidebar">
            <section
              id="creator-campaign-share"
              className="creator-rail-card creator-share"
              tabIndex={-1}
              aria-labelledby="creator-share-title"
            >
              <h2 id="creator-share-title">Share your campaign</h2>
              <p>One link with your story, goal and bank details.</p>
              {campaign.status === "draft" ? (
                <p>Publish your campaign before sharing its public link.</p>
              ) : (
                <>
                  <div className="creator-share__link">
                    <input
                      type="text"
                      readOnly
                      value={publicShareUrl}
                      aria-label="Public campaign link"
                      onFocus={(event) => event.target.select()}
                    />
                    <button
                      type="button"
                      className="creator-content-button creator-content-button--teal"
                      onClick={copyPublicCampaignLink}
                      disabled={!publicShareUrl}
                      aria-label="Copy campaign link"
                    >
                      {shareCopied ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="creator-share__social">
                    <button
                      type="button"
                      onClick={() => sharePublicCampaignTo("whatsapp")}
                      disabled={!publicShareUrl}
                    >
                      WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={() => sharePublicCampaignTo("x")}
                      disabled={!publicShareUrl}
                    >
                      X
                    </button>
                    <button
                      type="button"
                      onClick={() => sharePublicCampaignTo("facebook")}
                      disabled={!publicShareUrl}
                    >
                      Facebook
                    </button>
                  </div>
                </>
              )}
              <span className="creator-rail-announcement" role="status">
                {shareCopied ? "Campaign link copied." : shareCopyError}
              </span>
            </section>

            <section
              className="creator-rail-card creator-bank"
              aria-labelledby="creator-bank-title"
            >
              <div className="creator-rail-card__heading">
                <h2 id="creator-bank-title">Supporters pay into</h2>
                {!isInactive && (
                  <Link href="/settings">
                    {bankAccount ? "Manage" : "Add account"}
                  </Link>
                )}
              </div>
              {bankAccount ? (
                <>
                  <strong className="creator-bank__number">
                    {bankAccount.account_number}
                  </strong>
                  <p>
                    {bankAccount.bank_name}, {bankAccount.account_holder_name}
                  </p>
                </>
              ) : (
                <p>No bank account linked to this campaign.</p>
              )}
              <p className="creator-bank__note">
                {isInactive
                  ? "This account was linked to your campaign. Its bank details are hidden from the public after the campaign ends."
                  : "Money goes straight to this account. Fundu never holds your campaign funds."}
              </p>
            </section>

            <section
              className="creator-rail-card"
              aria-labelledby="creator-info-title"
            >
              <div className="creator-rail-card__heading">
                <h2 id="creator-info-title">Campaign info</h2>
                {!isInactive && (
                  <Link href={`/create-campaign?campaign=${campaign.id}`}>
                    Edit
                  </Link>
                )}
              </div>
              <dl className="creator-rail-info">
                <div>
                  <dt>Category</dt>
                  <dd>{category?.name || "Uncategorized"}</dd>
                </div>
                <div>
                  <dt>Goal</dt>
                  <dd>{formatMoney(goalAmount, campaign.currency)}</dd>
                </div>
                <div>
                  <dt>Organizer</dt>
                  <dd>{organizerName}</dd>
                </div>
                <div>
                  <dt>
                    {campaign.status === "draft" ? "Created" : "Published"}
                  </dt>
                  <dd>
                    {formatLongDate(
                      campaign.status === "draft"
                        ? campaign.created_at
                        : campaign.start_date || campaign.created_at,
                    )}
                  </dd>
                </div>
                <div>
                  <dt>{isInactive ? "Ended" : "Ends"}</dt>
                  <dd>
                    {campaign.end_date
                      ? formatCampaignEndDateTime(campaign.end_date)
                      : "No end date"}
                  </dd>
                </div>
              </dl>
            </section>

            <section
              className="creator-rail-card"
              aria-labelledby="creator-activity-title"
            >
              <div className="creator-rail-card__heading">
                <h2 id="creator-activity-title">Activity</h2>
                <Link href="/activity">View all</Link>
              </div>
              {activity.length ? (
                <ul className="creator-rail-activity">
                  {activity.slice(0, 5).map((item) => (
                    <li key={item.id}>
                      <p>
                        {item.description || item.title || "Campaign updated"}
                      </p>
                      <time dateTime={item.created_at}>
                        {formatActivityDate(item.created_at)}
                      </time>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Changes to this campaign will appear here.</p>
              )}
            </section>

            {isActive && (
              <section
                className="creator-rail-card creator-end"
                aria-labelledby="creator-end-title"
              >
                <h2 id="creator-end-title">End this campaign</h2>
                <p>
                  Supporters will see it as ended and the page will stop asking
                  for support. Public bank details will be hidden.
                </p>
                <button
                  type="button"
                  className="creator-content-button creator-end__button"
                  onClick={() => { setEndError(""); setShowEndDialog(true); }}
                  disabled={endingCampaign}
                >
                  {endingCampaign ? "Ending campaign..." : "End campaign early"}
                </button>
              </section>
            )}

            {isInactive && (
              <section
                className="creator-rail-card creator-ended-actions"
                aria-labelledby="creator-ended-title"
              >
                <h2 id="creator-ended-title">Campaign ended</h2>
                <p>
                  Your story and updates remain visible. You can still post
                  updates and change the recorded amount raised.
                </p>
                <button
                  type="button"
                  className="creator-content-button creator-content-button--teal"
                  onClick={handleRestartCampaign}
                >
                  Reactivate campaign
                </button>
                <button
                  type="button"
                  className="creator-content-button creator-end__button"
                  onClick={handleDeleteCampaign}
                  disabled={deletingCampaign}
                >
                  {deletingCampaign
                    ? "Deleting campaign..."
                    : "Delete campaign"}
                </button>
              </section>
            )}
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
          <div
            className="campaign-update-lightbox__content"
            role="dialog"
            aria-modal="true"
            aria-label="Campaign photo"
            tabIndex={-1}
          >
            <button
              type="button"
              className="campaign-update-lightbox__close"
              onClick={() => setViewingUpdateImage(null)}
              aria-label="Close image"
            >
              ×
            </button>

            <CampaignStorageImage
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
          <div
            className="campaign-detail-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Update amount raised"
            tabIndex={-1}
          >
            <div className="campaign-detail-modal-header">
              <div>
                <h2>Update Amount Raised</h2>

                <p>Record the total amount raised so far.</p>
              </div>

              <button
                type="button"
                className="campaign-detail-modal-close"
                aria-label="Close dialog"
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
                        <CampaignStorageImage
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
          <div
            className="campaign-detail-modal campaign-detail-action-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Reactivate campaign"
            tabIndex={-1}
          >
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
                aria-label="Close dialog"
                onClick={() => setShowRestartModal(false)}
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

      <ActionDialog open={showEndDialog} onClose={() => setShowEndDialog(false)} busy={endingCampaign} error={endError} title="End this campaign early?" description="The story and updates stay public, but the page will show the campaign as ended and stop asking for support. This doesn't delete it." icon="stop" tone="warning" safeLabel="Keep campaign active" actionLabel="End campaign" busyLabel="Ending…" onAction={handleEndCampaignEarly}>
        <div className="action-dialog-campaign">{coverImage && <CampaignStorageImage src={coverImage} alt="" />}<div><small>Campaign</small><strong>{campaign?.title || "Untitled campaign"}</strong></div></div>
      </ActionDialog>
      <ActionDialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)} busy={deletingCampaign} error={deleteError} title="Delete this campaign?" description="Deleting removes the campaign and makes its link unavailable." icon="trash" tone="danger" safeLabel="Cancel" actionLabel="Delete campaign" busyLabel="Deleting…" onAction={handleConfirmDeleteCampaign}>
        <div className="action-dialog-campaign">{coverImage && <CampaignStorageImage src={coverImage} alt="" />}<div><small>Campaign</small><strong>{campaign?.title || "Untitled campaign"}</strong></div></div>
      </ActionDialog>
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

function CreatorStoryBlocks({
  blocks,
  fallbackText,
  campaignTitle,
  onViewImage,
}) {
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
                  onViewImage={onViewImage}
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
              onViewImage={onViewImage}
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
              onViewImage={onViewImage}
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

function CreatorStoryImages({ images, campaignTitle, onViewImage }) {
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
        <button
          type="button"
          className="campaign-story-image"
          key={`${url}-${index}`}
          onClick={() => onViewImage?.(url)}
          aria-label={`View ${campaignTitle || "campaign"} story photo ${index + 1}`}
        >
          <CampaignStorageImage
            src={url}
            alt={`${campaignTitle || "Campaign"} story image ${index + 1}`}
          />
        </button>
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
