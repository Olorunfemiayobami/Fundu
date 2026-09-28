"use client";

import LoadingScreen from "@/components/feedback/LoadingScreen";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import SettingsShell from "./SettingsShell";
import ProfileSettings from "./ProfileSettings";
import SecuritySettings from "./SecuritySettings";
import "@/styles/settings.css";
import "@/styles/settings-layout.css";

export default function SettingsScreen({ section = null }) {
  const router = useRouter();
  const activeSection = section || "profile";
  const [logoutError, setLogoutError] = useState("");

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
            end_date,
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
      <LoadingScreen variant="list" label="Loading your settings" />
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
    <SettingsShell
      section={section}
      name={profile?.full_name || profile?.display_name || firstName}
      email={authUser?.email || profile?.email || ""}
      avatar={<Avatar src={profile?.avatar_url} name={profile?.full_name || firstName} />}
      logoutError={logoutError}
      onLogout={async () => {
        setLogoutError("");
        const { error } = await supabase.auth.signOut();
        if (error) {
          setLogoutError("Unable to log out. Please try again.");
          return;
        }
        router.replace("/");
        router.refresh();
      }}
    >
      {activeSection === "profile" && <ProfileSettings authUser={authUser} profile={profile} campaignCount={campaigns.length} onSaved={(updates, user) => { setProfile((current) => ({ ...current, ...updates })); if (user) setAuthUser(user); }} />}
      {activeSection === "bank-account" && <BankSettings user={authUser} bankAccounts={bankAccounts} campaigns={campaigns} onSaved={loadSettings} />}
      {activeSection === "payment-methods" && (
        <section className="settings-panel">
          <div className="settings-panel-header"><div><h2>Payment methods</h2><p>The ways supporters can pay you directly.</p></div></div>
          <Link href="/settings/bank-account">Manage existing bank accounts</Link>
        </section>
      )}
      {activeSection === "security" && <SecuritySettings authUser={authUser} campaignCount={campaigns.length} liveCount={campaigns.filter((campaign) => campaign.status === "active" && new Date(campaign.end_date).getTime() > Date.now()).length} />}
    </SettingsShell>
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


