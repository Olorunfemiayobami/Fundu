"use client";

import React, { useEffect, useState } from "react";

import InputField from "@/components/ui/InputField";
import { supabase } from "@/lib/supabase";

/*
 * =========================================================
 * ICONS
 * =========================================================
 */

const SuccessCheck = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="#00A63E"
      strokeWidth="2"
      fill="#fff"
    />

    <path
      d="M8.99 11.99L10.99 13.99L14.99 9.99"
      stroke="#00A63E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ErrorCheck = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle cx="12" cy="12" r="10" stroke="#FB2C36" strokeWidth="2" />

    <path
      d="M15 9L9 15M9 9L15 15"
      stroke="#FB2C36"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle cx="12" cy="12" r="10" stroke="#2F80ED" strokeWidth="2" />

    <path
      d="M12 16V12M12 8H12.01"
      stroke="#2F80ED"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BankIcon = () => (
  <div className="bank-icon-wrapper">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M2 8.50391H22"
        stroke="#333333"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M6 16.5039H8"
        stroke="#333333"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M10.5 16.5039H14.5"
        stroke="#333333"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M6.44 3.50391H17.55C21.11 3.50391 22 4.38391 22 7.89391V16.1039C22 19.6139 21.11 20.4939 17.56 20.4939H6.44C2.89 20.5039 2 19.6239 2 16.1139V7.89391C2 4.38391 2.89 3.50391 6.44 3.50391Z"
        stroke="#333333"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

/*
 * =========================================================
 * BANK ACCOUNT MODAL
 * =========================================================
 */

function BankAccountModal({
  isOpen,
  onClose,
  onSave,
  existingDetails,
  savedAccount,
  isLoadingSavedAccount,
  savedAccountError,
  isSavingBank,
}) {
  const [bankDetails, setBankDetails] = useState({
    accountName: "",
    bankName: "",
    accountNumber: "",
    confirmOwnership: false,
  });

  const [useSavedAccount, setUseSavedAccount] = useState(false);

  const [errors, setErrors] = useState({});

  /*
   * =========================================================
   * RESET MODAL WHEN OPENED
   * =========================================================
   */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setBankDetails({
      accountName: existingDetails?.accountName || "",

      bankName: existingDetails?.bankName || "",

      accountNumber: existingDetails?.accountNumber || "",

      confirmOwnership: false,
    });

    setUseSavedAccount(false);

    setErrors({});
  }, [isOpen, existingDetails]);

  if (!isOpen) {
    return null;
  }

  /*
   * =========================================================
   * BANKS
   * =========================================================
   */

  const nigerianBanks = [
    {
      label: "Access Bank",
      value: "Access Bank",
    },
    {
      label: "First Bank",
      value: "First Bank",
    },
    {
      label: "GTBank",
      value: "GTBank",
    },
    {
      label: "UBA",
      value: "UBA",
    },
    {
      label: "Zenith Bank",
      value: "Zenith Bank",
    },
    {
      label: "Kuda Bank",
      value: "Kuda Bank",
    },
    {
      label: "Opay",
      value: "Opay",
    },
  ];

  /*
   * =========================================================
   * INPUT CHANGE
   * =========================================================
   */

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    let nextValue = type === "checkbox" ? checked : value;

    if (name === "accountNumber") {
      nextValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setBankDetails((previous) => ({
      ...previous,
      [name]: nextValue,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
      save: "",
    }));
  };

  /*
   * =========================================================
   * SAVED BANK TOGGLE
   * =========================================================
   */

  const handleSavedAccountToggle = (event) => {
    const checked = event.target.checked;

    setUseSavedAccount(checked);

    if (checked && savedAccount) {
      setBankDetails((previous) => ({
        ...previous,

        accountName: savedAccount.accountName || "",

        bankName: savedAccount.bankName || "",

        accountNumber: savedAccount.accountNumber || "",

        confirmOwnership: false,
      }));

      setErrors({});
      return;
    }

    if (!checked) {
      setBankDetails((previous) => ({
        ...previous,

        accountName: existingDetails?.accountName || "",

        bankName: existingDetails?.bankName || "",

        accountNumber: existingDetails?.accountNumber || "",

        confirmOwnership: false,
      }));

      setErrors({});
    }
  };

  /*
   * =========================================================
   * VALIDATION
   * =========================================================
   */

  const validateBankAccount = () => {
    const nextErrors = {};

    if (!bankDetails.accountName.trim()) {
      nextErrors.accountName = "Enter the account holder name.";
    }

    if (!bankDetails.bankName) {
      nextErrors.bankName = "Select your bank.";
    }

    if (bankDetails.accountNumber.length !== 10) {
      nextErrors.accountNumber = "Enter a valid 10-digit account number.";
    }

    if (!bankDetails.confirmOwnership) {
      nextErrors.confirmOwnership =
        "Confirm that you are authorized to use this bank account.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  /*
   * =========================================================
   * SAVE
   * =========================================================
   */

  const handleSave = async () => {
    if (!validateBankAccount()) {
      return;
    }

    const result = await onSave(bankDetails);

    if (!result) {
      setErrors((previous) => ({
        ...previous,

        save: "We couldn't save this bank account. Please try again.",
      }));
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={() => {
        if (!isSavingBank) {
          onClose();
        }
      }}
    >
      <div
        className="payout-modal-content bank-account-modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        {/* HEADER */}

        <div className="modal-header">
          <div>
            <h3>
              {existingDetails ? "Update Bank Account" : "Add Bank Account"}
            </h3>

            <p className="bank-modal-description">
              This is where supporters will send contributions to your campaign.
            </p>
          </div>

          <button
            type="button"
            className="bank-modal-close"
            onClick={onClose}
            disabled={isSavingBank}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M15 5L5 15M5 5L15 15"
                stroke="#0A0A0A"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="bank-modal-fields">
          {/* SAVED BANK */}

          <div className="saved-bank-toggle-section">
            <div className="saved-bank-toggle-copy">
              <strong>Use my saved bank account</strong>

              <p>Autofill the bank details saved in your Fundu settings.</p>
            </div>

            <label className="saved-bank-toggle">
              <input
                type="checkbox"
                checked={useSavedAccount}
                onChange={handleSavedAccountToggle}
                disabled={isLoadingSavedAccount || !savedAccount}
              />

              <span className="saved-bank-toggle-slider" />
            </label>
          </div>

          {isLoadingSavedAccount && (
            <p className="saved-bank-helper">
              Checking your saved bank details...
            </p>
          )}

          {!isLoadingSavedAccount && savedAccount && (
            <div className="saved-bank-preview">
              <BankIcon />

              <div>
                <strong>{savedAccount.bankName}</strong>

                <span>{savedAccount.accountName}</span>

                <span>
                  ••••••
                  {savedAccount.accountNumber.slice(-4)}
                </span>
              </div>
            </div>
          )}

          {!isLoadingSavedAccount && !savedAccount && !savedAccountError && (
            <p className="saved-bank-helper">
              You do not have saved bank details yet. You can enter them below.
            </p>
          )}

          {savedAccountError && (
            <p className="form-field-error">{savedAccountError}</p>
          )}

          {/* ACCOUNT HOLDER */}

          <div>
            <InputField
              label="Account Holder Name"
              name="accountName"
              placeholder="Full name as on the account"
              value={bankDetails.accountName}
              onChange={handleInputChange}
              required
            />

            {errors.accountName && (
              <p className="form-field-error">{errors.accountName}</p>
            )}
          </div>

          {/* BANK NAME */}

          <div>
            <InputField
              label="Bank Name"
              name="bankName"
              isSelect
              options={nigerianBanks}
              placeholder="Select your bank"
              value={bankDetails.bankName}
              onChange={handleInputChange}
              required
            />

            {errors.bankName && (
              <p className="form-field-error">{errors.bankName}</p>
            )}
          </div>

          {/* ACCOUNT NUMBER */}

          <div>
            <InputField
              label="Account Number"
              name="accountNumber"
              placeholder="0123456789"
              value={bankDetails.accountNumber}
              onChange={handleInputChange}
              inputMode="numeric"
              required
            />

            <p className="bank-account-count">
              {bankDetails.accountNumber.length}
              /10 digits
            </p>

            {errors.accountNumber && (
              <p className="form-field-error">{errors.accountNumber}</p>
            )}
          </div>

          {/* OWNERSHIP */}

          <div>
            <label className="bank-ownership-check">
              <input
                type="checkbox"
                name="confirmOwnership"
                checked={bankDetails.confirmOwnership}
                onChange={handleInputChange}
              />

              <span>
                I confirm that I own or am authorized to use this bank account
                to receive campaign contributions.
              </span>
            </label>

            {errors.confirmOwnership && (
              <p className="form-field-error">{errors.confirmOwnership}</p>
            )}
          </div>

          {errors.save && <p className="form-field-error">{errors.save}</p>}

          <button
            type="button"
            className="btn-payout-save"
            onClick={handleSave}
            disabled={isSavingBank}
          >
            {isSavingBank
              ? "Saving..."
              : existingDetails
                ? "Update Bank Account"
                : "Save Bank Account"}
          </button>
        </div>
      </div>
    </div>
  );
}

/*
 * =========================================================
 * PUBLISH CAMPAIGN
 * =========================================================
 */

export default function PublishCampaign({
  onBack,
  onPublish,
  onSaveAndExit,
  isSaving,
  duration,
  campaignId,
  campaignData,
  setCampaignData,
}) {
  const [resolvedCampaignId, setResolvedCampaignId] = useState(
    campaignId || null,
  );

  const [agreed, setAgreed] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  /*
   * =========================================================
   * VISIBILITY
   * =========================================================
   */

  const isPublic = campaignData?.isPublic !== false;

  const handleVisibilityChange = (nextIsPublic) => {
    if (!setCampaignData) {
      return;
    }

    setCampaignData((current) => ({
      ...current,

      isPublic: nextIsPublic,
    }));
  };

  /*
   * Bank account attached specifically to the
   * campaign currently being published.
   */

  const [savedBankAccount, setSavedBankAccount] = useState(null);

  const [reusableBankAccount, setReusableBankAccount] = useState(null);

  const [isLoadingBank, setIsLoadingBank] = useState(false);

  const [isLoadingSavedAccount, setIsLoadingSavedAccount] = useState(false);

  const [savedAccountError, setSavedAccountError] = useState("");

  const [isSavingBank, setIsSavingBank] = useState(false);

  const [publishErrors, setPublishErrors] = useState({
    bank: "",
    terms: "",
  });

  /*
   * =========================================================
   * ACTIVITY HELPER
   * =========================================================
   */

  const addBankActivity = async ({
    userId,
    activityCampaignId,
    activityType,
    title,
    description,
    campaignTitle,
  }) => {
    if (!userId || !activityCampaignId) {
      return false;
    }

    try {
      const { error } = await supabase.from("activity_feed").insert({
        user_id: userId,

        campaign_id: activityCampaignId,

        activity_type: activityType,

        title,

        description,

        metadata: {
          campaign_title: campaignTitle,
        },

        /*
         * Adding or changing a bank account is an action
         * performed by the organizer.
         *
         * It belongs in Activity history but should not create
         * an unread notification.
         */

        is_notification: false,

        is_read: true,

        read_at: new Date().toISOString(),
      });

      if (error) {
        console.error(`Could not create ${activityType} activity:`, error);

        return false;
      }

      return true;
    } catch (error) {
      console.error(`Could not create ${activityType} activity:`, error);

      return false;
    }
  };

  /*
   * =========================================================
   * RESOLVE CAMPAIGN ID
   * =========================================================
   */

  useEffect(() => {
    let nextCampaignId = campaignId || null;

    if (!nextCampaignId && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);

      nextCampaignId = params.get("campaign") || params.get("id") || null;
    }

    console.log("Resolved campaign ID:", {
      campaignIdProp: campaignId,

      url: typeof window !== "undefined" ? window.location.href : "",

      resolvedCampaignId: nextCampaignId,
    });

    setResolvedCampaignId(nextCampaignId);
  }, [campaignId]);

  /*
   * =========================================================
   * LOAD CURRENT CAMPAIGN BANK ACCOUNT
   * =========================================================
   */

  useEffect(() => {
    if (!resolvedCampaignId) {
      setIsLoadingBank(false);
      return;
    }

    let mounted = true;

    async function loadBankAccount() {
      try {
        setIsLoadingBank(true);

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
          console.error("Could not get authenticated user:", authError);

          return;
        }

        if (!user) {
          console.error(
            "No authenticated user found while loading bank account.",
          );

          return;
        }

        const { data, error } = await supabase
          .from("campaign_bank_accounts")
          .select(
            `
              id,
              account_holder_name,
              account_number,
              bank_name,
              campaign_id,
              user_id,
              is_active
            `,
          )
          .eq("campaign_id", resolvedCampaignId)
          .eq("user_id", user.id)
          .eq("is_active", true)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (mounted) {
          if (data) {
            setSavedBankAccount({
              id: data.id,

              accountName: data.account_holder_name || "",

              accountNumber: data.account_number || "",

              bankName: data.bank_name || "",
            });
          } else {
            setSavedBankAccount(null);
          }
        }
      } catch (error) {
        console.error("Could not load campaign bank account:", error);
      } finally {
        if (mounted) {
          setIsLoadingBank(false);
        }
      }
    }

    loadBankAccount();

    return () => {
      mounted = false;
    };
  }, [resolvedCampaignId]);

  /*
   * =========================================================
   * LOAD SAVED / REUSABLE BANK ACCOUNT
   * =========================================================
   */

  useEffect(() => {
    let mounted = true;

    async function loadReusableBankAccount() {
      try {
        setIsLoadingSavedAccount(true);
        setSavedAccountError("");

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
          throw authError;
        }

        if (!user) {
          if (mounted) {
            setReusableBankAccount(null);
          }

          return;
        }

        const { data, error } = await supabase
          .from("campaign_bank_accounts")
          .select(
            `
              id,
              campaign_id,
              user_id,
              account_holder_name,
              account_number,
              bank_name,
              account_type,
              is_active,
              updated_at
            `,
          )
          .eq("user_id", user.id)
          .eq("is_active", true)
          .order("updated_at", {
            ascending: false,
          })
          .limit(1)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (!mounted) {
          return;
        }

        if (!data) {
          setReusableBankAccount(null);

          return;
        }

        setReusableBankAccount({
          id: data.id,

          campaignId: data.campaign_id,

          accountName: data.account_holder_name || "",

          accountNumber: data.account_number || "",

          bankName: data.bank_name || "",

          accountType: data.account_type || "",
        });
      } catch (error) {
        console.error("Could not load saved bank account:", error);

        if (mounted) {
          setReusableBankAccount(null);

          setSavedAccountError(
            "We couldn't load your saved bank details. You can still enter them manually.",
          );
        }
      } finally {
        if (mounted) {
          setIsLoadingSavedAccount(false);
        }
      }
    }

    loadReusableBankAccount();

    return () => {
      mounted = false;
    };
  }, []);

  /*
   * =========================================================
   * SAVE BANK ACCOUNT
   * =========================================================
   */

  const handleSaveBankAccount = async (details) => {
    let activeCampaignId = resolvedCampaignId || campaignId || null;

    if (!activeCampaignId && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);

      activeCampaignId = params.get("campaign") || params.get("id") || null;
    }

    console.log("Bank account campaign ID:", {
      campaignIdProp: campaignId,

      resolvedCampaignId,

      currentUrl: typeof window !== "undefined" ? window.location.href : "",

      activeCampaignId,
    });

    if (!activeCampaignId) {
      console.error("Campaign ID is missing. Bank account cannot be saved.");

      return false;
    }

    setIsSavingBank(true);

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        console.error("Bank account authentication error:", authError);

        return false;
      }

      if (!user) {
        console.error("No authenticated user found while saving bank account.");

        return false;
      }

      /*
       * Remember whether the campaign already had a bank
       * account BEFORE we save the new details.
       *
       * This determines whether the activity is:
       *
       * bank_account_added
       * or
       * bank_account_updated
       */

      const isUpdatingExistingBankAccount = Boolean(savedBankAccount?.id);

      const bankPayload = {
        campaign_id: activeCampaignId,

        user_id: user.id,

        account_holder_name: details.accountName.trim(),

        account_number: details.accountNumber,

        bank_name: details.bankName,

        account_type: "bank",

        is_active: true,
      };

      console.log("Saving bank account:", {
        ...bankPayload,

        account_number: "**********",
      });

      let savedRow;

      if (isUpdatingExistingBankAccount) {
        const { data, error } = await supabase
          .from("campaign_bank_accounts")
          .update({
            ...bankPayload,

            updated_at: new Date().toISOString(),
          })
          .eq("id", savedBankAccount.id)
          .eq("user_id", user.id)
          .select()
          .single();

        if (error) {
          console.error("Bank account update error:", error);

          throw error;
        }

        savedRow = data;
      } else {
        const { data, error } = await supabase
          .from("campaign_bank_accounts")
          .insert({
            ...bankPayload,

            created_at: new Date().toISOString(),

            updated_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (error) {
          console.error("Bank account insert error:", error);

          throw error;
        }

        savedRow = data;
      }

      if (!savedRow) {
        console.error("Bank account save returned no row.");

        return false;
      }

      console.log("Bank account saved successfully:", savedRow.id);

      /*
       * =========================================================
       * BANK ACCOUNT ACTIVITY
       * =========================================================
       */

      const campaignTitle = campaignData?.title?.trim() || "your campaign";

      if (isUpdatingExistingBankAccount) {
        await addBankActivity({
          userId: user.id,

          activityCampaignId: activeCampaignId,

          activityType: "bank_account_updated",

          title: "Bank account updated",

          description: `You updated the bank account for ${campaignTitle}`,

          campaignTitle,
        });
      } else {
        await addBankActivity({
          userId: user.id,

          activityCampaignId: activeCampaignId,

          activityType: "bank_account_added",

          title: "Bank account added",

          description: `You added a bank account for ${campaignTitle}`,

          campaignTitle,
        });
      }

      setResolvedCampaignId(activeCampaignId);

      const normalizedSavedAccount = {
        id: savedRow.id,

        accountName: savedRow.account_holder_name || "",

        accountNumber: savedRow.account_number || "",

        bankName: savedRow.bank_name || "",
      };

      setSavedBankAccount(normalizedSavedAccount);

      setReusableBankAccount({
        ...normalizedSavedAccount,

        campaignId: activeCampaignId,

        accountType: savedRow.account_type || "bank",
      });

      setPublishErrors((previous) => ({
        ...previous,
        bank: "",
      }));

      setIsModalOpen(false);

      return true;
    } catch (error) {
      console.error("Could not save bank account:", error);

      return false;
    } finally {
      setIsSavingBank(false);
    }
  };

  /*
   * =========================================================
   * HOSTING FEE
   * =========================================================
   */

  const promoCode = "EARLYACCESS2026";

  const isPromoApplied = true;

  const feePerDay = 200;

  const campaignEndDate = duration ? new Date(`${duration}T00:00:00`) : null;

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const durationInDays =
    campaignEndDate && !Number.isNaN(campaignEndDate.getTime())
      ? Math.max(
          1,

          Math.ceil(
            (campaignEndDate.getTime() - today.getTime()) /
              (1000 * 60 * 60 * 24),
          ),
        )
      : 1;

  const normalHostingFee = durationInDays * feePerDay;

  const totalFee = isPromoApplied ? 0 : normalHostingFee;

  /*
   * =========================================================
   * PUBLISH VALIDATION
   * =========================================================
   */

  const handlePublishClick = () => {
    const nextErrors = {
      bank: "",
      terms: "",
    };

    if (!savedBankAccount) {
      nextErrors.bank =
        "You must add a bank account before publishing your campaign.";
    }

    if (!agreed) {
      nextErrors.terms =
        "You must confirm the information is accurate and agree to the Terms of Service before publishing.";
    }

    setPublishErrors(nextErrors);

    if (nextErrors.bank || nextErrors.terms) {
      requestAnimationFrame(() => {
        document.querySelector(".form-field-error")?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });

      return;
    }

    onPublish({
      accountName: savedBankAccount.accountName,

      accountNumber: savedBankAccount.accountNumber,

      bankName: savedBankAccount.bankName,
    });
  };

  /*
   * =========================================================
   * UI
   * =========================================================
   */

  return (
    <div className="form-container-main publish-form-container">
      {/* BANNER */}

      <div className="publish-banner-promo">
        <h3 className="banner-title-text">You're almost live! 🎉</h3>

        <p className="banner-body-text">
          Your campaign is ready to be published and shared.
        </p>
      </div>

      {/* CAMPAIGN STATUS */}

      <div className="publish-status-card">
        <div className="publish-details-header">
          <div className="status-flex-row">
            <SuccessCheck />

            <div className="status-text-stack">
              <h4 className="status-label-title">Campaign details</h4>

              <p className="status-label-sub">
                Your campaign information is complete.
              </p>
            </div>
          </div>
        </div>

        {/* BANK */}

        <div className="payment-method-footer">
          <div className="status-flex-row">
            {savedBankAccount ? <SuccessCheck /> : <ErrorCheck />}

            <div className="status-text-stack">
              <h4 className="status-label-title">Bank Account</h4>

              <p className="status-label-sub">
                Add the bank account where supporters should send contributions.
              </p>
            </div>
          </div>

          {isLoadingBank && (
            <p className="bank-loading-text">Checking bank account...</p>
          )}

          {savedBankAccount && (
            <div className="saved-bank-account-card">
              <div className="saved-bank-account-left">
                <BankIcon />

                <div className="status-text-stack">
                  <h4 className="status-label-title">
                    {savedBankAccount.bankName}
                  </h4>

                  <p className="status-label-sub">
                    {savedBankAccount.accountName}
                  </p>

                  <p className="status-label-sub">
                    ••••••
                    {savedBankAccount.accountNumber.slice(-4)}
                  </p>
                </div>
              </div>

              <SuccessCheck />
            </div>
          )}

          {publishErrors.bank && (
            <p className="form-field-error publish-bank-error">
              {publishErrors.bank}
            </p>
          )}

          <button
            type="button"
            className="publish-bank-button"
            onClick={() => {
              setPublishErrors((previous) => ({
                ...previous,
                bank: "",
              }));

              setIsModalOpen(true);
            }}
          >
            {savedBankAccount ? "Update Bank Account" : "Add Bank Account"}
          </button>
        </div>
      </div>

      {/* =====================================================
          CAMPAIGN VISIBILITY
      ====================================================== */}

      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "12px",
          padding: "24px",
        }}
      >
        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <h3
            style={{
              margin: "0 0 6px",
              fontSize: "18px",
              fontWeight: "700",
              color: "#0F172A",
            }}
          >
            Campaign visibility
          </h3>

          <p
            style={{
              margin: 0,
              fontSize: "14px",
              lineHeight: "1.5",
              color: "#64748B",
            }}
          >
            Choose how people can discover your campaign.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: "12px",
          }}
        >
          {/* PUBLIC */}

          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              padding: "16px",
              border: isPublic ? "1.5px solid #1E807F" : "1px solid #E2E8F0",
              borderRadius: "10px",
              background: isPublic ? "#F8FAFA" : "#FFFFFF",
              cursor: "pointer",
            }}
          >
            <input
              type="radio"
              name="campaignVisibility"
              checked={isPublic}
              onChange={() => handleVisibilityChange(true)}
              style={{
                marginTop: "3px",
                accentColor: "#1E807F",
              }}
            />

            <div>
              <strong
                style={{
                  display: "block",
                  fontSize: "15px",
                  color: "#0F172A",
                  marginBottom: "4px",
                }}
              >
                Public
              </strong>

              <span
                style={{
                  display: "block",
                  fontSize: "14px",
                  lineHeight: "1.5",
                  color: "#64748B",
                }}
              >
                Anyone can discover your campaign on Fundu and you can share its
                link anywhere.
              </span>
            </div>
          </label>

          {/* PRIVATE */}

          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              padding: "16px",
              border: !isPublic ? "1.5px solid #1E807F" : "1px solid #E2E8F0",
              borderRadius: "10px",
              background: !isPublic ? "#F8FAFA" : "#FFFFFF",
              cursor: "pointer",
            }}
          >
            <input
              type="radio"
              name="campaignVisibility"
              checked={!isPublic}
              onChange={() => handleVisibilityChange(false)}
              style={{
                marginTop: "3px",
                accentColor: "#1E807F",
              }}
            />

            <div>
              <strong
                style={{
                  display: "block",
                  fontSize: "15px",
                  color: "#0F172A",
                  marginBottom: "4px",
                }}
              >
                Private
              </strong>

              <span
                style={{
                  display: "block",
                  fontSize: "14px",
                  lineHeight: "1.5",
                  color: "#64748B",
                }}
              >
                Your campaign won't appear in Explore. People you share the
                campaign link with can still view it.
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* HOSTING FEE */}

      <div className="hosting-fee-card">
        <div className="hosting-fee-header">
          <SuccessCheck />

          <div>
            <span className="hosting-fee-title">Hosting fee</span>

            <span className="hosting-fee-description">
              Your campaign is hosted on Fundu for the duration you choose.
            </span>
          </div>
        </div>

        <div>
          <span className="hosting-pricing-label">Standard pricing</span>

          <div className="hosting-pricing-grid">
            <div className="hosting-pricing-item">
              <span>Hosting rate</span>

              <strong>₦200 / day</strong>
            </div>

            <div className="hosting-pricing-item">
              <span>Campaign duration</span>

              <strong>
                {durationInDays} {durationInDays === 1 ? "day" : "days"}
              </strong>
            </div>

            <div className="hosting-pricing-item">
              <span>Total hosting fee</span>

              <strong>₦{normalHostingFee.toLocaleString("en-NG")}</strong>
            </div>
          </div>
        </div>

        {isPromoApplied && (
          <div className="early-access-card">
            <span className="early-access-label">Early access offer</span>

            <div className="early-access-price-row">
              <span className="early-access-old-price">
                ₦{normalHostingFee.toLocaleString("en-NG")}
              </span>

              <span className="early-access-free-price">₦0</span>
            </div>

            <p className="early-access-description">
              Your early access promotion covers the full hosting fee for your
              campaign.
            </p>
          </div>
        )}

        {isPromoApplied && (
          <div className="promotion-section">
            <span className="promotion-title">Promotion applied</span>

            <div className="promotion-code-row">
              <strong>{promoCode}</strong>

              <span className="promotion-applied-badge">✓ Applied</span>
            </div>

            <p className="promotion-description">
              This promotion was automatically applied to your account. No
              action needed.
            </p>
          </div>
        )}

        <div className="hosting-total-card">
          <span className="hosting-total-label">Total to pay</span>

          <span className="hosting-total-amount">
            ₦{totalFee.toLocaleString("en-NG")}
          </span>

          <span className="hosting-total-note">Free during early access</span>
        </div>
      </div>

      {/* FUND FLOW NOTICE */}

      <div className="info-notice-box">
        <InfoIcon />

        <p className="info-notice-text">
          Fundu does not receive or hold campaign contributions. Supporters send
          contributions directly to the bank account you provide.
        </p>
      </div>

      {/* TERMS */}

      <div className="publish-terms-section">
        <div className="terms-container">
          <input
            type="checkbox"
            id="terms-check"
            checked={agreed}
            onChange={(event) => {
              const checked = event.target.checked;

              setAgreed(checked);

              if (checked) {
                setPublishErrors((previous) => ({
                  ...previous,
                  terms: "",
                }));
              }
            }}
          />

          <label htmlFor="terms-check" className="terms-label">
            I confirm all information is accurate and agree to{" "}
            <span className="terms-link">Terms of Service</span>
          </label>
        </div>

        {publishErrors.terms && (
          <p className="form-field-error">{publishErrors.terms}</p>
        )}
      </div>

      {/* BOTTOM NAVIGATION */}

      <div className="campaign-bottom-actions">
        <button
          type="button"
          className="campaign-action-save-exit"
          onClick={onSaveAndExit}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save & Exit"}
        </button>

        <div className="campaign-bottom-actions__right">
          <button
            type="button"
            className="campaign-action-secondary"
            onClick={onBack}
            disabled={isSaving}
          >
            Back to Preview
          </button>

          <button
            type="button"
            className="campaign-action-primary"
            onClick={handlePublishClick}
            disabled={isSaving || isLoadingBank}
          >
            {isSaving ? "Publishing..." : "Publish Campaign"}
          </button>
        </div>
      </div>

      {/* BANK MODAL */}

      <BankAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveBankAccount}
        existingDetails={savedBankAccount}
        savedAccount={reusableBankAccount}
        isLoadingSavedAccount={isLoadingSavedAccount}
        savedAccountError={savedAccountError}
        isSavingBank={isSavingBank}
      />
    </div>
  );
}
