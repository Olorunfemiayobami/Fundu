"use client";

import LoadingScreen from "@/components/feedback/LoadingScreen";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { saveCampaign } from "@/lib/saveCampaign";
import CampaignCard from "@/components/campaigns/CampaignCard";
import CampaignStorageImage from "@/components/campaigns/CampaignStorageImage";
import ActionDialog from "@/components/feedback/ActionDialog";
import "@/styles/campaigns-page.css";
import "@/styles/campaign-detail.css";
function campaignHasExpired(campaign) {
  if (!campaign?.end_date) return false;
  const endDate = new Date(campaign.end_date);
  return !Number.isNaN(endDate.getTime()) && endDate.getTime() <= Date.now();
}
function getCampaignState(campaign) {
  const status = campaign?.status?.toLowerCase() || "draft";
  if (status === "draft") return "draft";
  if (status === "inactive" || status === "ended" || status === "completed") {
    return "inactive";
  }
  if (status === "active" && campaignHasExpired(campaign)) {
    return "inactive";
  }
  return status;
}
export default function CampaignsPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [campaignToDelete, setCampaignToDelete] = useState(null);
  const [deletingCampaign, setDeletingCampaign] = useState(false);
  const [campaignToUpdate, setCampaignToUpdate] = useState(null);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContent, setUpdateContent] = useState("");
  const [updateImages, setUpdateImages] = useState([]);
  const [postingUpdate, setPostingUpdate] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const updateFileInputRef = useRef(null);
  const endingCampaignRef = useRef(false);

  /* =========================================================
     LOAD CAMPAIGNS
  ========================================================= */

  useEffect(() => {
    let mounted = true;
    async function loadCampaigns() {
      try {
        setLoading(true);
        setPageError("");
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();
        if (authError) throw authError;
        if (!user) {
          router.replace("/signin");
          return;
        }
        const { data, error } = await supabase
          .from("campaigns")
          .select(
            `
            id,
            creator_id,
            title,
            status,
            cover_image,
            image_url,
            preview_image,
            currency,
            goal_amount,
            amount_raised,
            start_date,
            end_date,
            created_at,
            updated_at
          `,
          )
          .eq("creator_id", user.id)
          .order("created_at", {
            ascending: false,
          });
        if (error) throw error;
        if (!mounted) return;
        const campaignIds = (data || []).map((campaign) => campaign.id);
        let metricsByCampaign = {};
        let updatesCountByCampaign = {};
        if (campaignIds.length > 0) {
          const { data: metrics, error: metricsError } = await supabase
            .from("campaign_metrics")
            .select(
              `
              campaign_id,
              donation_clicks,
              views_count,
              total_donations_logged,
              last_updated
            `,
            )
            .in("campaign_id", campaignIds);
          if (metricsError) {
            console.error("Campaign metrics error:", metricsError);
          }
          metricsByCampaign = (metrics || []).reduce((accumulator, metric) => {
            accumulator[metric.campaign_id] = metric;
            return accumulator;
          }, {});
          const { data: updatesData, error: updatesError } = await supabase
            .from("campaign_updates")
            .select("id, campaign_id")
            .in("campaign_id", campaignIds);
          if (updatesError) {
            console.error("Campaign updates count error:", updatesError);
          }
          updatesCountByCampaign = (updatesData || []).reduce(
            (accumulator, update) => {
              accumulator[update.campaign_id] =
                (accumulator[update.campaign_id] || 0) + 1;
              return accumulator;
            },
            {},
          );
        }
        if (!mounted) return;
        setCampaigns(
          (data || []).map((campaign) => ({
            ...campaign,
            metrics: metricsByCampaign[campaign.id] || null,
            updates_count: updatesCountByCampaign[campaign.id] || 0,
          })),
        );
      } catch (error) {
        console.error("Campaigns page error:", error);
        if (mounted) {
          setPageError("We couldn't load your campaigns. Please try again.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadCampaigns();
    return () => {
      mounted = false;
    };
  }, [router]);
  const [draftSort, setDraftSort] = useState("recent");
  const [selectedDrafts, setSelectedDrafts] = useState([]);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [operationBusy, setOperationBusy] = useState(false);
  const [operationMessage, setOperationMessage] = useState("");
  const [operationError, setOperationError] = useState("");
  const [listClock, setListClock] = useState(Date.now());
  const operationLock = useRef(false),
    selectAllRef = useRef(null),
    modalStateRef = useRef(null);
  useEffect(() => {
    if (window.sessionStorage.getItem("fundu-campaign-deleted") === "1") {
      window.sessionStorage.removeItem("fundu-campaign-deleted");
      setOperationMessage("Campaign deleted");
    }
  }, []);
  modalStateRef.current = {
    busy: postingUpdate || deletingCampaign || bulkDeleting,
    close() {
      if (campaignToUpdate) handleClosePostUpdate();
      else if (campaignToDelete) setCampaignToDelete(null);
      else setBulkDeleteOpen(false);
    },
  };
  useEffect(() => {
    const timer = window.setInterval(() => setListClock(Date.now()), 30000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    setSelectedDrafts([]);
  }, [activeFilter, searchQuery]);
  useEffect(() => {
    setSelectedDrafts((current) =>
      current.filter((id) =>
        campaigns.some((row) => row.id === id && row.status === "draft"),
      ),
    );
  }, [campaigns]);
  useEffect(() => {
    if (!campaignToUpdate && !campaignToDelete && !bulkDeleteOpen) return;
    const dialog = document.querySelector(
      ".campaign-update-modal, .campaigns-delete-modal",
    );
    if (!dialog) return;
    const trigger = document.activeElement,
      overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const controls = () =>
      [
        ...dialog.querySelectorAll(
          'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), a[href], [tabindex="0"]',
        ),
      ].filter((element) => element.getClientRects().length);
    (
      dialog.querySelector("[data-initial-focus]") ||
      controls()[0] ||
      dialog
    ).focus();
    function key(event) {
      if (event.key === "Escape" && !modalStateRef.current.busy) {
        event.preventDefault();
        modalStateRef.current.close();
      }
      if (event.key !== "Tab") return;
      const list = controls(),
        first = list[0],
        last = list[list.length - 1];
      if (!list.length) {
        event.preventDefault();
        dialog.focus();
      } else if (
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
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      document.body.style.overflow = overflow;
      if (trigger?.isConnected) trigger.focus();
    };
  }, [campaignToUpdate, campaignToDelete, bulkDeleteOpen]);
  const collectionRows = useMemo(() => {
    const search = searchQuery.trim().toLowerCase();
    return campaigns.filter(
      (row) =>
        (activeFilter === "all" || getCampaignState(row) === activeFilter) &&
        (!search || (row.title || "").toLowerCase().includes(search)),
    );
  }, [campaigns, activeFilter, searchQuery, listClock]);
  const liveRows = collectionRows.filter(
    (row) => getCampaignState(row) === "active",
  );
  const draftRows = collectionRows
    .filter((row) => getCampaignState(row) === "draft")
    .sort((a, b) => {
      const sort = activeFilter === "draft" ? draftSort : "recent";
      if (sort === "attention") {
        const missingA = !getCover(a),
          missingB = !getCover(b);
        if (missingA !== missingB) return missingA ? -1 : 1;
      }
      return sort === "oldest"
        ? (Date.parse(a.created_at) || 0) - (Date.parse(b.created_at) || 0)
        : (Date.parse(b.updated_at || b.created_at) || 0) -
            (Date.parse(a.updated_at || a.created_at) || 0);
    });
  const endedRows = collectionRows.filter(
    (row) => getCampaignState(row) === "inactive",
  );
  const missingCoverCount = campaigns.filter(
    (row) => row.status === "draft" && !getCover(row),
  ).length;
  const visibleDraftIds = draftRows.map((row) => row.id);
  const selectedVisible = visibleDraftIds.filter((id) =>
    selectedDrafts.includes(id),
  );
  const allDraftsSelected =
    visibleDraftIds.length > 0 &&
    selectedVisible.length === visibleDraftIds.length;
  useEffect(() => {
    if (selectAllRef.current)
      selectAllRef.current.indeterminate =
        selectedVisible.length > 0 && !allDraftsSelected;
  }, [selectedDrafts, draftRows.length, allDraftsSelected]);
  function toggleDraft(id) {
    setSelectedDrafts((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }
  function toggleAllDrafts() {
    setSelectedDrafts(allDraftsSelected ? [] : visibleDraftIds);
  }
  function openBulkDelete() {
    if (!selectedVisible.length || operationBusy || bulkDeleting) return;
    setOperationError("");
    setBulkDeleteOpen(true);
  }
  async function handleBulkDelete() {
    if (operationLock.current || !selectedVisible.length) return;
    operationLock.current = true;
    setBulkDeleting(true);
    setOperationError("");
    setOperationMessage("");
    const ids = [...selectedVisible];
    try {
      const auth = await supabase.auth.getUser();
      if (auth.error) throw auth.error;
      if (!auth.data.user)
        throw new Error("Please sign in again before deleting drafts.");
      const result = await supabase
        .from("campaigns")
        .delete()
        .eq("creator_id", auth.data.user.id)
        .eq("status", "draft")
        .in("id", ids)
        .select("id");
      if (result.error) throw result.error;
      const deletedIds = (result.data || []).map((row) => row.id);
      setCampaigns((current) =>
        current.filter((row) => !deletedIds.includes(row.id)),
      );
      setSelectedDrafts((current) =>
        current.filter((id) => !deletedIds.includes(id)),
      );
      setBulkDeleteOpen(false);
      if (deletedIds.length !== ids.length)
        setOperationError(
          `${deletedIds.length} drafts deleted. Some selected drafts could not be deleted; they may have been published or changed. Refresh before trying again.`,
        );
      else
        setOperationMessage(
          `${deletedIds.length} ${deletedIds.length === 1 ? "draft" : "drafts"} deleted.`,
        );
    } catch (error) {
      setOperationError(
        error.message || "The drafts could not be deleted. Please try again.",
      );
    } finally {
      operationLock.current = false;
      setBulkDeleting(false);
    }
  }
  async function handleDuplicate(campaign) {
    if (operationLock.current || campaign.status !== "draft") return;
    operationLock.current = true;
    setOperationBusy(true);
    setOperationError("");
    setOperationMessage("");
    let newId = null;
    try {
      const auth = await supabase.auth.getUser();
      if (auth.error) throw auth.error;
      const user = auth.data.user;
      if (!user)
        throw new Error("Please sign in again before duplicating a draft.");
      const sourceResult = await supabase
        .from("campaigns")
        .select("*")
        .eq("id", campaign.id)
        .eq("creator_id", user.id)
        .eq("status", "draft")
        .maybeSingle();
      if (sourceResult.error) throw sourceResult.error;
      if (!sourceResult.data)
        throw new Error("This draft is no longer available to duplicate.");
      const source = sourceResult.data;
      let blocks = source.story_blocks || [];
      if (typeof blocks === "string") {
        try {
          blocks = JSON.parse(blocks);
        } catch {
          throw new Error(
            "This draft's story could not be read. Open it in the editor before duplicating.",
          );
        }
      }
      // Use the app's existing save function. Publishing, hosting and banking stay in the existing create flow.
      const saved = await saveCampaign({
        userId: user.id,
        status: "draft",
        blocks: Array.isArray(blocks) ? blocks : [],
        formData: {
          title: `${source.title || "Untitled campaign"} (copy)`,
          categoryId: source.category_id,
          goal: String(source.goal_amount || 0),
          currency: source.currency || "NGN",
          country: source.country || "Nigeria",
          shortDescription:
            source.short_description || source.description || "",
          isPublic: source.is_public !== false,
          cover_image: getCover(source),
          duration: "",
        },
      });
      if (!saved.success || !saved.campaignId)
        throw new Error(saved.error || "This draft could not be duplicated.");
      newId = saved.campaignId;
      const created = await supabase
        .from("campaigns")
        .select("*")
        .eq("id", newId)
        .eq("creator_id", user.id)
        .single();
      if (created.error) throw created.error;
      const activityResult = await supabase
        .from("activity_feed")
        .insert({
          user_id: user.id,
          campaign_id: newId,
          activity_type: "campaign_draft_created",
          title: "Draft created",
          description: `You duplicated ${source.title || "a campaign"}.`,
          metadata: {
            campaign_title: created.data.title,
          },
          is_notification: false,
          is_read: true,
          read_at: new Date().toISOString(),
        })
        .select("id, campaign_id, activity_type, title, created_at")
        .maybeSingle();
      if (activityResult.error)
        console.error("Duplicate draft activity:", activityResult.error);
      setCampaigns((current) => [
        {
          ...created.data,
          metrics: null,
          updates_count: 0,
          latest_activity: activityResult.data || null,
        },
        ...current,
      ]);
      setActiveFilter("draft");
      setSearchQuery("");
      setSelectedDrafts([]);
      setDraftSort("recent");
      setOperationMessage(`Created ${created.data.title}.`);
    } catch (error) {
      setOperationError(
        newId
          ? "The duplicate was saved, but the list could not refresh. Reload this page before trying again."
          : error.message || "This draft could not be duplicated.",
      );
    } finally {
      operationLock.current = false;
      setOperationBusy(false);
    }
  }

  /* =========================================================
     COUNTS AND FILTERS
  ========================================================= */

  const activeCount = useMemo(
    () =>
      campaigns.filter((campaign) => getCampaignState(campaign) === "active")
        .length,
    [campaigns, listClock],
  );
  const draftCount = useMemo(
    () =>
      campaigns.filter((campaign) => getCampaignState(campaign) === "draft")
        .length,
    [campaigns, listClock],
  );
  const inactiveCount = useMemo(
    () =>
      campaigns.filter((campaign) => getCampaignState(campaign) === "inactive")
        .length,
    [campaigns, listClock],
  );
  const filteredCampaigns = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    return campaigns.filter((campaign) => {
      const matchesFilter =
        activeFilter === "all" || getCampaignState(campaign) === activeFilter;
      const matchesSearch =
        !normalizedSearch ||
        (campaign.title || "").toLowerCase().includes(normalizedSearch);
      return matchesFilter && matchesSearch;
    });
  }, [campaigns, activeFilter, searchQuery]);

  /* =========================================================
     SHARE CAMPAIGN
  ========================================================= */

  async function handleShare(campaign) {
    if (!campaign?.id) return;
    const publicUrl = `${window.location.origin}/campaign/${campaign.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: campaign.title,
          text: `Support ${campaign.title} on Fundu`,
          url: publicUrl,
        });
        return;
      } catch (error) {
        if (error?.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(publicUrl);
      alert("Campaign link copied.");
    } catch {
      window.prompt("Copy this campaign link:", publicUrl);
    }
  }

  /* =========================================================
     END CAMPAIGN
  ========================================================= */

  async function handleEndCampaign(campaign) {
    if (
      !campaign?.id ||
      endingCampaignRef.current ||
      getCampaignState(campaign) !== "active"
    ) {
      return;
    }
    const confirmed = window.confirm(
      `End "${campaign.title || "this campaign"}" early? ` +
        "Its public page will stop showing bank details for contributions.",
    );
    if (!confirmed) return;
    endingCampaignRef.current = true;
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError) throw authError;
      if (!user) {
        throw new Error("You need to sign in to end this campaign.");
      }
      if (campaign.creator_id !== user.id) {
        throw new Error("You do not have permission to end this campaign.");
      }
      const endedAt = new Date().toISOString();
      const { data: endedCampaign, error } = await supabase
        .from("campaigns")
        .update({
          status: "ended",
          end_date: endedAt,
          updated_at: endedAt,
        })
        .eq("id", campaign.id)
        .eq("creator_id", user.id)
        .eq("status", "active")
        .select("id, status, end_date, updated_at")
        .maybeSingle();
      if (error) throw error;
      if (!endedCampaign) {
        throw new Error(
          "The campaign could not be ended. Refresh the page and try again.",
        );
      }
      setCampaigns((currentCampaigns) =>
        currentCampaigns.map((item) =>
          item.id === campaign.id
            ? {
                ...item,
                ...endedCampaign,
              }
            : item,
        ),
      );
      const { error: activityError } = await supabase
        .from("activity_feed")
        .insert({
          user_id: user.id,
          campaign_id: campaign.id,
          activity_type: "campaign_ended_early",
          title: "Campaign ended early",
          description: `${campaign.title || "Your campaign"} was ended early`,
          metadata: {
            campaign_title: campaign.title,
            ended_at: endedAt,
          },
          is_notification: false,
          is_read: true,
          read_at: endedAt,
        });
      if (activityError) {
        console.error("Campaign end activity error:", activityError);
      }
    } catch (error) {
      console.error("End campaign error:", error);
      alert(error?.message || "Unable to end this campaign.");
    } finally {
      endingCampaignRef.current = false;
    }
  }

  /* =========================================================
     OPEN AND CLOSE UPDATE FORM
  ========================================================= */

  function handlePostUpdate(campaign) {
    if (!campaign || getCampaignState(campaign) === "draft") return;
    cleanupUpdatePreviews();
    setCampaignToUpdate(campaign);
    setUpdateTitle("");
    setUpdateContent("");
    setUpdateImages([]);
    setUpdateError("");
    if (updateFileInputRef.current) {
      updateFileInputRef.current.value = "";
    }
  }
  function handleClosePostUpdate() {
    if (postingUpdate) return;
    cleanupUpdatePreviews();
    setCampaignToUpdate(null);
    setUpdateTitle("");
    setUpdateContent("");
    setUpdateImages([]);
    setUpdateError("");
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

  /* =========================================================
     UPDATE PHOTOS
  ========================================================= */

  function handleUpdateImageSelect(event) {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    const availableSlots = Math.max(0, 4 - updateImages.length);
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
  function handleRemoveUpdateImage(imageId) {
    setUpdateImages((current) => {
      const imageToRemove = current.find((item) => item.id === imageId);
      if (imageToRemove?.previewUrl) {
        URL.revokeObjectURL(imageToRemove.previewUrl);
      }
      return current.filter((item) => item.id !== imageId);
    });
  }
  async function uploadUpdateImages(userId, campaignId) {
    if (!updateImages.length) return [];
    const uploadedUrls = [];
    for (const item of updateImages) {
      const file = item.file;
      if (!file) continue;
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
      const filePath =
        `campaign-updates/${userId}/${campaignId}/` +
        `${uniqueId}.${safeExtension}`;
      const { error: uploadError } = await supabase.storage
        .from("campaign-images")
        .upload(filePath, file, {
          cacheControl: "60",
          upsert: false,
          contentType: file.type || "image/jpeg",
        });
      if (uploadError) throw uploadError;
      const { data: publicUrlData } = supabase.storage
        .from("campaign-images")
        .getPublicUrl(filePath);
      if (!publicUrlData?.publicUrl) {
        throw new Error(
          "A photo was uploaded, but its public URL could not be created.",
        );
      }
      uploadedUrls.push(publicUrlData.publicUrl);
    }
    return uploadedUrls;
  }

  /* =========================================================
     PUBLISH UPDATE
  ========================================================= */

  async function handlePublishUpdate(event) {
    event.preventDefault();
    if (!campaignToUpdate?.id || postingUpdate) return;
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
      if (authError) throw authError;
      if (!user) {
        throw new Error("You need to sign in to post an update.");
      }
      if (campaignToUpdate.creator_id !== user.id) {
        throw new Error(
          "You do not have permission to post an update to this campaign.",
        );
      }
      if (getCampaignState(campaignToUpdate) === "draft") {
        throw new Error(
          "Publish this campaign before posting campaign updates.",
        );
      }
      const imageUrls = await uploadUpdateImages(user.id, campaignToUpdate.id);
      const isFinalUpdate = getCampaignState(campaignToUpdate) === "inactive";
      const { data: newUpdate, error: insertError } = await supabase
        .from("campaign_updates")
        .insert({
          campaign_id: campaignToUpdate.id,
          user_id: user.id,
          title: cleanTitle,
          content: cleanContent,
          image_urls: imageUrls,
          is_final_update: isFinalUpdate,
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
      if (insertError) throw insertError;
      const { error: activityError } = await supabase
        .from("activity_feed")
        .insert({
          user_id: user.id,
          campaign_id: campaignToUpdate.id,
          activity_type: isFinalUpdate
            ? "final_campaign_update_published"
            : "campaign_update_published",
          title: isFinalUpdate
            ? "Final campaign update published"
            : "Campaign update published",
          description: cleanTitle,
          metadata: {
            campaign_update_id: newUpdate.id,
            is_final_update: isFinalUpdate,
          },
        });
      if (activityError) {
        console.error("Campaign update activity error:", activityError);
      }
      setCampaigns((currentCampaigns) =>
        currentCampaigns.map((campaign) =>
          campaign.id === campaignToUpdate.id
            ? {
                ...campaign,
                updates_count: Number(campaign.updates_count || 0) + 1,
                updated_at: new Date().toISOString(),
              }
            : campaign,
        ),
      );
      cleanupUpdatePreviews();
      setUpdateImages([]);
      setUpdateTitle("");
      setUpdateContent("");
      setUpdateError("");
      setCampaignToUpdate(null);
      if (updateFileInputRef.current) {
        updateFileInputRef.current.value = "";
      }
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
     DELETE CAMPAIGN
     Draft, live and ended campaigns use the same confirmation.
  ========================================================= */

  function handleDelete(campaign) {
    if (operationLock.current) return;
    if (!campaign?.id) return;
    setOperationError("");
    setCampaignToDelete(campaign);
  }
  function handleCloseDelete() {
    if (deletingCampaign) return;
    setCampaignToDelete(null);
  }
  async function handleConfirmDelete() {
    if (!campaignToDelete?.id || deletingCampaign) return;
    setDeletingCampaign(true);
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError) throw authError;
      if (!user) {
        throw new Error("You need to sign in to delete this campaign.");
      }
      if (campaignToDelete.creator_id !== user.id) {
        throw new Error("You do not have permission to delete this campaign.");
      }
      const { data: deletedCampaign, error: deleteError } = await supabase
        .from("campaigns")
        .delete()
        .eq("id", campaignToDelete.id)
        .eq("creator_id", user.id)
        .select("id")
        .maybeSingle();
      if (deleteError) throw deleteError;
      if (!deletedCampaign) {
        throw new Error(
          "The campaign could not be deleted. It may already have been removed or you may not have permission.",
        );
      }
      setCampaigns((currentCampaigns) =>
        currentCampaigns.filter(
          (campaign) => campaign.id !== campaignToDelete.id,
        ),
      );
      setCampaignToDelete(null);
      setOperationMessage("Campaign deleted");
    } catch (error) {
      console.error("Delete campaign error:", error);
      setOperationError("That didn't work. Nothing has changed yet. Try again.");
    } finally {
      setDeletingCampaign(false);
    }
  }

  /* =========================================================
     EMPTY STATES
  ========================================================= */

  function getEmptyState() {
    if (campaigns.length === 0) {
      return {
        title: "You haven’t created a campaign yet",
        description:
          "Create your first campaign and start sharing your story with supporters.",
        showButton: true,
      };
    }
    if (searchQuery.trim()) {
      return {
        title: "No campaigns found",
        description: "Try searching with a different campaign name.",
        showButton: false,
      };
    }
    if (activeFilter === "active") {
      return {
        title: "No active campaigns",
        description: "When you publish a campaign, it will appear here.",
        showButton: false,
      };
    }
    if (activeFilter === "draft") {
      return {
        title: "No draft campaigns",
        description: "Campaigns you save before publishing will appear here.",
        showButton: false,
      };
    }
    if (activeFilter === "inactive") {
      return {
        title: "No inactive campaigns",
        description:
          "Campaigns that have ended or reached their end date will appear here.",
        showButton: false,
      };
    }
    return {
      title: "No campaigns found",
      description: "Your campaigns will appear here.",
      showButton: false,
    };
  }
  const emptyState = getEmptyState();
  const selectedCampaignIsInactive = campaignToUpdate
    ? getCampaignState(campaignToUpdate) === "inactive"
    : false;

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <>
      <div className="campaigns-page">
        <header className="campaigns-page__header">
          <div className="campaigns-page__heading">
            <h1>My campaigns</h1>
            <p>
              <span className="mc-desktop">
                Manage, track and update all your fundraisers in one place.
              </span>
              <span className="mc-mobile">
                All your fundraisers in one place.
              </span>
            </p>
          </div>
          <Link href="/create-campaign" className="mc-button mc-button--teal">
            <span aria-hidden="true">＋</span>
            <span className="mc-desktop">Create campaign</span>
            <span className="mc-mobile">New</span>
          </Link>
        </header>
        <div className="mc-toolbar">
          <div className="mc-tabs" aria-label="Filter your campaigns">
            {[
              ["all", "All", campaigns.length],
              [
                "active",
                "Active",
                campaigns.filter((row) => getCampaignState(row) === "active")
                  .length,
              ],
              ["draft", "Draft", draftCount],
              [
                "inactive",
                "Inactive",
                campaigns.filter((row) => getCampaignState(row) === "inactive")
                  .length,
              ],
            ].map(([value, label, count]) => (
              <button
                type="button"
                key={value}
                aria-pressed={activeFilter === value}
                onClick={() => setActiveFilter(value)}
              >
                {label} <span>{loading ? "…" : count}</span>
              </button>
            ))}
          </div>
          <label className="mc-search">
            <MCIcon name="search" />
            <span className="mc-sr">
              {activeFilter === "draft"
                ? "Search drafts"
                : "Search your campaigns"}
            </span>
            <input
              type="search"
              placeholder={
                activeFilter === "draft"
                  ? "Search drafts"
                  : "Search your campaigns"
              }
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </label>
          {activeFilter === "draft" && (
            <DraftSort value={draftSort} onChange={setDraftSort} mobile />
          )}
        </div>
        {operationMessage && (
          <p className="mc-feedback" role="status">
            {operationMessage}
          </p>
        )}
        {operationError && !bulkDeleteOpen && (
          <p className="mc-error" role="alert">
            {operationError}
          </p>
        )}
        {operationBusy && <p role="status">Duplicating draft…</p>}
        {loading ? (
          <LoadingScreen variant="cards" label="Loading your campaigns" compact />
        ) : pageError ? (
          <div className="mc-empty">
            <h2>Unable to load campaigns</h2>
            <p>{pageError}</p>
            <button
              type="button"
              className="mc-button"
              onClick={() => window.location.reload()}
            >
              Try again
            </button>
          </div>
        ) : !collectionRows.length ? (
          <div className="mc-empty">
            <MCIcon name="edit" />
            <h2>
              {searchQuery.trim()
                ? "No campaigns found"
                : activeFilter === "draft"
                  ? "No drafts"
                  : activeFilter === "active"
                    ? "No active campaigns"
                    : activeFilter === "inactive"
                      ? "No ended campaigns"
                      : "No campaigns yet"}
            </h2>
            <p>
              {searchQuery.trim()
                ? "Try another search term."
                : activeFilter === "draft"
                  ? "Campaigns you start but haven't published yet will wait here, so you can come back and finish them."
                  : activeFilter === "inactive"
                    ? "Your ended campaigns will appear here."
                    : "Create a campaign to give your goal a place of its own."}
            </p>
            {searchQuery.trim() ? (
              <button
                type="button"
                className="mc-button"
                onClick={() => setSearchQuery("")}
              >
                Clear search
              </button>
            ) : (
              <Link
                href="/create-campaign"
                className="mc-button mc-button--teal"
              >
                ＋ Create campaign
              </Link>
            )}
          </div>
        ) : (
          <>
            {liveRows.length > 0 && (
              <section className="mc-group" aria-labelledby="mc-live-title">
                <header className="mc-group-heading">
                  <h2 id="mc-live-title">
                    Live <span>{liveRows.length}</span>
                  </h2>
                  <p>Accepting support now</p>
                </header>
                <div className="mc-grid">
                  {liveRows.map((campaign) => (
                    <CampaignCard
                      key={campaign.id}
                      campaign={campaign}
                      appearance="collection"
                      onPostUpdate={handlePostUpdate}
                      onShare={handleShare}
                      onDelete={handleDelete}
                      onEnd={handleEndCampaign}
                    />
                  ))}
                </div>
              </section>
            )}
            {draftRows.length > 0 && (
              <section className="mc-group" aria-labelledby="mc-drafts-title">
                {activeFilter === "draft" ? (
                  <div className="mc-reminder">
                    <MCIcon name="eye" />
                    <div>
                      <strong>Only you can see drafts</strong>
                      <p>
                        Publish a draft to get its shareable link.
                        {missingCoverCount > 0 &&
                          ` ${missingCoverCount} of your drafts still ${missingCoverCount === 1 ? "needs" : "need"} a cover image.`}
                      </p>
                    </div>
                  </div>
                ) : (
                  <header className="mc-group-heading">
                    <h2 id="mc-drafts-title">
                      Drafts <span>{draftRows.length}</span>
                    </h2>
                    <p>Only you can see these</p>
                  </header>
                )}
                {activeFilter === "draft" && (
                  <h2 id="mc-drafts-title" className="mc-sr">
                    Your drafts
                  </h2>
                )}
                <div
                  className={`mc-row-list ${activeFilter === "all" ? "mc-row-list--preview" : ""}`}
                >
                  {activeFilter === "draft" && (
                    <div className="mc-list-header">
                      <label>
                        <input
                          type="checkbox"
                          ref={selectAllRef}
                          checked={allDraftsSelected}
                          onChange={toggleAllDrafts}
                          disabled={bulkDeleting || operationBusy}
                          aria-label="Select all drafts in this search"
                        />
                        <span>
                          {draftRows.length}{" "}
                          {draftRows.length === 1 ? "draft" : "drafts"}
                        </span>
                      </label>
                      <div>
                        <DraftSort value={draftSort} onChange={setDraftSort} />
                        <button
                          type="button"
                          className="mc-button"
                          onClick={openBulkDelete}
                          disabled={
                            !selectedVisible.length ||
                            bulkDeleting ||
                            operationBusy
                          }
                        >
                          {selectedVisible.length
                            ? `Delete ${selectedVisible.length} ${selectedVisible.length === 1 ? "draft" : "drafts"}`
                            : "Delete selected"}
                        </button>
                      </div>
                    </div>
                  )}
                  {draftRows.map((campaign) => (
                    <CampaignCard
                      key={campaign.id}
                      campaign={campaign}
                      variant="row"
                      appearance="collection"
                      selectable={activeFilter === "draft"}
                      selected={selectedDrafts.includes(campaign.id)}
                      onSelect={toggleDraft}
                      onDelete={handleDelete}
                      onDuplicate={handleDuplicate}
                    />
                  ))}
                </div>
                {activeFilter === "all" && draftRows.length > 4 && (
                  <button
                    type="button"
                    className="mc-see-drafts"
                    onClick={() => {
                      setActiveFilter("draft");
                      setDraftSort("recent");
                    }}
                  >
                    See all {draftRows.length} drafts
                  </button>
                )}
              </section>
            )}
            {endedRows.length > 0 && (
              <section className="mc-group" aria-labelledby="mc-ended-title">
                <header className="mc-group-heading">
                  <h2 id="mc-ended-title">
                    Ended <span>{endedRows.length}</span>
                  </h2>
                </header>
                <div className="mc-row-list">
                  {endedRows.map((campaign) => (
                    <CampaignCard
                      key={campaign.id}
                      campaign={campaign}
                      variant="row"
                      appearance="collection"
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      <ActionDialog open={bulkDeleteOpen} onClose={() => setBulkDeleteOpen(false)} busy={bulkDeleting} error={bulkDeleteOpen ? operationError : ""} title={`Delete ${selectedVisible.length} ${selectedVisible.length === 1 ? "draft" : "drafts"}?`} description={`Only the ${selectedVisible.length} ${selectedVisible.length === 1 ? "draft" : "drafts"} you selected will be deleted. Your other drafts and campaigns aren't affected.`} icon="trash" tone="danger" safeLabel="Cancel" actionLabel={`Delete ${selectedVisible.length} ${selectedVisible.length === 1 ? "draft" : "drafts"}`} busyLabel="Deleting…" onAction={handleBulkDelete}>
        <ul className="action-dialog-list">{draftRows.filter(row => selectedVisible.includes(row.id)).map(row => <li key={row.id}>{row.title || "Untitled campaign"}</li>)}</ul>
      </ActionDialog>
      {/* POST UPDATE MODAL */}

      {campaignToUpdate && (
        <div
          className="campaign-update-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !postingUpdate) {
              handleClosePostUpdate();
            }
          }}
        >
          <div
            className="campaign-update-modal"
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            aria-labelledby="campaign-card-post-update-title"
          >
            <div className="campaign-update-modal__header">
              <div>
                <h2 id="campaign-card-post-update-title">
                  {selectedCampaignIsInactive
                    ? "Post Final Update"
                    : "Post an Update"}
                </h2>

                <p>
                  Share progress, milestones, photos, and important news with
                  your supporters.
                </p>
              </div>

              <button
                type="button"
                className="campaign-update-modal__close"
                onClick={handleClosePostUpdate}
                disabled={postingUpdate}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <form
              className="campaign-update-modal__form"
              onSubmit={handlePublishUpdate}
            >
              <div className="campaign-update-modal__campaign">
                <span>Posting to</span>
                <strong>{campaignToUpdate.title || "Untitled Campaign"}</strong>
              </div>

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

                  <span>{updateImages.length}/4</span>
                </div>

                <input
                  ref={updateFileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleUpdateImageSelect}
                />

                {updateImages.length < 4 && (
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

                {updateImages.length > 0 && (
                  <div className="campaign-update-preview-grid">
                    {updateImages.map((image, index) => (
                      <div className="campaign-update-preview" key={image.id}>
                        <img
                          src={image.previewUrl}
                          alt={`Update preview ${index + 1}`}
                        />

                        <button
                          type="button"
                          onClick={() => handleRemoveUpdateImage(image.id)}
                          disabled={postingUpdate}
                          aria-label={`Remove photo ${index + 1}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {selectedCampaignIsInactive && (
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
                  onClick={handleClosePostUpdate}
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
                    ? "Publishing..."
                    : selectedCampaignIsInactive
                      ? "Post Final Update"
                      : "Post Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ActionDialog open={Boolean(campaignToDelete)} onClose={handleCloseDelete} busy={deletingCampaign} error={campaignToDelete ? operationError : ""} title="Delete this campaign?" description="Deleting removes the campaign and makes its link unavailable." icon="trash" tone="danger" safeLabel="Cancel" actionLabel="Delete campaign" busyLabel="Deleting…" onAction={handleConfirmDelete}>
        {campaignToDelete && <div className="action-dialog-campaign">{getCover(campaignToDelete) && <CampaignStorageImage src={getCover(campaignToDelete)} alt="" />}<div><small>Campaign</small><strong>{campaignToDelete.title || "Untitled campaign"}</strong></div></div>}
      </ActionDialog>    </>
  );
}
function getCover(campaign) {
  return (
    campaign.cover_image || campaign.image_url || campaign.preview_image || ""
  );
}
function DraftSort({ value, onChange, mobile = false }) {
  return (
    <label
      className={`mc-sort ${mobile ? "mc-sort--mobile" : "mc-sort--desktop"}`}
    >
      <MCIcon name="sort" />
      <span className="mc-sr">Sort drafts</span>
      <select
        aria-label="Sort drafts"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="recent">Recently edited</option>
        <option value="oldest">Oldest first</option>
        <option value="attention">Needs attention</option>
      </select>
    </label>
  );
}
function MCIcon({ name }) {
  const paths = {
    search: (
      <>
        <circle cx="10" cy="10" r="7" />
        <path d="m15 15 6 6" />
      </>
    ),
    sort: <path d="M8 3v18m-4-4 4 4 4-4M16 21V3m-4 4 4-4 4 4" />,
    eye: (
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    edit: <path d="m15 5 4 4M4 20l4-1L20 7a2.8 2.8 0 0 0-4-4L4 15l-1 5Z" />,
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
