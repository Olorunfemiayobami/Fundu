"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import "../../styles/navbar.css";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();

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
      }
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
  };

  const isActive = (path) =>
    pathname === path ? "nav-link active" : "nav-link";

  if (loading)
    return (
      <header className="navbar-wrapper">
        <nav className="navbar"></nav>
      </header>
    );

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <div className="nav-left-group">
          <Link href="/" className="logo-container">
            <Image
              src="/logo.svg"
              alt="Fundu Logo"
              width={64}
              height={64}
              priority
            />
          </Link>

          <div className="nav-links">
            <Link href="/dashboard" className={isActive("/dashboard")}>
              Dashboard
            </Link>
            <Link href="/explore" className={isActive("/explore")}>
              Explore
            </Link>
            <Link href="/campaigns" className={isActive("/campaigns")}>
              Campaigns
            </Link>
            <Link href="/settings" className={isActive("/settings")}>
              Settings
            </Link>
            <Link href="/notifications" className={isActive("/notifications")}>
              Notifications <span className="notif-badge">10</span>
            </Link>
          </div>
        </div>

        <div className="nav-right-group">
          {user ? (
            <>
              <button className="icon-btn">
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
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </button>

              <Link href="/create-campaign">
                <button className="nav-btn-primary">Create Campaign</button>
              </Link>

              <div className="avatar-dropdown-wrapper" ref={dropdownRef}>
                <div
                  className="avatar-trigger"
                  onClick={() => setIsOpen(!isOpen)}
                  style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
                >
                  <div 
                    className="user-avatar" 
                    style={{ 
                      width: "40px", 
                      height: "40px", 
                      borderRadius: "50%", 
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f0f0f0"
                    }}
                  >
                    {/* UPDATED LOGIC: Show Image if it exists, otherwise show Initials */}
                    {user.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt="Profile"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        // Force refresh if the URL changes
                        key={user.user_metadata.avatar_url}
                      />
                    ) : (
                      <span style={{ fontWeight: "bold", color: "#1E807F" }}>
                        {user.user_metadata?.full_name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "U"}
                      </span>
                    )}
                  </div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className={`dropdown-icon ${isOpen ? "open" : ""}`}
                  >
                    <path
                      d="M1.63654 5.29279C1.82406 5.10532 2.07837 5 2.34354 5C2.6087 5 2.86301 5.10532 3.05054 5.29279L8.00054 10.2428L12.9505 5.29279C13.1391 5.11063 13.3917 5.00983 13.6539 5.01211C13.9161 5.01439 14.1669 5.11956 14.3524 5.30497C14.5378 5.49038 14.6429 5.74119 14.6452 6.00339C14.6475 6.26558 14.5467 6.51818 14.3645 6.70679L8.70754 12.3638C8.52001 12.5513 8.2657 12.6566 8.00054 12.6566C7.73537 12.6566 7.48106 12.5513 7.29354 12.3638L1.63654 6.70679C1.44907 6.51926 1.34375 6.26495 1.34375 5.99979C1.34375 5.73462 1.44907 5.48031 1.63654 5.29279Z"
                      fill="#888888"
                    />
                  </svg>
                </div>

                {isOpen && (
                  <div className="dropdown-menu">
                    <Link href="/settings" onClick={() => setIsOpen(false)}>
                      My Profile
                    </Link>
                    <Link href="/settings" onClick={() => setIsOpen(false)}>
                      Account Settings
                    </Link>
                    <hr className="dropdown-divider" />
                    <button onClick={handleLogout} className="logout-btn">
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/signup">
                <button className="nav-btn-primary">Sign Up</button>
              </Link>
              <Link
                href="/signin"
                className="nav-link"
                style={{ fontWeight: "bold", color: "#1E807F" }}
              >
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}