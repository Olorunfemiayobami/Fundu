"use client";

import React, { useState } from "react";
import InputField from "@/components/ui/InputField";

// Icons
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
  <div
    style={{
      width: "40px",
      height: "40px",
      backgroundColor: "#F5F5F5",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
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
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 16.5039H8"
        stroke="#333333"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 16.5039H14.5"
        stroke="#333333"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
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

const PayoutMethodModal = ({ isOpen, onClose, onSave }) => {
  const [activeView, setActiveView] = useState("selection");

  const [bankDetails, setBankDetails] = useState({
    accountName: "",
    bankName: "",
    accountNumber: "",
    confirmOwnership: false,
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setBankDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const nigerianBanks = [
    { label: "Access Bank", value: "Access Bank" },
    { label: "First Bank", value: "First Bank" },
    { label: "GTBank", value: "GTBank" },
    { label: "UBA", value: "UBA" },
    { label: "Zenith Bank", value: "Zenith Bank" },
    { label: "Kuda Bank", value: "Kuda Bank" },
    { label: "Opay", value: "Opay" },
  ];

  const isFormValid =
    bankDetails.accountName &&
    bankDetails.bankName &&
    bankDetails.accountNumber.length === 10 &&
    bankDetails.confirmOwnership;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="payout-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>
            {activeView === "selection" ? "Add Payout Method" : "Bank Details"}
          </h3>

          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
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

        {activeView === "selection" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <button className="btn-payout-primary">Connect Paystack</button>

            <button
              className="btn-payout-secondary"
              onClick={() => setActiveView("bank-form")}
            >
              Add Bank Details
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <InputField
              label="Account Holder Name"
              name="accountName"
              placeholder="Full name as on the account"
              value={bankDetails.accountName}
              onChange={handleInputChange}
              required
            />

            <InputField
              label="Bank Name"
              name="bankName"
              isSelect={true}
              options={nigerianBanks}
              placeholder="Select your bank"
              value={bankDetails.bankName}
              onChange={handleInputChange}
              required
            />

            <div>
              <InputField
                label="Account Number"
                name="accountNumber"
                placeholder="0123456789"
                value={bankDetails.accountNumber}
                onChange={(e) =>
                  e.target.value.length <= 10 && handleInputChange(e)
                }
                required
              />

              <p
                style={{
                  fontSize: "12px",
                  color: "#888",
                  textAlign: "right",
                  marginTop: "4px",
                }}
              >
                {bankDetails.accountNumber.length}/10 digits
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "flex-start",
              }}
            >
              <input
                type="checkbox"
                name="confirmOwnership"
                checked={bankDetails.confirmOwnership}
                onChange={handleInputChange}
                style={{
                  width: "18px",
                  height: "18px",
                  marginTop: "2px",
                }}
              />

              <p
                style={{
                  fontSize: "13px",
                  color: "#666",
                  margin: 0,
                }}
              >
                I confirm that this bank account belongs to me.
              </p>
            </div>

            <button
              className="btn-payout-save"
              style={{
                backgroundColor: isFormValid ? "#1e807f" : "#8abeb7",
                cursor: isFormValid ? "pointer" : "not-allowed",
              }}
              disabled={!isFormValid}
              onClick={() => onSave(bankDetails)}
            >
              Save and Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function PublishCampaign({
  onBack,
  onPublish,
  isSaving,
  duration,
}) {
  const [agreed, setAgreed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedPayment, setSavedPayment] = useState(null);

  // Early-access promotion
  const promoCode = "EARLYACCESS2026";
  const isPromoApplied = true;

  // Standard hosting price
  const feePerDay = 200;

  const campaignEndDate = duration ? new Date(`${duration}T00:00:00`) : null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const durationInDays = campaignEndDate
    ? Math.max(
        1,
        Math.floor(
          (campaignEndDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
        ),
      )
    : 1;

  const normalHostingFee = durationInDays * feePerDay;

  const totalFee = isPromoApplied ? 0 : normalHostingFee;

  const formattedEndDate = campaignEndDate
    ? campaignEndDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "No end date selected";

  const handleSavePayment = (details) => {
    setSavedPayment(details);
    setIsModalOpen(false);
  };

  return (
    <div className="form-container-main" style={{ gap: "24px" }}>
      <div className="publish-banner-promo">
        <h3 className="banner-title-text">You're almost live! 🎉</h3>

        <p className="banner-body-text">
          Your campaign is ready to be published and shared with the world.
        </p>
      </div>

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

        <div className="payment-method-footer">
          <div
            className="status-flex-row"
            style={{
              marginBottom: savedPayment ? "16px" : "0",
            }}
          >
            {savedPayment ? <SuccessCheck /> : <ErrorCheck />}

            <div className="status-text-stack">
              <h4 className="status-label-title">Add a payout method</h4>

              <p className="status-label-sub">
                Connect bank details so donations go directly to your account.
              </p>
            </div>
          </div>

          {savedPayment && (
            <div
              style={{
                display: "flex",
                alignSelf: "stretch",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
                border: "1px solid #E0E0E0",
                borderRadius: "12px",
                backgroundColor: "#FFFFFF",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                }}
              >
                <BankIcon />

                <div className="status-text-stack">
                  <h4 className="status-label-title" style={{ margin: 0 }}>
                    {savedPayment.bankName}
                  </h4>

                  <p className="status-label-sub" style={{ margin: 0 }}>
                    {savedPayment.accountName}
                  </p>
                </div>
              </div>

              <SuccessCheck />
            </div>
          )}

          <button
            className="btn-save-draft-aligned"
            style={{
              width: "100%",
              marginTop: "12px",
            }}
            onClick={() => setIsModalOpen(true)}
          >
            {savedPayment ? "Change Payout Method" : "Add New Payout Method"}
          </button>
        </div>
      </div>

      {/* HOSTING FEE SECTION */}
      <div
        style={{
          fontFamily: "'Urbanist', sans-serif",
          width: "100%",
          padding: "24px",
          border: "1px solid #e6e6e6",
          borderRadius: "12px",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "flex-start",
          }}
        >
          {isPromoApplied ? <SuccessCheck /> : <ErrorCheck />}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#333",
              }}
            >
              Pay hosting fee
            </span>

            <span
              style={{
                fontSize: "14px",
                color: "#888",
              }}
            >
              Your campaign is hosted on Fundu for the duration you choose.
            </span>
          </div>
        </div>

        {/* Standard Pricing */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#333",
            }}
          >
            Standard pricing
          </span>

          <div
            style={{
              display: "flex",
              border: "1px solid #e6e6e6",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                flex: 1,
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#888",
                }}
              >
                Hosting rate
              </span>

              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#333",
                }}
              >
                ₦200 / day
              </span>
            </div>

            <div
              style={{
                width: "1px",
                background: "#e6e6e6",
              }}
            />

            <div
              style={{
                flex: 1,
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#888",
                }}
              >
                Campaign duration
              </span>

              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#333",
                }}
              >
                {durationInDays} {durationInDays === 1 ? "day" : "days"}
              </span>
            </div>

            <div
              style={{
                width: "1px",
                background: "#e6e6e6",
              }}
            />

            <div
              style={{
                flex: 1,
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#888",
                }}
              >
                Total hosting fee
              </span>

              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#333",
                }}
              >
                ₦{normalHostingFee.toLocaleString("en-NG")}
              </span>
            </div>
          </div>
        </div>

        {/* Early Access Offer */}
        {isPromoApplied && (
          <div
            style={{
              padding: "16px",
              background: "#F0FDFA",
              border: "1px solid #1E807F",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                fontWeight: "700",
                color: "#1E807F",
              }}
            >
              Early access offer
            </span>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#888",
                  textDecoration: "line-through",
                }}
              >
                ₦{normalHostingFee.toLocaleString("en-NG")}
              </span>

              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "800",
                  color: "#1E807F",
                }}
              >
                ₦0
              </span>
            </div>

            <span
              style={{
                fontSize: "13px",
                color: "#333",
              }}
            >
              Your early access promotion covers the full hosting fee for your
              campaign.
            </span>
          </div>
        )}

        {/* Promotion Applied */}
        {isPromoApplied && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#333",
              }}
            >
              Promotion applied
            </span>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 14px",
                background: "#F5F5F5",
                border: "1px solid #e6e6e6",
                borderRadius: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#333",
                }}
              >
                {promoCode}
              </span>

              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "2px 6px",
                  background: "#E6F4F1",
                  borderRadius: "4px",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6L5 9L10 3"
                    stroke="#00A63E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    color: "#00A63E",
                  }}
                >
                  Applied
                </span>
              </span>
            </div>

            <span
              style={{
                fontSize: "12px",
                color: "#888",
              }}
            >
              This promotion was automatically applied to your account. No
              action needed.
            </span>
          </div>
        )}

        {/* Total to Pay */}
        <div
          style={{
            padding: "16px",
            background: "#F9FAFB",
            border: "1px solid #e6e6e6",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#333",
            }}
          >
            Total to pay
          </span>

          <span
            style={{
              fontSize: "32px",
              fontWeight: "800",
              color: "#1E807F",
            }}
          >
            ₦{totalFee.toLocaleString("en-NG")}
          </span>

          <span
            style={{
              fontSize: "13px",
              fontWeight: "600",
              color: isPromoApplied ? "#1E807F" : "#888",
            }}
          >
            {isPromoApplied
              ? "Free during early access"
              : `Hosting fee for ${durationInDays} ${
                  durationInDays === 1 ? "day" : "days"
                }`}
          </span>
        </div>
      </div>

      <div className="info-notice-box">
        <InfoIcon />

        <p className="info-notice-text">
          Fundu does not hold funds. Donations are processed by trusted
          providers and sent directly to you.
        </p>
      </div>

      <div className="terms-container">
        <input
          type="checkbox"
          id="terms-check"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          style={{
            cursor: "pointer",
            width: "18px",
            height: "18px",
          }}
        />

        <label htmlFor="terms-check" className="terms-label">
          I confirm all info is accurate and agree to{" "}
          <span className="terms-link">Terms of Service</span>
        </label>
      </div>

      <div className="form-actions-story">
        <button className="btn-back-basics" onClick={onBack}>
          Back to Preview
        </button>

        <button
          className="btn-continue-preview"
          disabled={isSaving || !agreed || !savedPayment}
          onClick={() => onPublish(savedPayment)}
        >
          {isSaving ? "Publishing..." : "Publish Campaign"}
        </button>
      </div>

      <PayoutMethodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePayment}
      />
    </div>
  );
}
