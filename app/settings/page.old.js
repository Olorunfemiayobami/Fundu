"use client";
import React, { useState, useEffect } from "react";
import SettingsSidebar from "@/app/settings/Components/SettingsSidebar";
import Profile from "@/app/settings/Components/Profile";
import Campaigns from "@/app/settings/Components/Campaigns";
import { supabase } from "@/lib/supabase";
import "@/styles/settings.css";

// Remaining Mock Components
const Donations = () => (
  <div className="animate-fade-in">
    <h3>My Donations</h3>
    <p>Donation history will load here.</p>
  </div>
);
const Payout = () => (
  <div className="animate-fade-in">
    <h3>Payout Settings</h3>
    <p>Manage your bank details here.</p>
  </div>
);
const Notifications = () => (
  <div className="animate-fade-in">
    <h3>Notifications</h3>
    <p>Manage your alerts here.</p>
  </div>
);

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSwitching, setIsSwitching] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    }
    getUser();
  }, []);

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setIsSwitching(true);
    setActiveTab(tab);

    // Simulate "SaaS" feel delay
    const timer = setTimeout(() => {
      setIsSwitching(false);
    }, 800);
    return () => clearTimeout(timer); // Cleanup
  };

  return (
    <div className="settings-main-flex font-urbanist">
      <SettingsSidebar
        onTabChange={handleTabChange}
        activeTab={activeTab}
        user={user}
      />

      <main
        className="profile-container-body"
        style={{
          position: "relative",
          minHeight: "600px",
          flex: 1,
          background: "#FFF",
        }}
      >
        {isSwitching ? (
          <div className="tab-loading-overlay">
            <div className="spinner"></div>
            <p
              style={{ color: "#667085", fontSize: "14px", fontWeight: "500" }}
            >
              Pulling data from database...
            </p>
          </div>
        ) : (
          <div className="animate-fade-in">
            {activeTab === "profile" && <Profile />}
            {/* Pass user down to ensure Campaigns has it immediately */}
            {activeTab === "campaigns" && <Campaigns currentUser={user} />}
            {activeTab === "donations" && <Donations />}
            {activeTab === "payout" && <Payout />}
            {activeTab === "notifications" && <Notifications />}
          </div>
        )}
      </main>
    </div>
  );
}
