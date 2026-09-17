"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SideNav() {
  const pathname = usePathname();
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [displayName, setDisplayName] = useState("Fundu User");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [campaignCount, setCampaignCount] = useState(0);
  const [unreadActivityCount, setUnreadActivityCount] = useState(0);
  const [loggingOut, setLoggingOut] = useState(false);

  const profileRef = useRef(null);
  const mobileProfileRef = useRef(null);

  const navItems = [
    {
      label: "Home",
      href: "/dashboard",
      icon: "/icons/app-nav/home.svg",
    },
    {
      label: "Explore",
      href: "/explore",
      icon: "/icons/app-nav/explore.svg",
    },
    {
      label: "Campaigns",
      href: "/campaigns",
      icon: "/icons/app-nav/campaigns.svg",
    },
    {
      label: "Settings",
      href: "/settings",
      icon: "/icons/app-nav/settings.svg",
    },
    {
      label: "Activity",
      href: "/activity",
      icon: "/icons/app-nav/notification.svg",
      showUnreadBadge: true,
    },
  ];

  /* =========================================================
     LOAD UNREAD ACTIVITY COUNT
  ========================================================= */

  async function loadUnreadActivityCount() {
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        console.error("Sidebar unread activity auth error:", authError);
        return;
      }

      if (!user) {
        setUnreadActivityCount(0);
        return;
      }

      const { data, error } = await supabase.rpc("get_unread_activity_count");

      if (error) {
        console.error("Sidebar unread activity count error:", error);
        return;
      }

      setUnreadActivityCount(Number(data) || 0);
    } catch (error) {
      console.error("Sidebar unread activity count error:", error);
    }
  }

  /* =========================================================
     LOAD SIDEBAR DATA
  ========================================================= */

  useEffect(() => {
    let mounted = true;

    async function loadSidebarData() {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
          console.error("Sidebar auth error:", authError);
          return;
        }

        if (!user || !mounted) {
          return;
        }

        const metadata = user.user_metadata || {};

        /* =========================
           PROFILE
        ========================= */

        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select(
            `
              id,
              full_name,
              display_name,
              avatar_url,
              email
            `,
          )
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) {
          console.error("Sidebar profile error:", profileError);
        }

        if (!mounted) {
          return;
        }

        const resolvedName =
          profile?.display_name ||
          profile?.full_name ||
          metadata.display_name ||
          metadata.full_name ||
          metadata.name ||
          [metadata.first_name, metadata.last_name].filter(Boolean).join(" ") ||
          user.email?.split("@")[0] ||
          "Fundu User";

        const resolvedAvatar = profile?.avatar_url || metadata.avatar_url || "";

        setDisplayName(resolvedName);
        setAvatarUrl(resolvedAvatar);

        /* =========================
           CAMPAIGN COUNT
        ========================= */

        const { count, error: countError } = await supabase
          .from("campaigns")
          .select("*", {
            count: "exact",
            head: true,
          })
          .eq("creator_id", user.id);

        if (countError) {
          console.error("Sidebar campaign count error:", countError);
        } else if (mounted) {
          setCampaignCount(count || 0);
        }

        /* =========================
           UNREAD ACTIVITY COUNT
        ========================= */

        if (mounted) {
          await loadUnreadActivityCount();
        }
      } catch (error) {
        console.error("Sidebar load error:", error);
      }
    }

    loadSidebarData();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) {
        return;
      }

      if (event === "SIGNED_OUT" || !session) {
        setDisplayName("Fundu User");
        setAvatarUrl("");
        setCampaignCount(0);
        setUnreadActivityCount(0);
        return;
      }

      loadSidebarData();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  /* =========================================================
     ACTIVITY EVENTS

     fundu:activity-read
     Sent by the Activity page after unread notifications
     have been marked as read.

     fundu:activity-updated
     Sent when another page creates new activity or a new
     unread notification, such as a campaign milestone.
  ========================================================= */

  useEffect(() => {
    function handleActivityRead() {
      /*
       * The Activity page has marked all current unread
       * notifications as read, so immediately remove the badge.
       */
      setUnreadActivityCount(0);
    }

    async function handleActivityUpdated() {
      /*
       * Something created new activity.
       *
       * Ask Supabase for the real unread count instead of
       * simply adding 1 because one action can create several
       * notifications at once.
       *
       * Example:
       * 10% -> 80% can create 25%, 50%, and 75%.
       */
      await loadUnreadActivityCount();
    }

    window.addEventListener("fundu:activity-read", handleActivityRead);

    window.addEventListener("fundu:activity-updated", handleActivityUpdated);

    return () => {
      window.removeEventListener("fundu:activity-read", handleActivityRead);

      window.removeEventListener(
        "fundu:activity-updated",
        handleActivityUpdated,
      );
    };
  }, []);

  /* =========================================================
     REFRESH BADGE WHEN ROUTE CHANGES
  ========================================================= */

  useEffect(() => {
    /*
     * Whenever the user navigates somewhere other than
     * Activity, check Supabase again for the current unread
     * notification count.
     *
     * We do not refresh while entering /activity because the
     * Activity page itself marks notifications as read and
     * sends fundu:activity-read.
     */

    if (pathname !== "/activity") {
      loadUnreadActivityCount();
    }
  }, [pathname]);

  /* =========================================================
     PROFILE MENU OUTSIDE CLICK
  ========================================================= */

  useEffect(() => {
    function handleClickOutside(event) {
      const clickedDesktopProfile =
        profileRef.current && profileRef.current.contains(event.target);

      const clickedMobileProfile =
        mobileProfileRef.current &&
        mobileProfileRef.current.contains(event.target);

      if (!clickedDesktopProfile && !clickedMobileProfile) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* =========================================================
     CLOSE MOBILE MENU ON NAVIGATION
  ========================================================= */

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  /* =========================================================
     ACTIVE NAV
  ========================================================= */

  function isActive(href) {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname.startsWith(href);
  }

  function closeMobileMenu() {
    setMobileOpen(false);
    setProfileOpen(false);
  }

  /* =========================================================
     LOGOUT
  ========================================================= */

  async function handleLogout() {
    try {
      setLoggingOut(true);

      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout error:", error);
        return;
      }

      setProfileOpen(false);
      setMobileOpen(false);
      setUnreadActivityCount(0);

      router.replace("/signin");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  }

  /* =========================================================
     PROFILE
  ========================================================= */

  function ProfileSection({ mobile = false }) {
    return (
      <div
        className="app-sidebar__profile-wrap"
        ref={mobile ? mobileProfileRef : profileRef}
      >
        <button
          type="button"
          className="app-sidebar__profile"
          onClick={() => setProfileOpen((current) => !current)}
          aria-expanded={profileOpen}
          aria-label="Open profile menu"
        >
          <span className="app-sidebar__avatar">
            {avatarUrl ? (
              <img src={avatarUrl} alt={displayName} />
            ) : (
              <Image
                src="/icons/app-nav/profile-placeholder.svg"
                alt=""
                width={40}
                height={40}
              />
            )}
          </span>

          <span className="app-sidebar__profile-info">
            <span className="app-sidebar__profile-name">{displayName}</span>

            <span className="app-sidebar__profile-meta">
              {campaignCount} {campaignCount === 1 ? "Campaign" : "Campaigns"}
            </span>
          </span>

          <Image
            className={`app-sidebar__profile-chevron ${
              profileOpen ? "app-sidebar__profile-chevron--open" : ""
            }`}
            src="/icons/app-nav/chevron-right.svg"
            alt=""
            width={24}
            height={24}
          />
        </button>

        {profileOpen && (
          <div className="app-sidebar__profile-menu">
            <Link
              href="/settings"
              className="app-sidebar__profile-menu-item"
              onClick={closeMobileMenu}
            >
              Profile
            </Link>

            <button
              type="button"
              className="app-sidebar__profile-menu-item"
              onClick={handleLogout}
              disabled={loggingOut}
            >
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        )}
      </div>
    );
  }

  /* =========================================================
     NAVIGATION
  ========================================================= */

  function NavigationLinks() {
    return (
      <nav className="app-sidebar__nav">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={closeMobileMenu}
            className={`app-sidebar__nav-item ${
              isActive(item.href) ? "active" : ""
            }`}
          >
            <span
              className="app-sidebar__nav-icon"
              style={{
                WebkitMaskImage: `url(${item.icon})`,
                maskImage: `url(${item.icon})`,
              }}
              aria-hidden="true"
            />

            <span className="app-sidebar__nav-label">{item.label}</span>

            {item.showUnreadBadge && unreadActivityCount > 0 && (
              <span
                className="app-sidebar__activity-badge"
                aria-label={`${unreadActivityCount} unread ${
                  unreadActivityCount === 1 ? "notification" : "notifications"
                }`}
              >
                {unreadActivityCount > 99 ? "99+" : unreadActivityCount}
              </span>
            )}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <>
      {/* =====================================================
          DESKTOP SIDEBAR
      ====================================================== */}

      <aside
        className={`app-sidebar ${collapsed ? "app-sidebar--collapsed" : ""}`}
      >
        <div className="app-sidebar__top">
          <Link href="/dashboard" className="app-sidebar__logo">
            <span>Fund</span>
            <span>U</span>
          </Link>

          <button
            type="button"
            className="app-sidebar__collapse"
            onClick={() => setCollapsed((current) => !current)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Image
              src="/icons/app-nav/sidebar-toggle.svg"
              alt=""
              width={18}
              height={18}
            />
          </button>
        </div>

        <ProfileSection />

        <NavigationLinks />

        <Link href="/help" className="app-sidebar__help">
          <span
            className="app-sidebar__help-icon"
            style={{
              WebkitMaskImage: "url(/icons/app-nav/help.svg)",
              maskImage: "url(/icons/app-nav/help.svg)",
            }}
            aria-hidden="true"
          />

          <span className="app-sidebar__help-label">Help</span>
        </Link>

        <Link href="/create-campaign" className="app-sidebar__create">
          Create Campaign
        </Link>
      </aside>

      {/* =====================================================
          MOBILE HEADER
      ====================================================== */}

      <header className="app-mobile-header">
        <Link href="/dashboard" className="app-sidebar__logo">
          <span>Fund</span>
          <span>U</span>
        </Link>

        <button
          type="button"
          className="app-mobile-header__menu"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Image src="/icons/app-nav/menu.svg" alt="" width={24} height={24} />
        </button>
      </header>

      {/* =====================================================
          MOBILE DRAWER
      ====================================================== */}

      {mobileOpen && (
        <div className="app-mobile-overlay" onClick={closeMobileMenu}>
          <aside
            className="app-mobile-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="app-sidebar__top">
              <Link
                href="/dashboard"
                className="app-sidebar__logo"
                onClick={closeMobileMenu}
              >
                <span>Fund</span>
                <span>U</span>
              </Link>

              <button
                type="button"
                className="app-mobile-drawer__close"
                onClick={closeMobileMenu}
                aria-label="Close menu"
              >
                <Image
                  src="/icons/app-nav/sidebar-toggle.svg"
                  alt=""
                  width={18}
                  height={18}
                />
              </button>
            </div>

            <ProfileSection mobile />

            <NavigationLinks />

            <Link
              href="/help"
              onClick={closeMobileMenu}
              className="app-sidebar__help"
            >
              <span
                className="app-sidebar__help-icon"
                style={{
                  WebkitMaskImage: "url(/icons/app-nav/help.svg)",
                  maskImage: "url(/icons/app-nav/help.svg)",
                }}
                aria-hidden="true"
              />

              <span className="app-sidebar__help-label">Help</span>
            </Link>

            <Link
              href="/create-campaign"
              onClick={closeMobileMenu}
              className="app-sidebar__create"
            >
              Create Campaign
            </Link>
          </aside>
        </div>
      )}
    </>
  );
}
