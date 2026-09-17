"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import "@/styles/activity.css";

const PAGE_SIZE = 10;

/* =========================================================
   ACTIVITY ICONS
========================================================= */

const ACTIVITY_ICONS = {
  file: "/icons/activity/activity-file.svg",
  rocket: "/icons/activity/activity-rocket.svg",
  edit: "/icons/activity/activity-edit.svg",
  trending: "/icons/activity/activity-trending-up.svg",
  bell: "/icons/activity/activity-bell.svg",
  bank: "/icons/activity/activity-bank.svg",
  comment: "/icons/activity/activity-comment.svg",
};

/* =========================================================
   ACTIVITY TYPES
========================================================= */

const ACTIVITY_CONFIG = {
  /* =========================
     CAMPAIGNS
  ========================= */

  campaign_draft_created: {
    title: "Campaign draft created",
    category: "campaigns",
    icon: "file",
  },

  campaign_published: {
    title: "Campaign published",
    category: "campaigns",
    icon: "rocket",
  },

  campaign_edited: {
    title: "Campaign edited",
    category: "campaigns",
    icon: "edit",
  },

  campaign_story_updated: {
    title: "Campaign story updated",
    category: "campaigns",
    icon: "edit",
  },

  campaign_images_updated: {
    title: "Campaign images updated",
    category: "campaigns",
    icon: "edit",
  },

  campaign_end_date_changed: {
    title: "Campaign end date changed",
    category: "campaigns",
    icon: "edit",
  },

  campaign_ending_soon: {
    title: "Campaign ending soon",
    category: "campaigns",
    icon: "bell",
  },

  campaign_ended: {
    title: "Campaign ended",
    category: "campaigns",
    icon: "bell",
  },

  campaign_ended_early: {
    title: "Campaign ended early",
    category: "campaigns",
    icon: "bell",
  },

  amount_raised_updated: {
    title: "Amount raised updated",
    category: "campaigns",
    icon: "trending",
  },

  campaign_reached_25: {
    title: "Campaign reached 25%",
    category: "campaigns",
    icon: "trending",
  },

  campaign_reached_50: {
    title: "Campaign reached 50%",
    category: "campaigns",
    icon: "trending",
  },

  campaign_reached_75: {
    title: "Campaign reached 75%",
    category: "campaigns",
    icon: "trending",
  },

  campaign_reached_100: {
    title: "Campaign reached 100%",
    category: "campaigns",
    icon: "trending",
  },

  /* =========================
     UPDATES
  ========================= */

  campaign_update_published: {
    title: "Update published",
    category: "updates",
    icon: "rocket",
  },

  final_campaign_update_published: {
    title: "Final update published",
    category: "updates",
    icon: "rocket",
  },

  campaign_update_edited: {
    title: "Update edited",
    category: "updates",
    icon: "edit",
  },

  campaign_update_deleted: {
    title: "Update deleted",
    category: "updates",
    icon: "file",
  },

  /* =========================
     BANK ACCOUNT
  ========================= */

  bank_account_added: {
    title: "Bank account added",
    category: "account",
    icon: "bank",
  },

  bank_account_updated: {
    title: "Bank account updated",
    category: "account",
    icon: "bank",
  },

  /* =========================
     COMMENTS
  ========================= */

  comment_posted: {
    title: "Comment posted",
    category: "comments",
    icon: "comment",
  },

  comment_received: {
    title: "New comment",
    category: "comments",
    icon: "comment",
  },

  /* =========================
     ACCOUNT FALLBACK
  ========================= */

  profile_updated: {
    title: "Profile updated",
    category: "account",
    icon: "edit",
  },
};

const FILTERS = [
  {
    key: "all",
    label: "All",
  },
  {
    key: "campaigns",
    label: "Campaigns",
  },
  {
    key: "updates",
    label: "Updates",
  },
  {
    key: "account",
    label: "Account",
  },
  {
    key: "comments",
    label: "Comments",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function ActivityPage() {
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadActivity();
  }, []);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedFilter, searchQuery]);

  /* =========================================================
     LOAD ACTIVITY
  ========================================================= */

  async function loadActivity() {
    setLoading(true);
    setError("");

    try {
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        throw authError;
      }

      if (!authUser) {
        setUser(null);
        setActivities([]);
        return;
      }

      setUser(authUser);

      const { data, error: activityError } = await supabase
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
          is_notification,
          is_read,
          read_at,
          created_at
        `,
        )
        .eq("user_id", authUser.id)
        .order("created_at", {
          ascending: false,
        });

      if (activityError) {
        throw activityError;
      }

      const rows = data || [];

      /*
       * Keep the original rows locally for this first render.
       *
       * This means notifications that were unread when the
       * user opened this page can still be visually highlighted
       * during this visit.
       *
       * Supabase is then updated to mark those notifications
       * as read and the SideNav badge is cleared.
       */

      setActivities(rows);

      const hasUnreadNotifications = rows.some(
        (item) => item.is_notification === true && item.is_read === false,
      );

      if (hasUnreadNotifications) {
        await markNotificationsRead();
      } else {
        /*
         * Even if there are no unread notifications, make sure
         * the SideNav is synchronized with the Activity page.
         */
        window.dispatchEvent(new CustomEvent("fundu:activity-read"));
      }
    } catch (loadError) {
      console.error("Activity page load error:", loadError);

      setError(
        loadError?.message ||
          "We couldn't load your activity. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  /* =========================================================
     MARK NOTIFICATIONS READ
  ========================================================= */

  async function markNotificationsRead() {
    try {
      const { error: readError } = await supabase.rpc(
        "mark_activity_notifications_read",
      );

      if (readError) {
        throw readError;
      }

      /*
       * Tell the SideNav that the unread notifications have
       * been viewed.
       */

      window.dispatchEvent(new CustomEvent("fundu:activity-read"));
    } catch (readError) {
      console.error("Mark activity notifications read error:", readError);
    }
  }

  /* =========================================================
     FILTER + SEARCH
  ========================================================= */

  const filteredActivities = useMemo(() => {
    const search = searchQuery.trim().toLowerCase();

    return activities.filter((activity) => {
      const config = getActivityConfig(activity);

      const matchesFilter =
        selectedFilter === "all" || config.category === selectedFilter;

      if (!matchesFilter) {
        return false;
      }

      if (!search) {
        return true;
      }

      const searchableText = [
        config.title,
        activity.title,
        activity.description,
        activity.activity_type,
        activity.metadata?.campaign_title,
        activity.metadata?.campaign_name,
        activity.metadata?.update_title,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(search);
    });
  }, [activities, selectedFilter, searchQuery]);

  const visibleActivities = useMemo(() => {
    return filteredActivities.slice(0, visibleCount);
  }, [filteredActivities, visibleCount]);

  const groupedActivities = useMemo(() => {
    return groupActivitiesByDate(visibleActivities);
  }, [visibleActivities]);

  const hasMore = visibleCount < filteredActivities.length;

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="activity-page activity-page--loading">
        <p>Loading your activity...</p>
      </main>
    );
  }

  /* =========================================================
     SIGNED OUT
  ========================================================= */

  if (!user) {
    return (
      <main className="activity-page">
        <div className="activity-empty">
          <strong>Sign in to view your activity</strong>

          <p>Your campaign and account activity will appear here.</p>
        </div>
      </main>
    );
  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main className="activity-page">
      {/* HEADER */}

      <header className="activity-header">
        <h1>All Activity</h1>

        <p>Complete history of your account and campaign activity</p>
      </header>

      {/* FILTERS + SEARCH */}

      <section className="activity-toolbar">
        <div
          className="activity-filters"
          role="tablist"
          aria-label="Filter activity"
        >
          {FILTERS.map((filter) => {
            const active = selectedFilter === filter.key;

            return (
              <button
                key={filter.key}
                type="button"
                role="tab"
                aria-selected={active}
                className={`activity-filter ${
                  active ? "activity-filter--active" : ""
                }`}
                onClick={() => setSelectedFilter(filter.key)}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <label className="activity-search">
          <span className="activity-search__icon" aria-hidden="true">
            <SearchIcon />
          </span>

          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search activity..."
            aria-label="Search activity"
          />
        </label>
      </section>

      {/* ERROR */}

      {error && (
        <div className="activity-error">
          <p>{error}</p>

          <button type="button" onClick={loadActivity}>
            Try again
          </button>
        </div>
      )}

      {/* EMPTY */}

      {!error && filteredActivities.length === 0 && (
        <ActivityEmptyState
          selectedFilter={selectedFilter}
          hasSearch={Boolean(searchQuery.trim())}
        />
      )}

      {/* ACTIVITY */}

      {!error && filteredActivities.length > 0 && (
        <>
          <section className="activity-list">
            {groupedActivities.map((group) => (
              <ActivityGroup key={group.key} group={group} />
            ))}
          </section>

          <footer className="activity-pagination">
            <p>
              Showing {visibleActivities.length} of {filteredActivities.length}{" "}
              {filteredActivities.length === 1 ? "activity" : "activities"}
            </p>

            {hasMore && (
              <button
                type="button"
                className="activity-load-more"
                onClick={() =>
                  setVisibleCount((current) => current + PAGE_SIZE)
                }
              >
                Load More
              </button>
            )}
          </footer>
        </>
      )}
    </main>
  );
}

/* =========================================================
   ACTIVITY GROUP
========================================================= */

function ActivityGroup({ group }) {
  return (
    <div className="activity-group">
      <h2>{group.label}</h2>

      <div className="activity-group__items">
        {group.items.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   ACTIVITY ITEM
========================================================= */

function ActivityItem({ activity }) {
  const config = getActivityConfig(activity);

  const unread =
    activity.is_notification === true && activity.is_read === false;

  return (
    <article
      className={`activity-item ${unread ? "activity-item--unread" : ""}`}
    >
      <div className="activity-item__icon" aria-hidden="true">
        <ActivityIcon type={config.icon} />
      </div>

      <div className="activity-item__content">
        <div className="activity-item__title-row">
          <h3>{config.title}</h3>

          {unread && (
            <span
              className="activity-item__unread-dot"
              aria-label="Unread notification"
            />
          )}
        </div>

        <p>{getActivityDescription(activity, config)}</p>
      </div>

      <time
        className="activity-item__time"
        dateTime={activity.created_at || undefined}
      >
        {formatActivityTime(activity.created_at)}
      </time>
    </article>
  );
}

/* =========================================================
   ACTIVITY ICON
========================================================= */

function ActivityIcon({ type }) {
  const icon = ACTIVITY_ICONS[type] || ACTIVITY_ICONS.file;

  return <img src={icon} alt="" className="activity-item__icon-image" />;
}

/* =========================================================
   EMPTY STATE
========================================================= */

function ActivityEmptyState({ selectedFilter, hasSearch }) {
  let title = "No activity yet";

  let description = "Your campaign and account activity will appear here.";

  if (hasSearch) {
    title = "No activity found";

    description = "Try searching for something else or clear your search.";
  } else if (selectedFilter !== "all") {
    const filter = FILTERS.find((item) => item.key === selectedFilter);

    title = `No ${filter?.label?.toLowerCase() || ""} activity`;

    description = "Activity in this category will appear here when it happens.";
  }

  return (
    <section className="activity-empty">
      <strong>{title}</strong>

      <p>{description}</p>
    </section>
  );
}

/* =========================================================
   ACTIVITY CONFIG
========================================================= */

function getActivityConfig(activity) {
  const type = activity?.activity_type || "";

  const known = ACTIVITY_CONFIG[type];

  if (known) {
    return {
      ...known,

      /*
       * Use our known Fundu activity title so the
       * Activity page remains consistent even if older
       * database rows used slightly different titles.
       */
      title: known.title,
    };
  }

  return {
    title: activity?.title?.trim() || formatActivityType(type) || "Activity",

    category: inferActivityCategory(type),

    icon: inferActivityIcon(type),
  };
}

/* =========================================================
   ACTIVITY DESCRIPTION
========================================================= */

function getActivityDescription(activity, config) {
  /*
   * Prefer the exact description that was recorded when
   * the activity happened.
   *
   * This is especially important for:
   * - Amount raised changes
   * - Update titles
   * - Campaign names
   * - Milestone notifications
   */

  if (activity?.description?.trim()) {
    return activity.description.trim();
  }

  const campaignName =
    activity?.metadata?.campaign_title ||
    activity?.metadata?.campaign_name ||
    "your campaign";

  switch (activity?.activity_type) {
    case "campaign_draft_created":
      return `You created a draft for ${campaignName}`;

    case "campaign_published":
      return `${campaignName} was published successfully`;

    case "campaign_edited":
      return `You edited ${campaignName}`;

    case "campaign_story_updated":
      return `You updated the story for ${campaignName}`;

    case "campaign_images_updated":
      return `You updated images for ${campaignName}`;

    case "campaign_end_date_changed":
      return `You changed the end date for ${campaignName}`;

    case "campaign_ending_soon":
      return `${campaignName} ends in less than 24 hours.`;

    case "campaign_ended":
      return `${campaignName} has ended`;

    case "campaign_ended_early":
      return `${campaignName} was ended early`;

    case "amount_raised_updated":
      return getAmountRaisedDescription(activity, campaignName);

    case "campaign_reached_25":
      return `${campaignName} has reached 25% of its goal!`;

    case "campaign_reached_50":
      return `${campaignName} has reached 50% of its goal!`;

    case "campaign_reached_75":
      return `${campaignName} has reached 75% of its goal!`;

    case "campaign_reached_100":
      return `${campaignName} has reached 100% of its goal! 🎉`;

    case "campaign_update_published": {
      const updateTitle = activity?.metadata?.update_title;

      if (updateTitle) {
        return `"${updateTitle}" was published to ${campaignName}`;
      }

      return `An update was published to ${campaignName}`;
    }

    case "final_campaign_update_published": {
      const updateTitle = activity?.metadata?.update_title;

      if (updateTitle) {
        return `"${updateTitle}" was published to ${campaignName}`;
      }

      return `A final update was published to ${campaignName}`;
    }

    case "campaign_update_edited":
      return `You edited an update on ${campaignName}`;

    case "campaign_update_deleted":
      return `An update was deleted from ${campaignName}`;

    case "bank_account_added":
      return `You added a bank account for ${campaignName}`;

    case "bank_account_updated":
      return `You updated the bank account for ${campaignName}`;

    case "comment_posted":
      return `You commented on ${campaignName}`;

    case "comment_received":
      return `${campaignName} received a new comment`;

    case "profile_updated":
      return "You updated your profile information";

    default:
      return config.title;
  }
}

/* =========================================================
   AMOUNT RAISED DESCRIPTION
========================================================= */

function getAmountRaisedDescription(activity, campaignName) {
  const metadata = activity?.metadata || {};

  const previousAmount =
    metadata.previous_amount ?? metadata.previous_amount_raised;

  const newAmount = metadata.new_amount ?? metadata.amount_raised;

  if (
    previousAmount !== undefined &&
    previousAmount !== null &&
    newAmount !== undefined &&
    newAmount !== null
  ) {
    return `You updated ${campaignName} from ${formatMoney(
      previousAmount,
    )} to ${formatMoney(newAmount)}`;
  }

  if (newAmount !== undefined && newAmount !== null) {
    return `You updated ${campaignName} to ${formatMoney(newAmount)}`;
  }

  return `You updated the amount raised for ${campaignName}`;
}

/* =========================================================
   CATEGORY FALLBACK
========================================================= */

function inferActivityCategory(type) {
  const value = String(type || "").toLowerCase();

  if (value.includes("comment")) {
    return "comments";
  }

  if (
    value.includes("update_published") ||
    value.includes("update_edited") ||
    value.includes("update_deleted")
  ) {
    return "updates";
  }

  if (
    value.includes("bank") ||
    value.includes("profile") ||
    value.includes("account") ||
    value.includes("setting")
  ) {
    return "account";
  }

  return "campaigns";
}

/* =========================================================
   ICON FALLBACK
========================================================= */

function inferActivityIcon(type) {
  const value = String(type || "").toLowerCase();

  if (value.includes("comment")) {
    return "comment";
  }

  if (value.includes("bank") || value.includes("account")) {
    return "bank";
  }

  if (value.includes("reached") || value.includes("amount_raised")) {
    return "trending";
  }

  if (value.includes("ended") || value.includes("ending_soon")) {
    return "bell";
  }

  if (value.includes("published") || value.includes("launch")) {
    return "rocket";
  }

  if (
    value.includes("edited") ||
    value.includes("updated") ||
    value.includes("changed") ||
    value.includes("image") ||
    value.includes("story") ||
    value.includes("profile")
  ) {
    return "edit";
  }

  if (value.includes("deleted") || value.includes("draft")) {
    return "file";
  }

  return "file";
}

/* =========================================================
   DATE GROUPING
========================================================= */

function groupActivitiesByDate(activities) {
  const groups = new Map();

  activities.forEach((activity) => {
    if (!activity.created_at) {
      return;
    }

    const date = new Date(activity.created_at);

    if (Number.isNaN(date.getTime())) {
      return;
    }

    const key = getLocalDateKey(date);

    if (!groups.has(key)) {
      groups.set(key, {
        key,
        date,
        label: formatDateGroupLabel(date),
        items: [],
      });
    }

    groups.get(key).items.push(activity);
  });

  return Array.from(groups.values());
}

function getLocalDateKey(date) {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDateGroupLabel(date) {
  const today = new Date();

  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const targetStart = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  const difference = todayStart.getTime() - targetStart.getTime();

  const days = Math.round(difference / (1000 * 60 * 60 * 24));

  if (days === 0) {
    return "Today";
  }

  if (days === 1) {
    return "Yesterday";
  }

  return date.toLocaleDateString("en-NG", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/* =========================================================
   TIME
========================================================= */

function formatActivityTime(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const now = new Date();

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds >= 0 && seconds < 60) {
    return "Just now";
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes >= 1 && minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours >= 1 && hours < 24 && isSameCalendarDay(date, now)) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  if (isYesterday(date, now)) {
    return "Yesterday";
  }

  return date.toLocaleDateString("en-NG", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function isSameCalendarDay(first, second) {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

function isYesterday(date, now) {
  const yesterday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1,
  );

  return isSameCalendarDay(date, yesterday);
}

/* =========================================================
   FORMAT UNKNOWN TYPE
========================================================= */

function formatActivityType(type) {
  if (!type) {
    return "";
  }

  return String(type)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

/* =========================================================
   MONEY
========================================================= */

function formatMoney(value, currency = "NGN") {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

/* =========================================================
   SEARCH ICON
========================================================= */

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.7" />

      <path
        d="M20 20L16.5 16.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
