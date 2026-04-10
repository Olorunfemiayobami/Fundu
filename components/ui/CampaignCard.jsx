import React from "react";
import { useRouter } from "next/navigation";
import Badge from "./Badge";
import "../../styles/campaigncard.css";

const CampaignCard = ({
  id,
  title,
  raisedAmount = 0,
  goalAmount = 0,
  clicks = 0,
  donors = 0,
  daysActive = 0,
  commentsCount = 0,
  updatesCount = 0,
  lastUpdated,
  status,
  coverImage,
}) => {
  const router = useRouter();

  const progress =
    goalAmount > 0 ? Math.min((raisedAmount / goalAmount) * 100, 100) : 0;

  const formatCurrency = (val) => {
    const num = parseFloat(val);
    return isNaN(num) ? "0" : num.toLocaleString();
  };

  return (
    <div className="campaign-card animate-fade-in">
      <div className="card-cover-wrapper">
        <img
          src={coverImage || "/images/placeholder.jpg"}
          alt={title}
          className="card-cover-image"
        />
        <div className="status-badge-container">
          <Badge status={status || "Draft"} />
        </div>
      </div>

      <div className="card-content">
        <h3 className="campaign-title font-urbanist">{title || "Untitled"}</h3>

        <div className="amount-raised-container">
          <div className="amount-header">
            <span className="raised-value font-urbanist">
              ${formatCurrency(raisedAmount)}
            </span>
            <span className="goal-text font-urbanist">
              raised of ${formatCurrency(goalAmount)}
            </span>
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-box">
            <span className="stat-label font-urbanist">Clicks</span>
            <span className="stat-number font-urbanist">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="stat-icon"
              >
                <path
                  d="M12.5 10C12.5 10.663 12.2366 11.2989 11.7678 11.7678C11.2989 12.2366 10.663 12.5 10 12.5C9.33696 12.5 8.70107 12.2366 8.23223 11.7678C7.76339 11.2989 7.5 10.663 7.5 10C7.5 9.33696 7.76339 8.70107 8.23223 8.23223C8.70107 7.76339 9.33696 7.5 10 7.5C10.663 7.5 11.2989 7.76339 11.7678 8.23223C12.2366 8.70107 12.5 9.33696 12.5 10Z"
                  stroke="#1E807F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.66406 9.99935C2.9974 6.58518 6.11073 4.16602 9.99739 4.16602C13.8841 4.16602 16.9974 6.58518 18.3307 9.99935C16.9974 13.4135 13.8841 15.8327 9.99739 15.8327C6.11073 15.8327 2.9974 13.4135 1.66406 9.99935Z"
                  stroke="#1E807F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {clicks}
            </span>
          </div>

          <div className="stat-box">
            <span className="stat-label font-urbanist">Donors</span>
            <span className="stat-number font-urbanist">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="stat-icon"
              >
                <path
                  d="M7.63021 9.05768C7.54687 9.04935 7.44687 9.04935 7.35521 9.05768C5.37187 8.99102 3.79688 7.36602 3.79688 5.36602C3.79687 3.32435 5.44687 1.66602 7.49687 1.66602C9.53854 1.66602 11.1969 3.32435 11.1969 5.36602C11.1885 7.36602 9.61354 8.99102 7.63021 9.05768Z"
                  stroke="#1E807F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.6786 3.33398C15.2953 3.33398 16.5953 4.64232 16.5953 6.25065C16.5953 7.82565 15.3453 9.10898 13.787 9.16732C13.7203 9.15898 13.6453 9.15898 13.5703 9.16732"
                  stroke="#1E807F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.46563 12.134C1.44896 13.484 1.44896 15.684 3.46563 17.0257C5.75729 18.559 9.51563 18.559 11.8073 17.0257C13.824 15.6757 13.824 13.4757 11.8073 12.134C9.52396 10.609 5.76562 10.609 3.46563 12.134Z"
                  stroke="#1E807F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.2812 16.666C15.8813 16.541 16.4479 16.2993 16.9146 15.941C18.2146 14.966 18.2146 13.3577 16.9146 12.3827C16.4562 12.0327 15.8979 11.7993 15.3063 11.666"
                  stroke="#1E807F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {donors}
            </span>
          </div>

          <div className="stat-box">
            <span className="stat-label font-urbanist">Days Active</span>
            <span className="stat-number font-urbanist">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="stat-icon"
              >
                <path
                  d="M6.66406 1.66602V4.16602"
                  stroke="#1E807F"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.3359 1.66602V4.16602"
                  stroke="#1E807F"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.91406 7.57422H17.0807"
                  stroke="#1E807F"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.5 7.08268V14.166C17.5 16.666 16.25 18.3327 13.3333 18.3327H6.66667C3.75 18.3327 2.5 16.666 2.5 14.166V7.08268C2.5 4.58268 3.75 2.91602 6.66667 2.91602H13.3333C16.25 2.91602 17.5 4.58268 17.5 7.08268Z"
                  stroke="#1E807F"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {daysActive}
            </span>
          </div>
        </div>

        <div className="engagement-row">
          <div className="engagement-item font-urbanist">
            💬 {commentsCount} comments
          </div>
          <div className="engagement-item font-urbanist">
            📈 {updatesCount} updates
          </div>
        </div>

        <div className="last-updated-container">
          <span className="last-updated-label font-urbanist">
            Last updated:
          </span>
          <span className="last-updated-time font-urbanist">
            {lastUpdated || "Just now"}
          </span>
        </div>

        <div className="card-actions-wrapper">
          <div className="primary-actions-row">
            <button className="card-btn font-urbanist">View Donations</button>
            <button className="card-btn font-urbanist">Post Update</button>
          </div>
          <div className="secondary-actions-row">
            {status?.toLowerCase() === "draft" ? (
              <button
                className="card-btn-secondary font-urbanist"
                onClick={() => router.push(`/create-campaign?id=${id}`)}
              >
                Edit Draft
              </button>
            ) : (
              <button
                className="card-btn-secondary font-urbanist"
                onClick={() => router.push(`/campaign/${id}`)}
              >
                View Campaign
              </button>
            )}
            <button className="card-btn-secondary font-urbanist">Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
