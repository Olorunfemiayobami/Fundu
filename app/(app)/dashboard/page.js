"use client";

import LoadingScreen from "@/components/feedback/LoadingScreen";
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

      if (authError) throw authError;
      if (!authUser) return;

      /* USER PROFILE */

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

      /* CAMPAIGNS */

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

      if (campaignsError) throw campaignsError;

      const safeCampaigns = campaignRows || [];
      setCampaigns(safeCampaigns);

      /* BANK ACCOUNT */

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

      /* ACTIVITY */

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

      /* METRICS, COMMENTS AND UPDATE COUNTS */

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

  const totalRaised = useMemo(
    () =>
      campaigns.reduce(
        (sum, campaign) => sum + Number(campaign.amount_raised || 0),
        0,
      ),
    [campaigns],
  );

  const totalGoal = useMemo(
    () =>
      campaigns.reduce(
        (sum, campaign) => sum + Number(campaign.goal_amount || 0),
        0,
      ),
    [campaigns],
  );

  const activeCampaignCount = useMemo(
    () => campaigns.filter((campaign) => isCampaignActive(campaign)).length,
    [campaigns],
  );

  if (loading) {
    return (
      <LoadingScreen variant="dashboard" label="Loading your dashboard" />
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
   EMPTY DASHBOARD — EXISTING LAYOUT
========================================================= */

function EmptyDashboard({ firstName, bankAccount }) {
  const [showSharingHelp, setShowSharingHelp] = useState(false);

  const steps = [
    {
      number: 1,
      title: "Add your bank account",
      description:
        "This is where supporters will send money. Fundu never holds your funds.",
      icon: "/icons/activity/activity-bank.svg",
      done: Boolean(bankAccount),
      action: bankAccount ? "Manage bank account" : "Add bank account",
      href: "/settings",
    },
    {
      number: 2,
      title: "Tell your story",
      description:
        "Say what happened, what you’re raising for and how the money will be used.",
      icon: "/icons/activity/activity-file.svg",
      action: "Start a campaign",
      href: "/create-campaign",
      primary: true,
    },
    {
      number: 3,
      title: "Share your link",
      description:
        "Post it on WhatsApp, X, Instagram or Facebook, then keep supporters updated.",
      icon: "/share.svg",
      action: "How sharing works",
    },
  ];

  return (
    <div className="creator-dashboard dashboard-empty-v2">
      {/* WELCOME */}

      <header className="dashboard-empty-v2__welcome">
        <h1>Welcome to Fundu, {firstName}</h1>
        <p>Let&apos;s get your first fundraiser ready to share.</p>
      </header>

      {/* INTRODUCTION */}

      <section
        className="dashboard-empty-v2__hero"
        aria-labelledby="empty-dashboard-hero-title"
      >
        <div className="dashboard-empty-v2__hero-copy">
          <h2 id="empty-dashboard-hero-title">
            Give every goal a place of its own
          </h2>

          <p>
            Put your story, photos, goal and bank details on one page. Share one
            link on WhatsApp, Instagram or anywhere else, and supporters send
            money straight to your account.
          </p>

          <div className="dashboard-empty-v2__hero-actions">
            <Link
              href="/create-campaign"
              className="dashboard-empty-v2__button dashboard-empty-v2__button--primary"
            >
              <span aria-hidden="true">+</span>
              Create your first campaign
            </Link>

            <Link href="/explore" className="dashboard-empty-v2__explore">
              See campaigns on Explore
            </Link>
          </div>
        </div>

        {/* Decorative example, not an actual campaign */}

        <div className="dashboard-empty-v2__sample" aria-hidden="true">
          <div className="dashboard-empty-v2__sample-image">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8" cy="8" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </div>

          <h3>Your campaign title</h3>

          <p className="dashboard-empty-v2__sample-amount">
            <strong>₦0</strong>
            <span>of your goal</span>
          </p>

          <div className="dashboard-empty-v2__sample-progress">
            <span />
          </div>

          <p className="dashboard-empty-v2__sample-link">Your campaign link</p>
        </div>
      </section>

      {/* THREE SETUP STEPS */}

      <section className="dashboard-empty-v2__section">
        <h2>Three steps to go live</h2>

        <div className="dashboard-empty-v2__steps">
          {steps.map((step) => (
            <div className="dashboard-empty-v2__step" key={step.number}>
              <div className="dashboard-empty-v2__step-top">
                <span
                  className="dashboard-empty-v2__icon"
                  style={{
                    "--empty-icon": `url("${step.icon}")`,
                  }}
                  aria-hidden="true"
                />

                <span className="dashboard-empty-v2__step-number">
                  Step {step.number} of 3
                  {step.done && (
                    <span className="dashboard-empty-v2__done">Done</span>
                  )}
                </span>
              </div>

              <div className="dashboard-empty-v2__step-copy">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>

              {step.href ? (
                <Link
                  href={step.href}
                  className={`dashboard-empty-v2__button ${
                    step.primary ? "dashboard-empty-v2__button--primary" : ""
                  }`}
                >
                  {step.action}
                </Link>
              ) : (
                <button
                  type="button"
                  className="dashboard-empty-v2__button"
                  aria-expanded={showSharingHelp}
                  aria-controls="empty-dashboard-sharing-help"
                  onClick={() => setShowSharingHelp((open) => !open)}
                >
                  {step.action}
                </button>
              )}

              {step.number === 3 && showSharingHelp && (
                <p
                  id="empty-dashboard-sharing-help"
                  className="dashboard-empty-v2__sharing-help"
                >
                  After publishing, copy your campaign link and share it in
                  messages or on social media. Supporters open the page to read
                  your story and find your bank details. Post updates to keep
                  them informed.
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ACTIVITY AND BANK ACCOUNT */}

      <div className="dashboard-lower-grid">
        <section className="dashboard-lower-section">
          <div className="dashboard-lower-heading">
            <h2>Recent activity</h2>
          </div>

          <div className="dashboard-recent-empty dashboard-empty-v2__activity">
            <span
              className="dashboard-empty-v2__icon"
              style={{
                "--empty-icon": 'url("/icons/activity/activity-bell.svg")',
              }}
              aria-hidden="true"
            />

            <p>Drafts, updates and campaign changes will show up here.</p>
          </div>
        </section>

        <section className="dashboard-lower-section">
          <div className="dashboard-lower-heading">
            <h2>Your bank account</h2>

            {bankAccount && <Link href="/settings">Manage</Link>}
          </div>

          {bankAccount ? (
            <BankAccountCard bankAccount={bankAccount} />
          ) : (
            <div className="dashboard-empty-v2__missing-bank">
              <span
                className="dashboard-empty-v2__icon dashboard-empty-v2__icon--orange"
                style={{
                  "--empty-icon": 'url("/icons/activity/activity-bank.svg")',
                }}
                aria-hidden="true"
              />

              <div className="dashboard-empty-v2__missing-bank-copy">
                <h3>No account added</h3>
                <p>Needed before you publish</p>
              </div>

              <Link
                href="/settings"
                className="dashboard-empty-v2__button dashboard-empty-v2__button--dark"
              >
                Add account
              </Link>
            </div>
          )}
        </section>
      </div>
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
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showPostUpdateModal, setShowPostUpdateModal] = useState(false);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContent, setUpdateContent] = useState("");
  const [updateImages, setUpdateImages] = useState([]);
  const [postingUpdate, setPostingUpdate] = useState(false);
  const [updateError, setUpdateError] = useState("");

  const updateFileInputRef = useRef(null);
  const endingCampaignRef = useRef(false);
  const deletingCampaignRef = useRef(false);

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

  /* SHARE */

  async function handleShare(campaign) {
    if (!campaign?.id) return;

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
        if (error?.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      alert("Campaign link copied.");
    } catch {
      window.prompt("Copy this campaign link:", url);
    }
  }

  /* DELETE CAMPAIGN */

  async function handleDelete(campaign) {
    if (!campaign?.id || deletingCampaignRef.current) return;

    const confirmed = window.confirm(
      `Delete "${campaign.title || "this campaign"}"? This action cannot be undone.`,
    );

    if (!confirmed) return;

    deletingCampaignRef.current = true;

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;

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

      if (deleteError) throw deleteError;

      if (!deletedCampaign) {
        throw new Error("The campaign could not be deleted.");
      }

      setCampaigns((current) =>
        current.filter((item) => item.id !== campaign.id),
      );
    } catch (error) {
      console.error("Dashboard delete campaign error:", error);
      alert(error?.message || "Unable to delete this campaign.");
    } finally {
      deletingCampaignRef.current = false;
    }
  }

  /* END CAMPAIGN */

  async function handleEndCampaign(campaign) {
    if (
      !campaign?.id ||
      endingCampaignRef.current ||
      !isCampaignActive(campaign)
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

      setCampaigns((current) =>
        current.map((item) =>
          item.id === campaign.id ? { ...item, ...endedCampaign } : item,
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
      } else {
        setActivity((current) =>
          [
            {
              id: `ended-${campaign.id}-${endedAt}`,
              activity_type: "campaign_ended_early",
              title: "Campaign ended early",
              description: `${campaign.title || "Your campaign"} was ended early`,
              campaign_id: campaign.id,
              metadata: {
                campaign_title: campaign.title,
                ended_at: endedAt,
              },
              created_at: endedAt,
            },
            ...current,
          ].slice(0, 3),
        );
      }
    } catch (error) {
      console.error("Dashboard end campaign error:", error);
      alert(error?.message || "Unable to end this campaign.");
    } finally {
      endingCampaignRef.current = false;
    }
  }

  /* OPEN AND CLOSE UPDATE MODAL */

  function handlePostUpdate(campaign) {
    if (!campaign || campaign.status?.toLowerCase() === "draft") return;

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
    if (postingUpdate) return;

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

  /* UPDATE PHOTOS */

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
    if (!updateImages.length || !selectedCampaign?.id) return [];

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
        `campaign-updates/${userId}/${selectedCampaign.id}/` +
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
          "An update photo was uploaded, but its public URL could not be created.",
        );
      }

      uploadedUrls.push(publicUrlData.publicUrl);
    }

    return uploadedUrls;
  }

  /* PUBLISH UPDATE */

  async function handlePostCampaignUpdate(event) {
    event.preventDefault();

    if (!selectedCampaign?.id || postingUpdate) return;

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

      if (user.id !== selectedCampaign.creator_id) {
        throw new Error(
          "You do not have permission to post an update to this campaign.",
        );
      }

      if (selectedCampaign.status?.toLowerCase() === "draft") {
        throw new Error(
          "Publish this campaign before posting campaign updates.",
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

      if (insertError) throw insertError;

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

      const now = new Date().toISOString();

      const { error: campaignUpdateError } = await supabase
        .from("campaigns")
        .update({ updated_at: now })
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
            ? { ...campaign, updated_at: now }
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

        {/* FUNDRAISING — STEP 2 */}

        <section
          className="dashboard-fundraising-v2"
          aria-labelledby="dashboard-fundraising-heading"
        >
          <h2 id="dashboard-fundraising-heading">Your fundraising</h2>

          <dl className="dashboard-fundraising-v2__stats">
            <div className="dashboard-fundraising-v2__stat dashboard-fundraising-v2__stat--raised">
              <dt>Total raised</dt>
              <dd>{formatMoney(totalRaised)}</dd>
              <p>As recorded by you</p>
            </div>

            <div className="dashboard-fundraising-v2__stat dashboard-fundraising-v2__stat--goal">
              <dt>Total goal</dt>
              <dd>{formatMoney(totalGoal)}</dd>
              <p>Across all campaigns</p>
            </div>

            <div className="dashboard-fundraising-v2__stat dashboard-fundraising-v2__stat--active">
              <dt>
                <span className="dashboard-fundraising-v2__desktop-label">
                  Active campaigns
                </span>
                <span className="dashboard-fundraising-v2__mobile-label">
                  Active
                </span>
              </dt>

              <dd>{activeCampaignCount}</dd>
              <p>Live and shareable</p>
            </div>

            <div className="dashboard-fundraising-v2__stat dashboard-fundraising-v2__stat--total">
              <dt>Total campaigns</dt>
              <dd>{campaigns.length}</dd>

              <p>
                {draftCampaigns.length}{" "}
                {draftCampaigns.length === 1 ? "draft" : "drafts"},{" "}
                {inactiveCampaigns.length} inactive
              </p>
            </div>
          </dl>

          {activeCampaigns.length > 0 && (
            <div className="dashboard-fundraising-v2__prompt">
              <div
                className="dashboard-fundraising-v2__prompt-icon"
                aria-hidden="true"
              >
                <Image
                  src="/images/dashboard/edit.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              </div>

              <div className="dashboard-fundraising-v2__prompt-copy">
                <strong>Post updates to engage supporters</strong>

                <p className="dashboard-fundraising-v2__desktop-copy">
                  Supporters send funds straight to your account. Share photos,
                  receipts, milestones and thank-you notes so they see their
                  impact.
                </p>

                <p className="dashboard-fundraising-v2__mobile-copy">
                  Photos, receipts and thank-you notes show your impact.
                </p>
              </div>

              <button
                type="button"
                className="dashboard-fundraising-v2__post-button"
                onClick={handleGeneralPostUpdate}
              >
                Post update
              </button>
            </div>
          )}
        </section>

        {/* CAMPAIGNS — SHARED CAMPAIGN CARD */}

        <section className="dashboard-section">
          <div className="dashboard-section-header">
            <div className="dashboard-section-header__title-group">
              <h2>Your campaigns</h2>

              <CampaignStatusTabs
                campaigns={campaigns}
                selectedFilter={campaignFilter}
                onFilterChange={setCampaignFilter}
              />
            </div>
            <Link href="/campaigns">View all campaigns</Link>{" "}
          </div>

          <div
            id="dashboard-campaign-panel"
            className="dashboard-campaign-panel"
            role="tabpanel"
            aria-labelledby={`dashboard-campaign-tab-${campaignFilter}`}
            tabIndex={0}
          >
            {campaignCards.length > 0 ? (
              <>
                <div className="dashboard-campaign-grid">
                  {campaignCards.map((campaign) => (
                    <CampaignCard
                      key={campaign.id}
                      campaign={campaign}
                      variant="creator"
                      onShare={handleShare}
                      onPostUpdate={handlePostUpdate}
                      onDelete={handleDelete}
                      onEnd={handleEndCampaign}
                    />
                  ))}
                </div>

                <Link href="/campaigns" className="dashboard-campaign-view-all">
                  View all {campaigns.length}{" "}
                  {campaigns.length === 1 ? "campaign" : "campaigns"}
                </Link>
              </>
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
          </div>
        </section>

        {/* RECENT ACTIVITY AND BANK ACCOUNT */}

        <div className="dashboard-lower-grid">
          <section className="dashboard-lower-section">
            <div className="dashboard-lower-heading">
              <h2>Recent activity</h2>
              <Link href="/activity">View all activity</Link>
            </div>

            {activity.length > 0 ? (
              <ul className="dashboard-recent-list">
                {activity.slice(0, 3).map((item) => {
                  const isEnding = [
                    "campaign_ended_early",
                    "campaign_ended",
                    "campaign_expired",
                  ].includes(item.activity_type);

                  return (
                    <li className="dashboard-recent-row" key={item.id}>
                      <span
                        className={`dashboard-recent-icon ${
                          isEnding ? "dashboard-recent-icon--ended" : ""
                        }`}
                        aria-hidden="true"
                      >
                        <img
                          src={getDashboardActivityIcon(item.activity_type)}
                          alt=""
                          width={18}
                          height={18}
                        />
                      </span>

                      <p className="dashboard-recent-sentence">
                        <ActivitySentence item={item} campaigns={campaigns} />
                      </p>

                      <time
                        className="dashboard-recent-time"
                        dateTime={item.created_at}
                      >
                        {formatRelativeDate(item.created_at)}
                      </time>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="dashboard-recent-empty">
                Drafts, updates and campaign changes will show up here.
              </div>
            )}
          </section>

          <section className="dashboard-lower-section">
            <div className="dashboard-lower-heading">
              <h2>Your bank account</h2>

              {bankAccount && <Link href="/settings">Manage</Link>}
            </div>

            {bankAccount ? (
              <BankAccountCard bankAccount={bankAccount} />
            ) : (
              <EmptyBankAccount />
            )}
          </section>
        </div>

        {/* BOTTOM UPDATE PROMPT */}

        {activeCampaigns.length > 0 && (
          <section className="dashboard-followup">
            <div>
              <h2>Keep your supporters updated</h2>
              <p>Share progress, milestones or how the funds are being used.</p>
            </div>

            <button
              type="button"
              className="dashboard-fundraising-v2__post-button"
              onClick={handleGeneralPostUpdate}
            >
              Post an update
            </button>
          </section>
        )}
      </div>

      {/* POST UPDATE MODAL */}

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
   STAT CARD FOR THE EXISTING EMPTY STATE
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
    { key: "all", label: "All", count: campaigns.length },
    { key: "active", label: "Active", count: activeCount },
    { key: "draft", label: "Draft", count: draftCount },
    { key: "inactive", label: "Inactive", count: inactiveCount },
  ];

  function handleTabKeyDown(event, index) {
    let nextIndex;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % items.length;
        break;

      case "ArrowLeft":
        nextIndex = (index - 1 + items.length) % items.length;
        break;

      case "Home":
        nextIndex = 0;
        break;

      case "End":
        nextIndex = items.length - 1;
        break;

      default:
        return;
    }

    event.preventDefault();

    const buttons =
      event.currentTarget.parentElement.querySelectorAll('[role="tab"]');

    buttons[nextIndex]?.focus();
    onFilterChange(items[nextIndex].key);
  }

  return (
    <div
      className="dashboard-campaign-tabs"
      role="tablist"
      aria-label="Filter campaigns"
      aria-orientation="horizontal"
    >
      {items.map((item, index) => {
        const isSelected = selectedFilter === item.key;

        return (
          <button
            key={item.key}
            id={`dashboard-campaign-tab-${item.key}`}
            type="button"
            role="tab"
            aria-selected={isSelected}
            aria-controls="dashboard-campaign-panel"
            aria-label={`${item.label}, ${item.count} ${
              item.count === 1 ? "campaign" : "campaigns"
            }`}
            tabIndex={isSelected ? 0 : -1}
            className={`dashboard-campaign-tab ${isSelected ? "active" : ""}`}
            onClick={() => onFilterChange(item.key)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
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
   BANK ACCOUNT — EXISTING LAYOUT
========================================================= */

function BankAccountCard({ bankAccount }) {
  const accountNumber = String(bankAccount.account_number || "");
  const maskedNumber = accountNumber
    ? `•••• ${accountNumber.slice(-4)}`
    : "Not available";

  return (
    <div className="dashboard-bank-v2">
      <div className="dashboard-bank-v2__top">
        <span className="dashboard-bank-v2__icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 9 9-6 9 6H3Z" />
            <path d="M5 10v8M10 10v8M14 10v8M19 10v8M3 21h18M4 18h16" />
          </svg>
        </span>

        <span
          className="dashboard-bank-v2__number"
          aria-label={`Account ending in ${accountNumber.slice(-4) || "unknown"}`}
        >
          {maskedNumber}
        </span>
      </div>

      <div className="dashboard-bank-v2__details">
        <h3>{bankAccount.bank_name}</h3>
        <p>{bankAccount.account_holder_name}</p>
      </div>

      <p className="dashboard-bank-v2__helper">
        Supporters send contributions directly to this account.
      </p>
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
  if (!campaign?.end_date) return false;

  const endDate = new Date(campaign.end_date);

  if (Number.isNaN(endDate.getTime())) return false;

  return endDate.getTime() <= Date.now();
}

function isCampaignInactive(campaign) {
  if (!campaign) return false;

  const status = campaign.status?.toLowerCase();

  return (
    status === "ended" ||
    status === "inactive" ||
    status === "completed" ||
    (status === "active" && campaignHasExpired(campaign))
  );
}

function isCampaignActive(campaign) {
  if (!campaign) return false;

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
  if (!date) return "Not yet";

  const target = new Date(date);
  if (Number.isNaN(target.getTime())) return "Not yet";

  const seconds = Math.max(
    0,
    Math.floor((Date.now() - target.getTime()) / 1000),
  );

  if (seconds < 60) return "Just now";

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  const days = Math.floor(hours / 24);

  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;

  return target.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function maskAccountNumber(accountNumber) {
  if (!accountNumber) return "";

  const value = String(accountNumber);

  if (value.length <= 4) return value;

  return `••••••${value.slice(-4)}`;
}
function getDashboardActivityIcon(type) {
  const icons = {
    campaign_draft_created: "activity-file.svg",
    campaign_published: "activity-rocket.svg",

    campaign_edited: "activity-edit.svg",
    campaign_story_updated: "activity-edit.svg",
    campaign_images_updated: "activity-edit.svg",
    campaign_end_date_changed: "activity-edit.svg",

    campaign_ending_soon: "activity-bell.svg",
    campaign_ended: "activity-bell.svg",
    campaign_ended_early: "activity-bell.svg",
    campaign_expired: "activity-bell.svg",

    amount_raised_updated: "activity-trending-up.svg",
    campaign_reached_25: "activity-trending-up.svg",
    campaign_reached_50: "activity-trending-up.svg",
    campaign_reached_75: "activity-trending-up.svg",
    campaign_reached_100: "activity-trending-up.svg",

    campaign_update_published: "activity-rocket.svg",
    final_campaign_update_published: "activity-rocket.svg",
    campaign_update_edited: "activity-edit.svg",
    campaign_update_deleted: "activity-file.svg",

    bank_account_added: "activity-bank.svg",
    bank_account_updated: "activity-bank.svg",

    comment_posted: "activity-comment.svg",
    comment_received: "activity-comment.svg",

    profile_updated: "activity-edit.svg",
  };

  return `/icons/activity/${icons[type] || "activity-file.svg"}`;
}

function ActivitySentence({ item, campaigns }) {
  const metadata = item.metadata || {};

  const campaign = campaigns.find((entry) => entry.id === item.campaign_id);

  const campaignName =
    metadata.campaign_title ||
    metadata.campaign_name ||
    campaign?.title ||
    "your campaign";

  const name = <strong>{campaignName}</strong>;

  /*
   * Older records store the update title in metadata.
   * Some newer records store only the title in description.
   */
  let updateTitle = metadata.update_title || "";

  if (!updateTitle && typeof item.description === "string") {
    const description = item.description.trim();

    const quotedTitle = description.match(
      /^["“](.+?)["”]\s+was published to\b/i,
    );

    if (quotedTitle) {
      updateTitle = quotedTitle[1];
    } else if (
      description &&
      !/\b(was published to|update was published|update published to)\b/i.test(
        description,
      )
    ) {
      updateTitle = description;
    }
  }

  switch (item.activity_type) {
    case "campaign_draft_created":
      return <>You created a draft for {name}</>;

    case "campaign_published":
      return <>You published {name}</>;

    case "campaign_edited":
      return <>You edited {name}</>;

    case "campaign_story_updated":
      return <>You updated the story for {name}</>;

    case "campaign_images_updated":
      return <>You updated the images for {name}</>;

    case "campaign_end_date_changed":
      return <>You changed the end date for {name}</>;

    case "campaign_ending_soon":
      return <>{name} is ending soon</>;

    case "campaign_ended_early":
      return <>{name} was ended early</>;

    case "campaign_ended":
    case "campaign_expired":
      return <>{name} has ended</>;

    case "amount_raised_updated": {
      const previousAmount =
        metadata.previous_amount ?? metadata.previous_amount_raised;

      const newAmount = metadata.new_amount ?? metadata.amount_raised;

      if (
        previousAmount !== undefined &&
        previousAmount !== null &&
        newAmount !== undefined &&
        newAmount !== null
      ) {
        return (
          <>
            You updated the recorded amount raised for {name} from{" "}
            {formatMoney(previousAmount)} to {formatMoney(newAmount)}
          </>
        );
      }

      return <>You updated the recorded amount raised for {name}</>;
    }

    case "campaign_reached_25":
    case "campaign_reached_50":
    case "campaign_reached_75":
    case "campaign_reached_100": {
      const percentage = item.activity_type.split("_").pop();

      return (
        <>
          {name} reached {percentage}% of its goal, based on your recorded
          amount
        </>
      );
    }

    case "campaign_update_published":
      return updateTitle ? (
        <>
          Update “{updateTitle}” posted to {name}
        </>
      ) : (
        <>You posted an update to {name}</>
      );

    case "final_campaign_update_published":
      return updateTitle ? (
        <>
          Final update “{updateTitle}” posted to {name}
        </>
      ) : (
        <>You posted a final update to {name}</>
      );

    case "campaign_update_edited":
      return <>You edited an update on {name}</>;

    case "campaign_update_deleted":
      return <>You deleted an update from {name}</>;

    case "bank_account_added":
      return item.campaign_id ? (
        <>You added a bank account for {name}</>
      ) : (
        <>You added a bank account</>
      );

    case "bank_account_updated":
      return item.campaign_id ? (
        <>You updated the bank account for {name}</>
      ) : (
        <>You updated your bank account</>
      );

    case "comment_posted":
      return <>You commented on {name}</>;

    case "comment_received":
      return <>{name} received a new comment</>;

    case "profile_updated":
      return <>You updated your profile information</>;

    default:
      return <>{item.description || item.title || "Campaign activity"}</>;
  }
}
