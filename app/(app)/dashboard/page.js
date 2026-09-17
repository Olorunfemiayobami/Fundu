"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import CampaignCard from "@/components/campaigns/CampaignCard";
import "@/styles/dashboard.css";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [bankAccount, setBankAccount] = useState(null);
  const [activity, setActivity] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [commentCounts, setCommentCounts] = useState({});
  const [updateCounts, setUpdateCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);

    try {
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        throw authError;
      }

      if (!authUser) {
        setLoading(false);
        return;
      }

      /* =========================
         USER PROFILE
      ========================= */

      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("id, full_name, display_name, avatar_url, email")
        .eq("id", authUser.id)
        .maybeSingle();

      if (profileError) {
        console.error("Profile error:", profileError);
      }

      setUser(
        profile || {
          id: authUser.id,
          full_name:
            authUser.user_metadata?.full_name ||
            authUser.email?.split("@")[0] ||
            "there",
          display_name: null,
          avatar_url: null,
          email: authUser.email,
        },
      );

      /* =========================
         CAMPAIGNS
      ========================= */

      const { data: campaignRows, error: campaignsError } = await supabase
        .from("campaigns")
        .select(
          `
          id,
          creator_id,
          title,
          goal_amount,
          amount_raised,
          currency,
          cover_image,
          preview_image,
          image_url,
          status,
          is_public,
          start_date,
          end_date,
          created_at,
          updated_at
        `,
        )
        .eq("creator_id", authUser.id)
        .order("updated_at", { ascending: false });

      if (campaignsError) {
        throw campaignsError;
      }

      const safeCampaigns = campaignRows || [];

      setCampaigns(safeCampaigns);

      /* =========================
         BANK ACCOUNT
      ========================= */

      const { data: bankRows, error: bankError } = await supabase
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
          updated_at
        `,
        )
        .eq("user_id", authUser.id)
        .eq("is_active", true)
        .order("updated_at", { ascending: false })
        .limit(1);

      if (bankError) {
        console.error("Bank account error:", bankError);
      }

      setBankAccount(bankRows?.[0] || null);

      /* =========================
         ACTIVITY
      ========================= */

      const { data: activityRows, error: activityError } = await supabase
        .from("activity_feed")
        .select(
          `
          id,
          activity_type,
          title,
          description,
          campaign_id,
          metadata,
          created_at
        `,
        )
        .eq("user_id", authUser.id)
        .order("created_at", { ascending: false })
        .limit(3);

      if (activityError) {
        console.error("Activity error:", activityError);
      }

      setActivity(activityRows || []);

      /* =========================
         METRICS + COMMENTS + UPDATES
      ========================= */

      if (safeCampaigns.length > 0) {
        const campaignIds = safeCampaigns.map((campaign) => campaign.id);

        const [metricResult, commentResult, updateResult] = await Promise.all([
          supabase
            .from("campaign_metrics")
            .select(
              `
              campaign_id,
              views_count,
              donation_clicks,
              last_updated
            `,
            )
            .in("campaign_id", campaignIds),

          supabase
            .from("comments")
            .select("campaign_id")
            .in("campaign_id", campaignIds),

          supabase
            .from("campaign_updates")
            .select("campaign_id")
            .in("campaign_id", campaignIds),
        ]);

        if (metricResult.error) {
          console.error("Metrics error:", metricResult.error);
        }

        if (commentResult.error) {
          console.error("Comments error:", commentResult.error);
        }

        if (updateResult.error) {
          console.error("Campaign updates error:", updateResult.error);
        }

        const metricMap = {};

        for (const row of metricResult.data || []) {
          metricMap[row.campaign_id] = row;
        }

        setMetrics(metricMap);

        const nextCommentCounts = {};

        for (const row of commentResult.data || []) {
          nextCommentCounts[row.campaign_id] =
            (nextCommentCounts[row.campaign_id] || 0) + 1;
        }

        setCommentCounts(nextCommentCounts);

        const nextUpdateCounts = {};

        for (const row of updateResult.data || []) {
          nextUpdateCounts[row.campaign_id] =
            (nextUpdateCounts[row.campaign_id] || 0) + 1;
        }

        setUpdateCounts(nextUpdateCounts);
      } else {
        setMetrics({});
        setCommentCounts({});
        setUpdateCounts({});
      }
    } catch (error) {
      console.error("Dashboard load error:", error);
    } finally {
      setLoading(false);
    }
  }

  const firstName = useMemo(() => {
    const name =
      user?.display_name ||
      user?.full_name ||
      user?.email?.split("@")[0] ||
      "there";

    return name.trim().split(" ")[0];
  }, [user]);

  const totalRaised = useMemo(() => {
    return campaigns.reduce(
      (sum, campaign) => sum + Number(campaign.amount_raised || 0),
      0,
    );
  }, [campaigns]);

  const totalGoal = useMemo(() => {
    return campaigns.reduce(
      (sum, campaign) => sum + Number(campaign.goal_amount || 0),
      0,
    );
  }, [campaigns]);

  const activeCampaignCount = useMemo(() => {
    return campaigns.filter((campaign) => isCampaignActive(campaign)).length;
  }, [campaigns]);

  if (loading) {
    return (
      <div className="creator-dashboard creator-dashboard--loading">
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (campaigns.length === 0) {
    return <EmptyDashboard firstName={firstName} bankAccount={bankAccount} />;
  }

  return (
    <CreatorDashboard
      firstName={firstName}
      campaigns={campaigns}
      setCampaigns={setCampaigns}
      bankAccount={bankAccount}
      activity={activity}
      setActivity={setActivity}
      metrics={metrics}
      commentCounts={commentCounts}
      updateCounts={updateCounts}
      setUpdateCounts={setUpdateCounts}
      totalRaised={totalRaised}
      totalGoal={totalGoal}
      activeCampaignCount={activeCampaignCount}
      reloadDashboard={loadDashboard}
    />
  );
}

/* =========================================================
   GREETING
========================================================= */

function DashboardGreeting({ firstName }) {
  return (
    <section className="dashboard-header">
      <div className="dashboard-header__copy">
        <h1>Good afternoon, {firstName} 👋</h1>

        <p>Here&apos;s an overview of your Fundu account.</p>
      </div>

      <Link
        href="/create-campaign"
        className="dashboard-primary-btn dashboard-header__button"
      >
        <span className="dashboard-button-plus">+</span>
        Create Campaign
      </Link>
    </section>
  );
}

/* =========================================================
   BANK NOTICE
========================================================= */

function BankDetailsNotice() {
  return (
    <section className="dashboard-bank-notice">
      <div className="dashboard-bank-notice__icon">
        <Image
          src="/images/dashboard/alert-circle.svg"
          alt=""
          width={16}
          height={16}
        />
      </div>

      <div className="dashboard-bank-notice__content">
        <div className="dashboard-bank-notice__copy">
          <strong>Add your bank details</strong>

          <span>
            Add a bank account so supporters can send funds directly to you.
          </span>
        </div>

        <Link href="/settings" className="dashboard-bank-notice__link">
          Add bank details →
        </Link>
      </div>
    </section>
  );
}

/* =========================================================
   EMPTY DASHBOARD
========================================================= */

function EmptyDashboard({ firstName, bankAccount }) {
  return (
    <div className="creator-dashboard">
      <DashboardGreeting firstName={firstName} />

      {!bankAccount && <BankDetailsNotice />}

      <section className="dashboard-fundraising">
        <div className="dashboard-fundraising__header">
          <h2>Your Fundraising</h2>
          <span>No campaign activity yet</span>
        </div>

        <div className="dashboard-stats">
          <StatCard label="Total raised" value="₦0" muted />
          <StatCard label="Total goal" value="₦0" muted />
          <StatCard label="Active Campaigns" value="0" muted />
          <StatCard label="Total Campaigns" value="0" muted />
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-header dashboard-section-header--simple">
          <h2>Your Campaigns</h2>
        </div>

        <div className="dashboard-empty-campaign">
          <div className="dashboard-empty-campaign__copy">
            <span>Have something you need help with?</span>

            <h3>Tell your story. Get support.</h3>

            <p>Create a campaign and share it with people who care.</p>
          </div>

          <Link
            href="/create-campaign"
            className="dashboard-primary-btn dashboard-empty-campaign__button"
          >
            <span className="dashboard-button-plus">+</span>
            Create a campaign
          </Link>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-header dashboard-section-header--simple">
          <h2>Recent Activity</h2>
        </div>

        <div className="dashboard-empty-activity">
          <strong>No recent activity</strong>

          <p>
            Your activity will appear here as you create campaigns, post
            updates, edit campaigns, and update amounts raised.
          </p>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-header dashboard-section-header--simple">
          <h2>Your Bank Account</h2>
        </div>

        {bankAccount ? (
          <BankAccountCard bankAccount={bankAccount} />
        ) : (
          <EmptyBankAccount />
        )}
      </section>
    </div>
  );
}

/* =========================================================
   POPULATED DASHBOARD
========================================================= */

function CreatorDashboard({
  firstName,
  campaigns,
  setCampaigns,
  bankAccount,
  activity,
  setActivity,
  metrics,
  commentCounts,
  updateCounts,
  setUpdateCounts,
  totalRaised,
  totalGoal,
  activeCampaignCount,
  reloadDashboard,
}) {
  const [campaignFilter, setCampaignFilter] = useState("all");

  /* =========================================================
     POST UPDATE
  ========================================================= */

  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showPostUpdateModal, setShowPostUpdateModal] = useState(false);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContent, setUpdateContent] = useState("");
  const [updateImages, setUpdateImages] = useState([]);
  const [postingUpdate, setPostingUpdate] = useState(false);
  const [updateError, setUpdateError] = useState("");

  const updateFileInputRef = useRef(null);

  const activeCampaigns = campaigns.filter((campaign) =>
    isCampaignActive(campaign),
  );

  const draftCampaigns = campaigns.filter(
    (campaign) => campaign.status?.toLowerCase() === "draft",
  );

  const inactiveCampaigns = campaigns.filter((campaign) =>
    isCampaignInactive(campaign),
  );

  const filteredCampaigns =
    campaignFilter === "active"
      ? activeCampaigns
      : campaignFilter === "draft"
        ? draftCampaigns
        : campaignFilter === "inactive"
          ? inactiveCampaigns
          : campaigns;

  const visibleCampaigns = filteredCampaigns.slice(0, 3);

  const campaignCards = visibleCampaigns.map((campaign) => ({
    ...campaign,
    metrics: metrics[campaign.id] || null,
    comments_count: commentCounts[campaign.id] || 0,
    updates_count: updateCounts[campaign.id] || 0,
  }));

  /* =========================================================
     SHARE
  ========================================================= */

  async function handleShare(campaign) {
    if (!campaign?.id) {
      return;
    }

    const url = `${window.location.origin}/campaign/${campaign.id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: campaign.title,
          text: `Support ${campaign.title} on Fundu`,
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
     DELETE DRAFT
  ========================================================= */

  async function handleDelete(campaign) {
    if (!campaign?.id) {
      return;
    }

    const confirmed = window.confirm(
      `Delete "${campaign.title || "this campaign"}"? This action cannot be undone.`,
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
        throw new Error("You need to sign in to delete this campaign.");
      }

      if (campaign.creator_id !== user.id) {
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
        throw new Error("The campaign could not be deleted.");
      }

      setCampaigns((current) =>
        current.filter((item) => item.id !== campaign.id),
      );
    } catch (error) {
      console.error("Dashboard delete campaign error:", error);

      alert(error?.message || "Unable to delete this campaign.");
    }
  }

  /* =========================================================
     OPEN UPDATE MODAL
  ========================================================= */

  function handlePostUpdate(campaign) {
    if (!campaign || campaign.status?.toLowerCase() === "draft") {
      return;
    }

    cleanupUpdatePreviews();

    setSelectedCampaign(campaign);
    setUpdateTitle("");
    setUpdateContent("");
    setUpdateImages([]);
    setUpdateError("");
    setShowPostUpdateModal(true);

    if (updateFileInputRef.current) {
      updateFileInputRef.current.value = "";
    }
  }

  /*
   * The general dashboard buttons do not identify a campaign,
   * so open the modal for the most recently updated active
   * campaign. If there is no active campaign, use the most
   * recently updated inactive campaign.
   */

  function handleGeneralPostUpdate() {
    const campaign =
      campaigns.find((item) => isCampaignActive(item)) ||
      campaigns.find((item) => isCampaignInactive(item));

    if (!campaign) {
      alert("You do not currently have a published campaign to update.");
      return;
    }

    handlePostUpdate(campaign);
  }

  function closePostUpdateModal() {
    if (postingUpdate) {
      return;
    }

    cleanupUpdatePreviews();

    setUpdateImages([]);
    setUpdateTitle("");
    setUpdateContent("");
    setUpdateError("");
    setSelectedCampaign(null);
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

  /* =========================================================
     UPDATE IMAGES
  ========================================================= */

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

  function removeUpdateImage(imageId) {
    setUpdateImages((current) => {
      const imageToRemove = current.find((item) => item.id === imageId);

      if (imageToRemove?.previewUrl) {
        URL.revokeObjectURL(imageToRemove.previewUrl);
      }

      return current.filter((item) => item.id !== imageId);
    });
  }

  async function uploadCampaignUpdateImages(userId) {
    if (!updateImages.length || !selectedCampaign?.id) {
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

      const filePath = `campaign-updates/${userId}/${selectedCampaign.id}/${uniqueId}.${safeExtension}`;

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

  /* =========================================================
     SAVE UPDATE
  ========================================================= */

  async function handlePostCampaignUpdate(event) {
    event.preventDefault();

    if (!selectedCampaign?.id || postingUpdate) {
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

      if (user.id !== selectedCampaign.creator_id) {
        throw new Error(
          "You do not have permission to post an update to this campaign.",
        );
      }

      const finalUpdate = isCampaignInactive(selectedCampaign);

      const imageUrls = await uploadCampaignUpdateImages(user.id);

      const { data: newUpdate, error: insertError } = await supabase
        .from("campaign_updates")
        .insert({
          campaign_id: selectedCampaign.id,
          user_id: user.id,
          title: cleanTitle,
          content: cleanContent,
          image_urls: imageUrls,
          is_final_update: finalUpdate,
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

      const { error: activityError } = await supabase
        .from("activity_feed")
        .insert({
          user_id: user.id,
          campaign_id: selectedCampaign.id,
          activity_type: finalUpdate
            ? "final_campaign_update_published"
            : "campaign_update_published",
          title: finalUpdate
            ? "Final campaign update published"
            : "Campaign update published",
          description: cleanTitle,
          metadata: {
            campaign_update_id: newUpdate.id,
            is_final_update: finalUpdate,
          },
        });

      if (activityError) {
        console.error("Campaign update activity error:", activityError);
      }

      /*
       * Update campaign.updated_at too so the CampaignCard's
       * "Last updated" value remains correct after a reload.
       */

      const now = new Date().toISOString();

      const { error: campaignUpdateError } = await supabase
        .from("campaigns")
        .update({
          updated_at: now,
        })
        .eq("id", selectedCampaign.id)
        .eq("creator_id", user.id);

      if (campaignUpdateError) {
        console.error("Campaign updated_at error:", campaignUpdateError);
      }

      setUpdateCounts((current) => ({
        ...current,
        [selectedCampaign.id]: (current[selectedCampaign.id] || 0) + 1,
      }));

      setCampaigns((current) =>
        current.map((campaign) =>
          campaign.id === selectedCampaign.id
            ? {
                ...campaign,
                updated_at: now,
              }
            : campaign,
        ),
      );

      setActivity((current) =>
        [
          {
            id: newUpdate.id,
            activity_type: finalUpdate
              ? "final_campaign_update_published"
              : "campaign_update_published",
            title: finalUpdate
              ? "Final campaign update published"
              : "Campaign update published",
            description: cleanTitle,
            campaign_id: selectedCampaign.id,
            metadata: {
              campaign_update_id: newUpdate.id,
              is_final_update: finalUpdate,
            },
            created_at: now,
          },
          ...current,
        ].slice(0, 3),
      );

      cleanupUpdatePreviews();

      setUpdateImages([]);
      setUpdateTitle("");
      setUpdateContent("");
      setUpdateError("");
      setSelectedCampaign(null);
      setShowPostUpdateModal(false);

      if (updateFileInputRef.current) {
        updateFileInputRef.current.value = "";
      }

      await reloadDashboard();
    } catch (error) {
      console.error("Dashboard post update error:", error);

      setUpdateError(
        error?.message || "We couldn't publish this update. Please try again.",
      );
    } finally {
      setPostingUpdate(false);
    }
  }

  const selectedCampaignIsInactive =
    selectedCampaign && isCampaignInactive(selectedCampaign);

  return (
    <>
      <div className="creator-dashboard">
        <DashboardGreeting firstName={firstName} />

        {!bankAccount && <BankDetailsNotice />}

        {/* FUNDRAISING */}

        <section className="dashboard-fundraising">
          <div className="dashboard-fundraising__header">
            <h2>Your Fundraising</h2>
          </div>

          <div className="dashboard-stats">
            <StatCard label="Total raised" value={formatMoney(totalRaised)} />

            <StatCard label="Total goal" value={formatMoney(totalGoal)} />

            <StatCard
              label="Active Campaigns"
              value={String(activeCampaignCount)}
            />

            <StatCard
              label="Total Campaigns"
              value={String(campaigns.length)}
            />
          </div>

          <div className="dashboard-update-banner">
            <div className="dashboard-update-banner__header">
              <div className="dashboard-update-banner__icon">
                <Image
                  src="/images/dashboard/edit.svg"
                  alt=""
                  width={18}
                  height={18}
                />
              </div>

              <strong>Post updates to engage supporters!</strong>
            </div>

            <div className="dashboard-update-banner__copy">
              <p>
                Supporters send funds directly to your account. Share photos,
                receipts, milestones, and thank-you notes to show them their
                impact.
              </p>
            </div>

            <button
              type="button"
              className="dashboard-orange-btn dashboard-update-banner__button"
              onClick={handleGeneralPostUpdate}
            >
              Post Update
            </button>
          </div>
        </section>

        {/* CAMPAIGNS */}

        <section className="dashboard-section">
          <div className="dashboard-section-header">
            <div className="dashboard-section-header__title-group">
              <h2>Your Campaigns</h2>

              <CampaignStatusTabs
                campaigns={campaigns}
                selectedFilter={campaignFilter}
                onFilterChange={setCampaignFilter}
              />
            </div>

            <Link href="/campaigns">View all →</Link>
          </div>

          {campaignCards.length > 0 ? (
            <div className="dashboard-campaign-grid">
              {campaignCards.map((campaign) => (
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
            <div className="dashboard-empty-activity">
              <strong>
                {campaignFilter === "all"
                  ? "No campaigns"
                  : `No ${campaignFilter} campaigns`}
              </strong>

              <p>
                You don&apos;t currently have any campaigns in this category.
              </p>
            </div>
          )}
        </section>

        {/* ACTIVITY */}

        <section className="dashboard-section">
          <div className="dashboard-section-header">
            <h2>Recent Activity</h2>

            <Link href="/activity">View all →</Link>
          </div>

          {activity.length > 0 ? (
            <div className="dashboard-activity-list">
              {activity.map((item) => (
                <div className="dashboard-activity-row" key={item.id}>
                  <p>{item.description || item.title}</p>

                  <span>{formatRelativeDate(item.created_at)}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="dashboard-empty-activity">
              <strong>No recent activity</strong>

              <p>
                Your campaign activity will appear here as you create, edit and
                update campaigns.
              </p>
            </div>
          )}
        </section>

        {/* BANK */}

        <section className="dashboard-section">
          <div className="dashboard-section-header dashboard-section-header--simple">
            <h2>Your Bank Account</h2>
          </div>

          {bankAccount ? (
            <BankAccountCard bankAccount={bankAccount} />
          ) : (
            <EmptyBankAccount />
          )}
        </section>

        {/* CTA */}

        <section className="dashboard-bottom-cta">
          <div className="dashboard-bottom-cta__copy">
            <h2>Keep your supporters updated</h2>

            <p>Share progress, milestones, or how funds are being used.</p>
          </div>

          <button
            type="button"
            className="dashboard-orange-btn dashboard-bottom-cta__button"
            onClick={handleGeneralPostUpdate}
          >
            Post an Update
          </button>
        </section>
      </div>

      {/* =====================================================
          POST UPDATE MODAL
      ====================================================== */}

      {showPostUpdateModal && selectedCampaign && (
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
            aria-labelledby="dashboard-post-update-title"
          >
            <div className="campaign-update-modal__header">
              <div>
                <h2 id="dashboard-post-update-title">
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
                onClick={closePostUpdateModal}
                disabled={postingUpdate}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="campaign-update-modal__campaign">
              <span>Campaign</span>
              <strong>{selectedCampaign.title}</strong>
            </div>

            <form
              className="campaign-update-modal__form"
              onSubmit={handlePostCampaignUpdate}
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
                          onClick={() => removeUpdateImage(image.id)}
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
    </>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({ label, value, muted = false }) {
  return (
    <div
      className={`dashboard-stat-card ${
        muted ? "dashboard-stat-card--muted" : ""
      }`}
    >
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

/* =========================================================
   CAMPAIGN FILTER TABS
========================================================= */

function CampaignStatusTabs({ campaigns, selectedFilter, onFilterChange }) {
  const activeCount = campaigns.filter((campaign) =>
    isCampaignActive(campaign),
  ).length;

  const draftCount = campaigns.filter(
    (campaign) => campaign.status?.toLowerCase() === "draft",
  ).length;

  const inactiveCount = campaigns.filter((campaign) =>
    isCampaignInactive(campaign),
  ).length;

  const items = [
    {
      key: "all",
      label: "All",
      count: campaigns.length,
    },
    {
      key: "active",
      label: "Active",
      count: activeCount,
    },
    {
      key: "draft",
      label: "Draft",
      count: draftCount,
    },
    {
      key: "inactive",
      label: "Inactive",
      count: inactiveCount,
    },
  ];

  return (
    <div
      className="dashboard-campaign-tabs"
      role="tablist"
      aria-label="Filter campaigns"
    >
      {items.map((item) => {
        const isSelected = selectedFilter === item.key;

        return (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={isSelected}
            className={`dashboard-campaign-tab ${isSelected ? "active" : ""}`}
            onClick={() => onFilterChange(item.key)}
          >
            <span>{item.label}</span>

            <span className="dashboard-campaign-tab__count">{item.count}</span>
          </button>
        );
      })}
    </div>
  );
}

/* =========================================================
   BANK ACCOUNT
========================================================= */

function BankAccountCard({ bankAccount }) {
  return (
    <div className="dashboard-bank-card">
      <div className="dashboard-bank-card__top">
        <div className="dashboard-bank-card__icon">
          <Image
            src="/images/dashboard/bank-card.svg"
            alt=""
            width={24}
            height={24}
          />
        </div>

        <div className="dashboard-bank-card__info">
          <strong>{bankAccount.bank_name}</strong>

          <span>{bankAccount.account_holder_name}</span>

          <span>{maskAccountNumber(bankAccount.account_number)}</span>
        </div>
      </div>

      <div className="dashboard-bank-card__divider" />

      <div className="dashboard-bank-card__footer">
        <p>Supporters send contributions directly to this account.</p>

        <Link href="/settings">Manage →</Link>
      </div>
    </div>
  );
}

function EmptyBankAccount() {
  return (
    <div className="dashboard-empty-bank">
      <div className="dashboard-empty-bank__details">
        <div className="dashboard-empty-bank__icon">
          <Image
            src="/images/dashboard/bank-card.svg"
            alt=""
            width={24}
            height={24}
          />
        </div>

        <div className="dashboard-empty-bank__copy">
          <strong>No bank account linked</strong>

          <p>
            Add your bank account so supporters can send contributions directly
            to you.
          </p>
        </div>
      </div>

      <Link
        href="/settings"
        className="dashboard-primary-btn dashboard-empty-bank__button"
      >
        Add Bank Details
      </Link>
    </div>
  );
}

/* =========================================================
   CAMPAIGN STATUS HELPERS
========================================================= */

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

function isCampaignInactive(campaign) {
  if (!campaign) {
    return false;
  }

  const status = campaign.status?.toLowerCase();

  return (
    status === "ended" ||
    status === "inactive" ||
    status === "completed" ||
    (status === "active" && campaignHasExpired(campaign))
  );
}

function isCampaignActive(campaign) {
  if (!campaign) {
    return false;
  }

  return (
    campaign.status?.toLowerCase() === "active" && !isCampaignInactive(campaign)
  );
}

/* =========================================================
   GENERAL HELPERS
========================================================= */

function formatMoney(value) {
  const number = Number(value || 0);

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(number);
}

function formatRelativeDate(date) {
  if (!date) {
    return "Not yet";
  }

  const target = new Date(date);
  const now = new Date();

  const seconds = Math.floor((now.getTime() - target.getTime()) / 1000);

  if (seconds < 60) {
    return "Just now";
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  const days = Math.floor(hours / 24);

  if (days === 1) {
    return "Yesterday";
  }

  if (days < 7) {
    return `${days} days ago`;
  }

  return target.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function maskAccountNumber(accountNumber) {
  if (!accountNumber) {
    return "";
  }

  const value = String(accountNumber);

  if (value.length <= 4) {
    return value;
  }

  return `••••••${value.slice(-4)}`;
}
