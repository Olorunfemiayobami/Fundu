"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import CampaignCard from "@/components/campaigns/CampaignCard";
import "@/styles/campaigns-page.css";
import "@/styles/campaign-detail.css";

export default function CampaignsPage() {
  const router = useRouter();

  const [campaigns, setCampaigns] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  /*
    ========================================
    DELETE CAMPAIGN STATE
    ========================================
  */

  const [campaignToDelete, setCampaignToDelete] = useState(null);
  const [deletingCampaign, setDeletingCampaign] = useState(false);

  /*
    ========================================
    POST UPDATE STATE
    ========================================
  */

  const [campaignToUpdate, setCampaignToUpdate] = useState(null);

  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContent, setUpdateContent] = useState("");
  const [updateImages, setUpdateImages] = useState([]);

  const [postingUpdate, setPostingUpdate] = useState(false);
  const [updateError, setUpdateError] = useState("");

  const updateFileInputRef = useRef(null);

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

        if (authError) {
          throw authError;
        }

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

        if (error) {
          throw error;
        }

        if (!mounted) return;

        const campaignIds = (data || []).map((campaign) => campaign.id);

        let metricsByCampaign = {};
        let updatesCountByCampaign = {};

        /*
          ========================================
          CAMPAIGN METRICS
          ========================================
        */

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

          /*
            ========================================
            CAMPAIGN UPDATE COUNTS
            ========================================
          */

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

        const campaignsWithMetrics = (data || []).map((campaign) => ({
          ...campaign,

          metrics: metricsByCampaign[campaign.id] || null,

          updates_count: updatesCountByCampaign[campaign.id] || 0,
        }));

        setCampaigns(campaignsWithMetrics);
      } catch (error) {
        console.error("Campaigns page error:", error);

        if (mounted) {
          setPageError("We couldn't load your campaigns. Please try again.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadCampaigns();

    return () => {
      mounted = false;
    };
  }, [router]);

  /*
    ========================================
    CAMPAIGN STATUS HELPERS
    ========================================
  */

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

  function getCampaignState(campaign) {
    const status = campaign?.status?.toLowerCase() || "draft";

    if (status === "draft") {
      return "draft";
    }

    if (status === "inactive" || status === "ended" || status === "completed") {
      return "inactive";
    }

    if (status === "active" && campaignHasExpired(campaign)) {
      return "inactive";
    }

    if (status === "active") {
      return "active";
    }

    return status;
  }

  /*
    ========================================
    CAMPAIGN COUNTS
    ========================================
  */

  const activeCount = useMemo(
    () =>
      campaigns.filter((campaign) => getCampaignState(campaign) === "active")
        .length,
    [campaigns],
  );

  const draftCount = useMemo(
    () =>
      campaigns.filter((campaign) => getCampaignState(campaign) === "draft")
        .length,
    [campaigns],
  );

  const inactiveCount = useMemo(
    () =>
      campaigns.filter((campaign) => getCampaignState(campaign) === "inactive")
        .length,
    [campaigns],
  );

  /*
    ========================================
    FILTER CAMPAIGNS
    ========================================
  */

  const filteredCampaigns = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return campaigns.filter((campaign) => {
      const campaignState = getCampaignState(campaign);

      const matchesFilter =
        activeFilter === "all" || campaignState === activeFilter;

      const matchesSearch =
        !normalizedSearch ||
        campaign.title?.toLowerCase().includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [campaigns, activeFilter, searchQuery]);

  /*
    ========================================
    SHARE CAMPAIGN
    ========================================
  */

  async function handleShare(campaign) {
    const publicUrl = `${window.location.origin}/campaign/${campaign.id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: campaign.title,
          text: `Support ${campaign.title} on Fundu`,
          url: publicUrl,
        });

        return;
      }

      await navigator.clipboard.writeText(publicUrl);

      alert("Campaign link copied.");
    } catch (error) {
      if (error?.name !== "AbortError") {
        console.error("Share campaign error:", error);
      }
    }
  }

  /*
    ========================================
    OPEN POST UPDATE
    ========================================
  */

  function handlePostUpdate(campaign) {
    if (!campaign) {
      return;
    }

    if (getCampaignState(campaign) === "draft") {
      return;
    }

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

  /*
    ========================================
    CLOSE POST UPDATE
    ========================================
  */

  function handleClosePostUpdate() {
    if (postingUpdate) {
      return;
    }

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

  /*
    ========================================
    CLEAN IMAGE PREVIEWS
    ========================================
  */

  function cleanupUpdatePreviews() {
    updateImages.forEach((item) => {
      if (item?.previewUrl) {
        URL.revokeObjectURL(item.previewUrl);
      }
    });
  }

  /*
    ========================================
    SELECT UPDATE PHOTOS
    ========================================
  */

  function handleUpdateImageSelect(event) {
    const files = Array.from(event.target.files || []);

    if (!files.length) {
      return;
    }

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

  /*
    ========================================
    REMOVE UPDATE PHOTO
    ========================================
  */

  function handleRemoveUpdateImage(imageId) {
    setUpdateImages((current) => {
      const imageToRemove = current.find((item) => item.id === imageId);

      if (imageToRemove?.previewUrl) {
        URL.revokeObjectURL(imageToRemove.previewUrl);
      }

      return current.filter((item) => item.id !== imageId);
    });
  }

  /*
    ========================================
    UPLOAD UPDATE PHOTOS
    ========================================
  */

  async function uploadUpdateImages(userId, campaignId) {
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

      const filePath = `campaign-updates/${userId}/${campaignId}/${uniqueId}.${safeExtension}`;

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
          "A photo was uploaded, but its public URL could not be created.",
        );
      }

      uploadedUrls.push(publicUrlData.publicUrl);
    }

    return uploadedUrls;
  }

  /*
    ========================================
    PUBLISH UPDATE
    ========================================
  */

  async function handlePublishUpdate(event) {
    event.preventDefault();

    if (!campaignToUpdate?.id || postingUpdate) {
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
      /*
       * Current user
       */

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

      /*
       * Confirm campaign ownership
       */

      if (campaignToUpdate.creator_id !== user.id) {
        throw new Error(
          "You do not have permission to post an update to this campaign.",
        );
      }

      /*
       * Draft campaigns cannot receive updates
       */

      if (getCampaignState(campaignToUpdate) === "draft") {
        throw new Error(
          "Publish this campaign before posting campaign updates.",
        );
      }

      /*
       * Upload selected photos
       */

      const imageUrls = await uploadUpdateImages(user.id, campaignToUpdate.id);

      const isFinalUpdate = getCampaignState(campaignToUpdate) === "inactive";

      /*
       * Save campaign update
       */

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

      if (insertError) {
        throw insertError;
      }

      /*
       * Add Campaign Activity record
       */

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

      /*
       * Update the card immediately.
       *
       * This increments the update count and
       * changes "Last updated" to Today.
       */

      setCampaigns((currentCampaigns) =>
        currentCampaigns.map((campaign) => {
          if (campaign.id !== campaignToUpdate.id) {
            return campaign;
          }

          return {
            ...campaign,

            updates_count: Number(campaign.updates_count || 0) + 1,

            updated_at: new Date().toISOString(),
          };
        }),
      );

      /*
       * Close and reset modal
       */

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

  /*
    ========================================
    OPEN DELETE CONFIRMATION
    ========================================
  */

  function handleDelete(campaign) {
    if (!campaign) {
      return;
    }

    if (campaign.status?.toLowerCase() !== "draft") {
      alert("Only draft campaigns can be deleted from this screen.");

      return;
    }

    setCampaignToDelete(campaign);
  }

  /*
    ========================================
    CLOSE DELETE CONFIRMATION
    ========================================
  */

  function handleCloseDelete() {
    if (deletingCampaign) {
      return;
    }

    setCampaignToDelete(null);
  }

  /*
    ========================================
    CONFIRM DELETE
    ========================================
  */

  async function handleConfirmDelete() {
    if (!campaignToDelete?.id || deletingCampaign) {
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

      if (campaignToDelete.creator_id !== user.id) {
        throw new Error("You do not have permission to delete this campaign.");
      }

      if (campaignToDelete.status?.toLowerCase() !== "draft") {
        throw new Error("Only draft campaigns can be deleted here.");
      }

      const { data: deletedCampaign, error: deleteError } = await supabase
        .from("campaigns")
        .delete()
        .eq("id", campaignToDelete.id)
        .eq("creator_id", user.id)
        .eq("status", "draft")
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

      setCampaigns((currentCampaigns) =>
        currentCampaigns.filter(
          (campaign) => campaign.id !== campaignToDelete.id,
        ),
      );

      setCampaignToDelete(null);
    } catch (error) {
      console.error("Delete campaign error:", error);

      alert(
        error?.message || "Unable to delete this campaign. Please try again.",
      );
    } finally {
      setDeletingCampaign(false);
    }
  }

  /*
    ========================================
    EMPTY STATES
    ========================================
  */

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

  return (
    <>
      <div className="campaigns-page">
        {/* ========================================
            HEADER
        ======================================== */}

        <header className="campaigns-page__header">
          <div className="campaigns-page__heading">
            <h1>My Campaigns</h1>

            <p>
              Manage, track, and update all your fundraising campaigns in one
              place.
            </p>
          </div>

          <Link
            href="/create-campaign"
            className="campaigns-page__create-button"
          >
            Create Campaign
          </Link>
        </header>

        {/* ========================================
            FILTERS
        ======================================== */}

        <div className="campaigns-page__filters">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`campaigns-page__filter ${
              activeFilter === "all" ? "campaigns-page__filter--active" : ""
            }`}
          >
            All
            <span>{campaigns.length}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter("active")}
            className={`campaigns-page__filter ${
              activeFilter === "active" ? "campaigns-page__filter--active" : ""
            }`}
          >
            Active
            <span>{activeCount}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter("draft")}
            className={`campaigns-page__filter ${
              activeFilter === "draft" ? "campaigns-page__filter--active" : ""
            }`}
          >
            Draft
            <span>{draftCount}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter("inactive")}
            className={`campaigns-page__filter ${
              activeFilter === "inactive"
                ? "campaigns-page__filter--active"
                : ""
            }`}
          >
            Inactive
            <span>{inactiveCount}</span>
          </button>
        </div>

        {/* ========================================
            SEARCH
        ======================================== */}

        <div className="campaigns-page__tools">
          <div className="campaigns-page__search">
            <span className="campaigns-page__search-icon" aria-hidden="true" />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search campaigns"
              aria-label="Search campaigns"
            />
          </div>

          <p className="campaigns-page__count">
            {filteredCampaigns.length}{" "}
            {filteredCampaigns.length === 1 ? "campaign" : "campaigns"}
          </p>
        </div>

        {/* ========================================
            CAMPAIGNS
        ======================================== */}

        {loading ? (
          <div className="campaigns-page__loading">
            <div className="campaigns-page__spinner" />

            <p>Loading your campaigns...</p>
          </div>
        ) : pageError ? (
          <div className="campaigns-page__empty">
            <h2>Unable to load campaigns</h2>

            <p>{pageError}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="campaigns-page__empty-button"
            >
              Try Again
            </button>
          </div>
        ) : filteredCampaigns.length > 0 ? (
          <div className="campaigns-page__grid">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                variant="creator"
                onShare={handleShare}
                onPostUpdate={handlePostUpdate}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="campaigns-page__empty">
            <h2>{emptyState.title}</h2>

            <p>{emptyState.description}</p>

            {emptyState.showButton && (
              <Link
                href="/create-campaign"
                className="campaigns-page__empty-button"
              >
                Create Campaign
              </Link>
            )}
          </div>
        )}
      </div>

      {/* ========================================
          POST UPDATE MODAL
      ======================================== */}

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

              {/* PHOTOS */}

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

              {/* FINAL UPDATE MESSAGE */}

              {selectedCampaignIsInactive && (
                <div className="campaign-update-final-note">
                  <strong>Final campaign update</strong>

                  <p>
                    This campaign has ended. This post will be marked as your
                    final update to supporters.
                  </p>
                </div>
              )}

              {/* ERROR */}

              {updateError && (
                <p className="campaign-update-modal__error">{updateError}</p>
              )}

              {/* ACTIONS */}

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

      {/* ========================================
          DELETE CAMPAIGN MODAL
      ======================================== */}

      {campaignToDelete && (
        <div
          className="campaigns-delete-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !deletingCampaign) {
              handleCloseDelete();
            }
          }}
        >
          <div
            className="campaigns-delete-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-campaign-title"
          >
            <div className="campaigns-delete-modal__header">
              <div>
                <h2 id="delete-campaign-title">Delete Campaign?</h2>

                <p>
                  This will permanently delete
                  <strong> {campaignToDelete.title || "this campaign"}</strong>.
                </p>
              </div>

              <button
                type="button"
                className="campaigns-delete-modal__close"
                onClick={handleCloseDelete}
                disabled={deletingCampaign}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="campaigns-delete-modal__warning">
              <strong>This action cannot be undone.</strong>

              <p>
                Your draft and its campaign data will be permanently removed
                from Fundu.
              </p>
            </div>

            <div className="campaigns-delete-modal__actions">
              <button
                type="button"
                className="campaigns-delete-modal__cancel"
                onClick={handleCloseDelete}
                disabled={deletingCampaign}
              >
                Cancel
              </button>

              <button
                type="button"
                className="campaigns-delete-modal__confirm"
                onClick={handleConfirmDelete}
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
