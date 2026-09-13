"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import "../../styles/navbar.css";

/* ─────────────────────────── Icons ─────────────────────────── */

const HamburgerIcon = () => (
  <svg
    width="30"
    height="20"
    viewBox="0 0 30 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M29.167 1.25C29.167 1.582 29.035 1.9 28.8 2.134C28.566 2.368 28.248 2.5 27.917 2.5H1.25C0.918 2.5 0.6 2.368 0.366 2.134C0.132 1.9 0 1.582 0 1.25C0 0.918 0.132 0.6 0.366 0.366C0.6 0.132 0.918 0 1.25 0H27.917C28.248 0 28.566 0.132 28.8 0.366C29.035 0.6 29.167 0.918 29.167 1.25ZM29.167 9.583C29.167 9.915 29.035 10.233 28.8 10.467C28.566 10.702 28.248 10.833 27.917 10.833H1.25C0.918 10.833 0.6 10.702 0.366 10.467C0.132 10.233 0 9.915 0 9.583C0 9.252 0.132 8.934 0.366 8.7C0.6 8.465 0.918 8.333 1.25 8.333H27.917C28.248 8.333 28.566 8.465 28.8 8.7C29.035 8.934 29.167 9.252 29.167 9.583ZM29.167 17.917C29.167 18.248 29.035 18.566 28.8 18.8C28.566 19.035 28.248 19.167 27.917 19.167H1.25C0.918 19.167 0.6 19.035 0.366 18.8C0.132 18.566 0 18.248 0 17.917C0 17.585 0.132 17.267 0.366 17.033C0.6 16.798 0.918 16.667 1.25 16.667H27.917C28.248 16.667 28.566 16.798 28.8 17.033C29.035 17.267 29.167 17.585 29.167 17.917Z"
      fill="black"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 21L11 11M11 11L21 1M11 11L1 1M11 11L21 21"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowDownIcon = ({ isOpen = false }) => (
  <svg
    width="14"
    height="8"
    viewBox="0 0 14 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`dropdown-icon ${isOpen ? "open" : ""}`}
  >
    <path
      d="M0.293 0.293C0.48 0.105 0.735 0 1 0C1.265 0 1.519 0.105 1.707 0.293L6.657 5.243L11.607 0.293C11.795 0.111 12.048 0.01 12.31 0.012C12.572 0.014 12.823 0.12 13.009 0.305C13.194 0.49 13.299 0.741 13.302 1.003C13.304 1.266 13.203 1.518 13.021 1.707L7.364 7.364C7.176 7.551 6.922 7.657 6.657 7.657C6.392 7.657 6.137 7.551 5.95 7.364L0.293 1.707C0.105 1.519 0 1.265 0 1C0 0.735 0.105 0.48 0.293 0.293Z"
      fill="#888888"
    />
  </svg>
);

const BellIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#667085"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const LogoutIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.414 6.299C7.672 3.299 9.214 2.074 12.589 2.074H12.697C16.422 2.074 17.914 3.566 17.914 7.291V12.724C17.914 16.449 16.422 17.941 12.697 17.941H12.589C9.239 17.941 7.697 16.733 7.422 13.783"
      stroke="#FF383C"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.499 10H3.016"
      stroke="#FF383C"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.878 7.209L2.086 10.001L4.878 12.792"
      stroke="#FF383C"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─────────────────────────── Navigation ─────────────────────────── */

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Explore", href: "/explore" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Settings", href: "/settings" },
];

/* ─────────────────────────── Navbar ─────────────────────────── */

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRef = useRef(null);
  const pathname = usePathname();

  /* ── Authentication ── */

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      authListener.subscription.unsubscribe();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* ── Close mobile menu when route changes ── */

  useEffect(() => {
    setMobileMenuOpen(false);
    setIsOpen(false);
  }, [pathname]);

  /* ── Lock body scroll while mobile menu is open ── */

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  /* ── Escape closes mobile menu ── */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* ── Logout ── */

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
    setMobileMenuOpen(false);
  };

  /* ── Active navigation ── */

  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }

    return pathname === path || pathname.startsWith(`${path}/`);
  };

  /* ── Mobile navigation ── */

  const handleMobileNavigation = () => {
    setMobileMenuOpen(false);
  };

  /* ── Initials fallback ── */

  const initials =
    user?.user_metadata?.full_name
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  if (loading) {
    return (
      <header className="navbar-wrapper">
        <nav className="navbar">
          <div className="navbar-loading"></div>
        </nav>
      </header>
    );
  }

  return (
    <header className="navbar-wrapper">
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        {/* ═════════════════════ DESKTOP ═════════════════════ */}

        <div className="navbar-desktop">
          <div className="nav-left-group">
            <Link href="/" className="logo-container" aria-label="Fundu Home">
              <Image
                src="/logo.svg"
                alt="Fundu Logo"
                width={56}
                height={16}
                priority
              />
            </Link>

            <div className="nav-links">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`nav-link ${isActive(item.href) ? "active" : ""}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="nav-right-group">
            {user ? (
              <>
                <button
                  className="icon-btn"
                  type="button"
                  aria-label="Notifications"
                >
                  <BellIcon />
                </button>

                <Link href="/create-campaign" className="nav-btn-primary">
                  Create Campaign
                </Link>

                <div className="avatar-dropdown-wrapper" ref={dropdownRef}>
                  <button
                    type="button"
                    className="avatar-trigger"
                    onClick={() => setIsOpen((previous) => !previous)}
                    aria-expanded={isOpen}
                    aria-label="Open profile menu"
                  >
                    <div className="user-avatar">
                      {user.user_metadata?.avatar_url ? (
                        <img
                          src={user.user_metadata.avatar_url}
                          alt="Profile"
                          className="user-avatar-image"
                          key={user.user_metadata.avatar_url}
                        />
                      ) : (
                        <span>{initials}</span>
                      )}
                    </div>

                    <ArrowDownIcon isOpen={isOpen} />
                  </button>

                  {isOpen && (
                    <div className="dropdown-menu">
                      <Link href="/settings" onClick={() => setIsOpen(false)}>
                        My Profile
                      </Link>

                      <Link href="/settings" onClick={() => setIsOpen(false)}>
                        Account Settings
                      </Link>

                      <hr className="dropdown-divider" />

                      <button
                        onClick={handleLogout}
                        className="logout-btn"
                        type="button"
                      >
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/signup" className="nav-btn-primary">
                  Sign Up
                </Link>

                <Link href="/signin" className="nav-login-link">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>

        {/* ═════════════════════ MOBILE ═════════════════════ */}

        <div className="navbar-mobile">
          <div className="navbar-mobile-bar">
            <Link
              href="/"
              className="mobile-logo-container"
              aria-label="Fundu Home"
            >
              <Image
                src="/logo.svg"
                alt="Fundu Logo"
                width={64}
                height={64}
                priority
              />
            </Link>

            <button
              type="button"
              className="navbar-hamburger"
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((previous) => !previous)}
            >
              {mobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>

          <div className={`navbar-mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
            <div className="navbar-mobile-menu-inner">
              <div className="mobile-nav-links">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`mobile-nav-link ${
                      isActive(item.href) ? "active" : ""
                    }`}
                    onClick={handleMobileNavigation}
                  >
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>

              <div className="mobile-menu-divider"></div>

              {user ? (
                <>
                  <Link
                    href="/create-campaign"
                    className="mobile-create-btn"
                    onClick={handleMobileNavigation}
                  >
                    Create Campaign
                  </Link>

                  <div className="mobile-profile-section">
                    <Link
                      href="/settings"
                      className="mobile-profile"
                      onClick={handleMobileNavigation}
                    >
                      <div className="user-avatar mobile-avatar">
                        {user.user_metadata?.avatar_url ? (
                          <img
                            src={user.user_metadata.avatar_url}
                            alt="Profile"
                            className="user-avatar-image"
                          />
                        ) : (
                          <span>{initials}</span>
                        )}
                      </div>

                      <div className="mobile-profile-info">
                        <span className="mobile-profile-name">
                          {user.user_metadata?.full_name || "My Profile"}
                        </span>

                        <span className="mobile-profile-label">
                          View profile
                        </span>
                      </div>
                    </Link>

                    <button
                      type="button"
                      className="mobile-logout-btn"
                      onClick={handleLogout}
                      aria-label="Log out"
                    >
                      <LogoutIcon />
                    </button>
                  </div>
                </>
              ) : (
                <div className="mobile-auth-actions">
                  <Link
                    href="/signup"
                    className="mobile-signup-btn"
                    onClick={handleMobileNavigation}
                  >
                    Sign Up
                  </Link>

                  <Link
                    href="/signin"
                    className="mobile-login-btn"
                    onClick={handleMobileNavigation}
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
