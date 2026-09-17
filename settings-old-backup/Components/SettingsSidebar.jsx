"use client";
import React from "react";

export default function SettingsSidebar({ onTabChange, activeTab, user }) {
  const Chevron = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 12L10 8L6 4"
        stroke="#888"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <aside className="settings-sidebar-container">
      {/* USER PROFILE CARD */}
      <div className="name-container">
        <div className="profile-picture">
          {user?.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            user?.user_metadata?.full_name?.charAt(0) || "U"
          )}
        </div>
        <div className="name-text-group">
          <h3 className="name-title">
            {user?.user_metadata?.full_name || "User"}
          </h3>
          <p className="name-body">{user?.email}</p>
        </div>
        <button
          className="edit-profile-btn"
          onClick={() => onTabChange("profile")}
        >
          <span>Edit Profile</span>
        </button>
      </div>

      <div className="directory-wrapper">
        {/* ACCOUNT SECTION */}
        <div className="directory-section">
          <span className="section-label">Account</span>
          <div className="section-content-card">
            <button
              className={`directory-item ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => onTabChange("profile")}
            >
              <div className="icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.87 12.72 12.12 12.78Z"
                    stroke="#333333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z"
                    stroke="#333333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#333333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="directory-text-group">
                <span className="directory-text">My Profile</span>
                <p className="directory-sub">
                  View and edit your personal details
                </p>
              </div>
              <Chevron />
            </button>

            <button
              className={`directory-item ${activeTab === "campaigns" ? "active" : ""}`}
              onClick={() => onTabChange("campaigns")}
            >
              <div className="icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M7.4974 18.3327H12.4974C16.6641 18.3327 18.3307 16.666 18.3307 12.4993V7.49935C18.3307 3.33268 16.6641 1.66602 12.4974 1.66602H7.4974C3.33073 1.66602 1.66406 3.33268 1.66406 7.49935V12.4993C1.66406 16.666 3.33073 18.3327 7.4974 18.3327Z"
                    stroke="#333333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.125 7.5H6.875"
                    stroke="#333333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.125 12.5H6.875"
                    stroke="#333333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="directory-text-group">
                <span className="directory-text">My Campaigns</span>
                <p className="directory-sub">View and manage your campaigns</p>
              </div>
              <Chevron />
            </button>

            <button
              className={`directory-item ${activeTab === "donations" ? "active" : ""}`}
              onClick={() => onTabChange("donations")}
            >
              <div className="icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M1.66406 7.08398H12.0807"
                    stroke="#333333"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 13.75H6.66667"
                    stroke="#333333"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.75 13.75H12.0833"
                    stroke="#333333"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.3307 11.691V13.4243C18.3307 16.3494 17.5891 17.0827 14.6307 17.0827H5.36406C2.40573 17.0827 1.66406 16.3494 1.66406 13.4243V6.57435C1.66406 3.64935 2.40573 2.91602 5.36406 2.91602H12.0807"
                    stroke="#333333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.6641 7.91602V2.91602L18.3307 4.58268"
                    stroke="#333333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.6667 2.91602L15 4.58268"
                    stroke="#333333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="directory-text-group">
                <span className="directory-text">My Donations</span>
                <p className="directory-sub">Track your contribution history</p>
              </div>
              <Chevron />
            </button>

            <button
              className={`directory-item ${activeTab === "payout" ? "active" : ""}`}
              onClick={() => onTabChange("payout")}
            >
              <div className="icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M10.8359 9.29102H5.83594"
                    stroke="#333333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1.66406 9.29219V5.44219C1.66406 3.74219 3.03906 2.36719 4.73906 2.36719H9.42239C11.1224 2.36719 12.4974 3.42552 12.4974 5.12552"
                    stroke="#333333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.564 10.1667C14.1474 10.5667 13.9474 11.1833 14.1141 11.8166C14.3224 12.5916 15.0891 13.0833 15.8891 13.0833H16.6641V14.2917C16.6641 16.1333 15.1724 17.625 13.3307 17.625H4.9974C3.15573 17.625 1.66406 16.1333 1.66406 14.2917V8.45833C1.66406 6.61667 3.15573 5.125 4.9974 5.125H13.3307C15.1641 5.125 16.6641 6.625 16.6641 8.45833V9.66663H15.764C15.2974 9.66663 14.8724 9.84999 14.564 10.1667Z"
                    stroke="#333333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.3368 10.516V12.2327C18.3368 12.6994 17.9534 13.0827 17.4784 13.0827H15.8701C14.9701 13.0827 14.1451 12.4244 14.0701 11.5244C14.0201 10.9994 14.2201 10.5077 14.5701 10.166C14.8784 9.84938 15.3034 9.66602 15.7701 9.66602H17.4784C17.9534 9.66602 18.3368 10.0494 18.3368 10.516Z"
                    stroke="#333333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="directory-text-group">
                <span className="directory-text">Payout</span>
                <p className="directory-sub">Manage your payout method</p>
              </div>
              <Chevron />
            </button>
          </div>
        </div>

        {/* PREFERENCES */}
        <div className="directory-section">
          <span className="section-label">Preferences</span>
          <div className="section-content-card">
            <button
              className={`directory-item ${activeTab === "notifications" ? "active" : ""}`}
              onClick={() => onTabChange("notifications")}
            >
              <div className="icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M10 5.36719V8.14219"
                    stroke="#333333"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10.0171 1.66602C6.9504 1.66602 4.46707 4.14935 4.46707 7.21602V8.96602C4.46707 9.53268 4.23374 10.3827 3.94207 10.866L2.88374 12.6327C2.23374 13.7243 2.68374 14.941 3.88374 15.341C7.86707 16.666 12.1754 16.666 16.1587 15.341C17.2837 14.966 17.7671 13.6493 17.1587 12.6327L16.1004 10.866C15.8087 10.3827 15.5754 9.52435 15.5754 8.96602V7.21602C15.5671 4.16602 13.0671 1.66602 10.0171 1.66602Z"
                    stroke="#333333"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12.7766 15.6836C12.7766 17.2086 11.5266 18.4586 10.0016 18.4586C9.24323 18.4586 8.54323 18.1419 8.04323 17.6419C7.54323 17.1419 7.22656 16.4419 7.22656 15.6836"
                    stroke="#333333"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                  />
                </svg>
              </div>
              <div className="directory-text-group">
                <span className="directory-text">Notifications</span>
                <p className="directory-sub">Manage notification preferences</p>
              </div>
              <Chevron />
            </button>
          </div>
        </div>

        <button
          className="logout-item"
          style={{
            color: "#F04438",
            background: "none",
            border: "none",
            width: "100%",
            textAlign: "left",
            cursor: "pointer",
          }}
        >
          <div className="icon-wrapper" style={{ background: "#FEE4E2" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M7.41406 6.29922C7.6724 3.29922 9.21406 2.07422 12.5891 2.07422H12.6974C16.4224 2.07422 17.9141 3.56589 17.9141 7.29089V12.7242C17.9141 16.4492 16.4224 17.9409 12.6974 17.9409H12.5891C9.23906 17.9409 7.6974 16.7326 7.4224 13.7826"
                stroke="#FF383C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.499 10H3.01562"
                stroke="#FF383C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.8776 7.20898L2.08594 10.0007L4.8776 12.7923"
                stroke="#FF383C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="directory-text-group">
            <span className="directory-text">Log Out</span>
            <p className="directory-sub">Sign out of your account</p>
          </div>
        </button>
      </div>
    </aside>
  );
}
