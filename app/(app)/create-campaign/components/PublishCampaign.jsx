"use client";

import React, { useEffect, useState } from "react";

import CampaignStorageImage from "@/components/campaigns/CampaignStorageImage";
import ActionDialog from "@/components/feedback/ActionDialog";

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
    accountName: existingDetails?.accountName || "",
    bankName: existingDetails?.bankName || "",
    accountNumber: existingDetails?.accountNumber || "",
    confirmOwnership: false,
  });

  const [useSavedAccount, setUseSavedAccount] = useState(false);

  const [errors, setErrors] = useState({});

  /*
   * =========================================================
   * RESET MODAL WHEN OPENED
   * =========================================================
   */

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

        save: "We couldn't save your bank details. Nothing has changed yet. Check your connection and try again.",
      }));
    }
  };

  return (
    <ActionDialog open={isOpen} onClose={onClose} busy={isSavingBank} error={errors.save} title={existingDetails ? "Update bank details" : "Bank details"} description="Supporters will see these on the campaign page." icon="bank" tone="success" safeLabel="Cancel" actionLabel={errors.save ? "Retry save" : existingDetails ? "Update bank details" : "Save bank details"} busyLabel="Saving…" onAction={handleSave}>
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
                disabled={isSavingBank || isLoadingSavedAccount || !savedAccount}
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
              disabled={isSavingBank}
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
              disabled={isSavingBank}
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
              disabled={isSavingBank}
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
                disabled={isSavingBank}
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

        </div>
    </ActionDialog>
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
  publishError,
  duration,
  campaignId,
  campaignData,
  setCampaignData,
  onEditStep,
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

  const feePerDay = 100;

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

  const storyBlocks = campaignData?.storyBlocks || [];
  const photoCount = storyBlocks.reduce((count, block) => count + (Array.isArray(block.media) ? block.media.length : 0), 0);
  const cover = campaignData?.imagePreview || campaignData?.cover_image || campaignData?.image_url || campaignData?.preview_image || campaignData?.coverImage;
  const detailsComplete = Boolean(campaignData?.title?.trim() && campaignData?.category && Number(campaignData?.goal) > 0 && duration && cover);
  const storyComplete = storyBlocks.some(block => block.content?.trim() || block.media?.length || block.url?.trim());
  const completed = Number(detailsComplete) + Number(storyComplete) + Number(Boolean(savedBankAccount));
  const publishDisabled = isSaving || isLoadingBank || isSavingBank || !savedBankAccount || !agreed;
  const publishReason = publishError || (isSaving ? "Publishing your campaign…" : isLoadingBank ? "Checking bank account…" : isSavingBank ? "Saving bank account…" : !savedBankAccount && !agreed ? "Add a bank account and confirm to publish" : !savedBankAccount ? "Add a bank account to publish" : !agreed ? "Confirm the information to publish" : "");
  const money = value => "₦" + Number(value || 0).toLocaleString("en-NG");
  const openBank = () => { setPublishErrors(previous => ({ ...previous, bank: "" })); setIsModalOpen(true); };
  const editStep = step => onEditStep?.(step);

  return <section className="cw-publish">
    <div className="cw-publish-columns"><div className="cw-publish-main">
      <div className="cw-publish-heading"><h2>Publish your campaign</h2><p>A few last things, then your page goes live and you get a link to share.</p></div>
      <section className="cw-publish-checklist" aria-labelledby="cw-publish-checklist-title">
        <header><h3 id="cw-publish-checklist-title">Before you publish</h3><span className={completed === 3 ? "cw-publish-complete" : "cw-publish-incomplete"} role="status">{completed} of 3 done</span></header>
        <div className="cw-publish-check-row"><span className={detailsComplete ? "cw-publish-complete" : "cw-publish-incomplete"}>{detailsComplete ? <SuccessCheck /> : <ErrorCheck />}</span><div><h4>Campaign details</h4><p>{detailsComplete ? "Title, category, goal, end date and cover are complete." : "Add a title, category, goal, end date and cover."}</p></div><button type="button" className="cw-publish-edit" onClick={() => editStep(1)} disabled={isSaving}>Edit</button></div>
        <div className="cw-publish-check-row"><span className={storyComplete ? "cw-publish-complete" : "cw-publish-incomplete"}>{storyComplete ? <SuccessCheck /> : <ErrorCheck />}</span><div><h4>Story</h4><p>{storyBlocks.length} {storyBlocks.length === 1 ? "block" : "blocks"} with {photoCount} {photoCount === 1 ? "photo" : "photos"}.</p></div><button type="button" className="cw-publish-edit" onClick={() => editStep(2)} disabled={isSaving}>Edit</button></div>
        <div className="cw-publish-check-row cw-publish-bank"><span className={savedBankAccount ? "cw-publish-complete" : "cw-publish-incomplete"}>{isLoadingBank ? <span className="cw-saving-spinner" aria-label="Checking bank account" /> : savedBankAccount ? <SuccessCheck /> : <ErrorCheck />}</span><div><h4>Bank account</h4><p>{isLoadingBank ? "Checking bank account…" : savedBankAccount ? `${savedBankAccount.bankName} •••• ${savedBankAccount.accountNumber.slice(-4)}` : "Add the account supporters will send money to. It's shown on your public page."}</p>{savedBankAccount && <p>{savedBankAccount.accountName}</p>}{publishErrors.bank && <p className="form-field-error">{publishErrors.bank}</p>}</div><button type="button" className={savedBankAccount ? "cw-publish-edit" : "cw-publish-add-bank"} onClick={openBank} disabled={isLoadingBank || isSaving || isSavingBank}>{savedBankAccount ? "Change" : <><BankIcon /> Add bank account</>}</button></div>
      </section>
      <fieldset className="cw-publish-visibility"><legend>Who can find it?</legend><div>{[{value:true,label:"Public",description:"Listed on Explore, and anyone with the link can view it."},{value:false,label:"Private",description:"Hidden from Explore. Anyone with the link can view and share it."}].map(option => <label key={option.label} className={isPublic === option.value ? "cw-visibility-selected" : ""}><input type="radio" name="campaignVisibility" checked={isPublic === option.value} disabled={isSaving} onChange={() => handleVisibilityChange(option.value)} /><div><strong>{option.value ? <VisibilityIcon /> : <VisibilityIcon locked />} {option.label}</strong><span>{option.description}</span></div></label>)}</div>{!isPublic && <p className="cw-publish-privacy-warning">Anyone with this link can view and share your campaign. It isn&apos;t confidential.</p>}</fieldset>
      <section className="cw-publish-fee"><header><h3>Hosting fee</h3>{isPromoApplied && <span>✓ Early access applied</span>}</header><p>Fundu charges for hosting your page, never a cut of what you raise.</p><dl><div><dt>₦{feePerDay} per day × {durationInDays} {durationInDays === 1 ? "day" : "days"}</dt><dd>{isPromoApplied ? <s>{money(normalHostingFee)}</s> : money(normalHostingFee)}</dd></div>{isPromoApplied && <div><dt>{promoCode}</dt><dd>−{money(normalHostingFee)}</dd></div>}<div className="cw-publish-total"><dt>Total to pay</dt><dd><strong>{money(totalFee)}</strong>{isPromoApplied && <span>Free during early access</span>}</dd></div></dl></section>
      <div className="cw-publish-notice"><InfoIcon /><p>Fundu doesn&apos;t receive or hold contributions. Supporters send money straight to the bank account you add. The receiving information will be visible to people who can view your campaign.</p></div>
      <div className="cw-publish-confirm"><input type="checkbox" id="terms-check" checked={agreed} disabled={isSaving} aria-invalid={Boolean(publishErrors.terms)} aria-describedby={publishErrors.terms ? "cw-publish-terms-error" : undefined} onChange={event => {setAgreed(event.target.checked);if(event.target.checked)setPublishErrors(previous => ({...previous,terms:""}));}} /><label htmlFor="terms-check">I confirm the information is accurate and I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>.</label></div>{publishErrors.terms && <p className="form-field-error" id="cw-publish-terms-error">{publishErrors.terms}</p>}
      <div className="campaign-bottom-actions cw-publish-footer"><div className="campaign-bottom-actions__right"><button type="button" className="campaign-action-secondary" aria-label="Back to preview" onClick={onBack} disabled={isSaving}>← Back to preview</button><span id="cw-publish-reason" role={publishError ? "alert" : "status"} className={publishError ? "cw-publish-error" : ""}>{publishError && <span className="action-icon action-icon--alert" />}{publishReason}</span><button type="button" className="campaign-action-primary" onClick={handlePublishClick} disabled={publishDisabled} aria-describedby={publishReason ? "cw-publish-reason" : undefined}>{isSaving ? <><span className="action-dialog-spinner" />Publishing…</> : publishError ? <><span className="action-icon action-icon--refresh" />Retry publishing</> : "Publish campaign"}</button></div></div>
    </div><aside className="cw-publish-summary"><CampaignStorageImage src={cover} alt={`${campaignData?.title || "Campaign"} cover`} /><div><h3>{campaignData?.title || "Untitled campaign"}</h3><p>{campaignData?.category || "Choose a category"}</p><dl>{[["Goal",money(campaignData?.goal)],["Ends",campaignEndDate && !Number.isNaN(campaignEndDate.getTime()) ? campaignEndDate.toLocaleDateString("en-NG",{day:"numeric",month:"short",year:"numeric"}) : "Not set"],["Visibility",isPublic ? "Public" : "Private"],["Hosting fee",money(totalFee)]].map(([label,value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div></aside></div>
    {isModalOpen && <BankAccountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveBankAccount} existingDetails={savedBankAccount} savedAccount={reusableBankAccount} isLoadingSavedAccount={isLoadingSavedAccount} savedAccountError={savedAccountError} isSavingBank={isSavingBank} />}
  </section>;
}

function VisibilityIcon({locked=false}) { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">{locked ? <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0v4"/></> : <><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></>}</svg>; }
