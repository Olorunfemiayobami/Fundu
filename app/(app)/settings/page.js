"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import "@/styles/settings.css";

const SETTINGS_TABS = [
  {
    key: "profile",
    label: "Profile",
    description: "Manage your personal information",
  },
  {
    key: "bank",
    label: "Bank Account",
    description: "Manage where campaign support is sent",
  },
  {
    key: "notifications",
    label: "Notifications",
    description: "Manage your notification preferences",
  },
];

export default function SettingsPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("profile");

  const [authUser, setAuthUser] = useState(null);

  const [profile, setProfile] = useState(null);

  const [bankAccounts, setBankAccounts] = useState([]);

  const [campaigns, setCampaigns] = useState([]);

  const [loading, setLoading] = useState(true);

  const [pageError, setPageError] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    setLoading(true);
    setPageError("");

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        throw authError;
      }

      if (!user) {
        router.push("/signin");
        return;
      }

      setAuthUser(user);

      const [profileResult, bankResult, campaignResult] = await Promise.all([
        supabase
          .from("users")
          .select(
            `
            id,
            full_name,
            display_name,
            email,
            avatar_url,
            bio,
            country,
            profile_completion_percentage,
            created_at,
            updated_at
          `,
          )
          .eq("id", user.id)
          .maybeSingle(),

        supabase
          .from("campaign_bank_accounts")
          .select(
            `
            id,
            campaign_id,
            user_id,
            account_holder_name,
            account_number,
            account_type,
            bank_name,
            is_active,
            is_verified,
            created_at,
            updated_at
          `,
          )
          .eq("user_id", user.id)
          .order("updated_at", {
            ascending: false,
          }),

        supabase
          .from("campaigns")
          .select(
            `
            id,
            title,
            status,
            created_at
          `,
          )
          .eq("creator_id", user.id)
          .order("updated_at", {
            ascending: false,
          }),
      ]);

      if (profileResult.error) {
        console.error("Profile load error:", profileResult.error);
      }

      if (bankResult.error) {
        console.error("Bank load error:", bankResult.error);
      }

      if (campaignResult.error) {
        console.error("Campaign load error:", campaignResult.error);
      }

      const fallbackProfile = {
        id: user.id,
        full_name: user.user_metadata?.full_name || "",
        display_name: user.user_metadata?.display_name || "",
        email: user.email || "",
        avatar_url: user.user_metadata?.avatar_url || "",
        bio: user.user_metadata?.bio || "",
        country: user.user_metadata?.country || "",
        profile_completion_percentage: null,
      };

      setProfile(profileResult.data || fallbackProfile);

      setBankAccounts(bankResult.data || []);

      setCampaigns(campaignResult.data || []);
    } catch (error) {
      console.error("Settings load error:", error);

      setPageError(error?.message || "Unable to load your settings.");
    } finally {
      setLoading(false);
    }
  }

  const firstName = useMemo(() => {
    const value =
      profile?.display_name ||
      profile?.full_name ||
      authUser?.email?.split("@")[0] ||
      "User";

    return value.trim().split(" ")[0];
  }, [profile, authUser]);

  if (loading) {
    return (
      <div className="settings-page settings-page--loading">
        <div className="settings-spinner" />
        <p>Loading your settings...</p>
      </div>
    );
  }

  if (pageError) {
    return (
      <div className="settings-page">
        <div className="settings-error-card">
          <h1>Unable to load settings</h1>

          <p>{pageError}</p>

          <button
            type="button"
            className="settings-primary-btn"
            onClick={loadSettings}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-page">
      {/* HEADER */}

      <section className="settings-header">
        <div>
          <h1>Settings</h1>

          <p>Manage your Fundu account, profile, and campaign bank details.</p>
        </div>
      </section>

      <div className="settings-layout">
        {/* SETTINGS NAV */}

        <aside className="settings-directory">
          <div className="settings-user-card">
            <Avatar
              src={profile?.avatar_url}
              name={profile?.display_name || profile?.full_name || firstName}
            />

            <div className="settings-user-card__text">
              <strong>
                {profile?.display_name || profile?.full_name || firstName}
              </strong>

              <span>{profile?.email || authUser?.email}</span>
            </div>
          </div>

          <nav className="settings-tabs">
            {SETTINGS_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`settings-tab ${
                  activeTab === tab.key ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                <div>
                  <strong>{tab.label}</strong>

                  <span>{tab.description}</span>
                </div>
              </button>
            ))}
          </nav>

          <button
            type="button"
            className="settings-logout-btn"
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/");
            }}
          >
            Log out
          </button>
        </aside>

        {/* CONTENT */}

        <main className="settings-content">
          {activeTab === "profile" && (
            <ProfileSettings
              authUser={authUser}
              profile={profile}
              onSaved={loadSettings}
            />
          )}

          {activeTab === "bank" && (
            <BankSettings
              user={authUser}
              bankAccounts={bankAccounts}
              campaigns={campaigns}
              onSaved={loadSettings}
            />
          )}

          {activeTab === "notifications" && <NotificationSettings />}
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   PROFILE
========================================================= */

function ProfileSettings({ authUser, profile, onSaved }) {
  const fileInputRef = useRef(null);

  const [editing, setEditing] = useState(false);

  const [saving, setSaving] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    displayName: "",
    email: "",
    bio: "",
    country: "",
    avatarUrl: "",
  });

  useEffect(() => {
    setFormData({
      fullName: profile?.full_name || "",
      displayName: profile?.display_name || "",
      email: profile?.email || authUser?.email || "",
      bio: profile?.bio || "",
      country: profile?.country || "",
      avatarUrl: profile?.avatar_url || "",
    });
  }, [profile, authUser]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleAvatarUpload(event) {
    const file = event.target.files?.[0];

    if (!file || !authUser?.id) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB.");
      return;
    }

    setUploading(true);

    try {
      const extension = file.name.split(".").pop();

      const filePath = `${authUser.id}/${authUser.id}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

      const publicUrl = `${data.publicUrl}?t=${Date.now()}`;

      setFormData((current) => ({
        ...current,
        avatarUrl: publicUrl,
      }));
    } catch (error) {
      console.error("Avatar upload error:", error);

      alert(error?.message || "Avatar upload failed.");
    } finally {
      setUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  async function handleSave() {
    if (!editing) {
      setEditing(true);
      return;
    }

    if (!formData.fullName.trim()) {
      alert("Please enter your full name.");
      return;
    }

    setSaving(true);

    try {
      const updates = {
        full_name: formData.fullName.trim(),
        display_name: formData.displayName.trim() || null,
        bio: formData.bio.trim() || null,
        country: formData.country.trim() || null,
        avatar_url: formData.avatarUrl || null,
        updated_at: new Date().toISOString(),
      };

      const { error: profileError } = await supabase
        .from("users")
        .update(updates)
        .eq("id", authUser.id);

      if (profileError) {
        throw profileError;
      }

      const { error: authError } = await supabase.auth.updateUser({
        data: {
          full_name: updates.full_name,
          display_name: updates.display_name,
          bio: updates.bio,
          country: updates.country,
          avatar_url: updates.avatar_url,
        },
      });

      if (authError) {
        throw authError;
      }

      setEditing(false);

      await onSaved();

      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Profile update error:", error);

      alert(error?.message || "Profile update failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="settings-panel">
      <div className="settings-panel-header">
        <div>
          <h2>Profile</h2>

          <p>Update your personal information and profile picture.</p>
        </div>

        <button
          type="button"
          className={editing ? "settings-primary-btn" : "settings-outline-btn"}
          onClick={handleSave}
          disabled={saving || uploading}
        >
          {saving ? "Saving..." : editing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      <div className="settings-profile-avatar-row">
        <div className="settings-avatar-large">
          {uploading ? (
            <span>Uploading...</span>
          ) : formData.avatarUrl ? (
            <img src={formData.avatarUrl} alt="Profile" />
          ) : (
            <span>
              {getInitials(formData.displayName || formData.fullName)}
            </span>
          )}
        </div>

        <div className="settings-profile-avatar-copy">
          <strong>Profile photo</strong>

          <p>JPG, PNG or WEBP. Maximum size 5MB.</p>

          {editing && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarUpload}
              />

              <button
                type="button"
                className="settings-text-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                Change photo
              </button>
            </>
          )}
        </div>
      </div>

      <div className="settings-form-grid">
        <SettingsField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          disabled={!editing}
          placeholder="Enter your full name"
        />

        <SettingsField
          label="Display Name"
          name="displayName"
          value={formData.displayName}
          onChange={handleChange}
          disabled={!editing}
          placeholder="How should Fundu address you?"
        />

        <SettingsField
          label="Email"
          name="email"
          value={formData.email}
          disabled
          placeholder=""
        />

        <SettingsField
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          disabled={!editing}
          placeholder="Nigeria"
        />

        <SettingsField
          label="Bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          disabled={!editing}
          placeholder="Tell people a little about yourself"
          textarea
          fullWidth
        />
      </div>

      <div className="settings-info-note">
        Your profile information may appear on campaigns you create.
      </div>
    </section>
  );
}

/* =========================================================
   BANK ACCOUNT
========================================================= */

function BankSettings({ user, bankAccounts, campaigns, onSaved }) {
  const activeBank =
    bankAccounts.find((item) => item.is_active) || bankAccounts[0] || null;

  const [editing, setEditing] = useState(!activeBank);

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    accountType: "",
    campaignId: "",
  });

  useEffect(() => {
    setFormData({
      bankName: activeBank?.bank_name || "",
      accountHolderName: activeBank?.account_holder_name || "",
      accountNumber: activeBank?.account_number || "",
      accountType: activeBank?.account_type || "",
      campaignId: activeBank?.campaign_id || campaigns[0]?.id || "",
    });

    setEditing(!activeBank);
  }, [activeBank?.id, campaigns]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSave() {
    if (!editing) {
      setEditing(true);
      return;
    }

    if (
      !formData.bankName.trim() ||
      !formData.accountHolderName.trim() ||
      !formData.accountNumber.trim()
    ) {
      alert("Please complete the bank name, account name, and account number.");
      return;
    }

    if (!formData.campaignId) {
      alert(
        "You need at least one campaign before a campaign bank account can be saved.",
      );
      return;
    }

    setSaving(true);

    try {
      const payload = {
        user_id: user.id,
        campaign_id: formData.campaignId,
        bank_name: formData.bankName.trim(),
        account_holder_name: formData.accountHolderName.trim(),
        account_number: formData.accountNumber.trim(),
        account_type: formData.accountType.trim() || null,
        is_active: true,
        updated_at: new Date().toISOString(),
      };

      if (activeBank?.id) {
        const { error } = await supabase
          .from("campaign_bank_accounts")
          .update(payload)
          .eq("id", activeBank.id);

        if (error) {
          throw error;
        }
      } else {
        const { error } = await supabase.from("campaign_bank_accounts").insert({
          ...payload,
          created_at: new Date().toISOString(),
        });

        if (error) {
          throw error;
        }
      }

      setEditing(false);

      await onSaved();

      alert("Bank details saved successfully.");
    } catch (error) {
      console.error("Bank save error:", error);

      alert(error?.message || "Unable to save bank details.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="settings-panel">
      <div className="settings-panel-header">
        <div>
          <h2>Bank Account</h2>

          <p>
            Supporters send campaign contributions directly to this account.
          </p>
        </div>

        <button
          type="button"
          className={editing ? "settings-primary-btn" : "settings-outline-btn"}
          onClick={handleSave}
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : editing
              ? "Save Bank Details"
              : "Edit Bank Details"}
        </button>
      </div>

      <div className="settings-bank-warning">
        Fundu does not receive or hold campaign funds. Supporters transfer money
        directly to the bank details you provide.
      </div>

      {campaigns.length === 0 ? (
        <div className="settings-empty-card">
          <h3>Create a campaign first</h3>

          <p>
            Bank accounts are currently attached to campaigns, so you need a
            campaign before adding bank details.
          </p>

          <Link href="/create-campaign" className="settings-primary-btn">
            Create Campaign
          </Link>
        </div>
      ) : (
        <div className="settings-form-grid">
          <label className="settings-field">
            <span>Campaign</span>

            <select
              name="campaignId"
              value={formData.campaignId}
              onChange={handleChange}
              disabled={!editing || Boolean(activeBank)}
            >
              {campaigns.map((campaign) => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.title}
                </option>
              ))}
            </select>
          </label>

          <SettingsField
            label="Bank Name"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            disabled={!editing}
            placeholder="e.g. GTBank"
          />

          <SettingsField
            label="Account Name"
            name="accountHolderName"
            value={formData.accountHolderName}
            onChange={handleChange}
            disabled={!editing}
            placeholder="Account holder name"
          />

          <SettingsField
            label="Account Number"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            disabled={!editing}
            placeholder="10-digit account number"
            inputMode="numeric"
          />

          <SettingsField
            label="Account Type"
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            disabled={!editing}
            placeholder="Savings or Current"
          />
        </div>
      )}

      {activeBank && (
        <div className="settings-bank-status">
          <div>
            <span>Current status</span>

            <strong>{activeBank.is_active ? "Active" : "Inactive"}</strong>
          </div>

          <div>
            <span>Verification</span>

            <strong>
              {activeBank.is_verified ? "Verified" : "Not verified"}
            </strong>
          </div>
        </div>
      )}
    </section>
  );
}

/* =========================================================
   NOTIFICATIONS
========================================================= */

function NotificationSettings() {
  return (
    <section className="settings-panel">
      <div className="settings-panel-header">
        <div>
          <h2>Notifications</h2>

          <p>Choose which Fundu alerts you want to receive.</p>
        </div>
      </div>

      <div className="settings-empty-card">
        <h3>Notification preferences are coming next</h3>

        <p>
          The current database does not have a dedicated notification
          preferences table yet, so we shouldn&apos;t save fake settings.
        </p>
      </div>
    </section>
  );
}

/* =========================================================
   FIELD
========================================================= */

function SettingsField({
  label,
  fullWidth = false,
  textarea = false,
  ...props
}) {
  return (
    <label
      className={`settings-field ${fullWidth ? "settings-field--full" : ""}`}
    >
      <span>{label}</span>

      {textarea ? <textarea {...props} rows={5} /> : <input {...props} />}
    </label>
  );
}

/* =========================================================
   AVATAR
========================================================= */

function Avatar({ src, name }) {
  return (
    <div className="settings-avatar-small">
      {src ? (
        <img src={src} alt={name || "Profile"} />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
}

function getInitials(name) {
  if (!name) {
    return "U";
  }

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((item) => item.charAt(0).toUpperCase())
    .join("");
}
