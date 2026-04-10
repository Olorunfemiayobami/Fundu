import React from "react";
import PaymentRouteCard from "./PaymentRouteCard";

const DonationSidebar = ({ campaign }) => {
  const progress = Math.min(
    (campaign.raised_amount / campaign.goal_amount) * 100,
    100,
  );

  return (
    <div className="sticky-sidebar">
      <div className="raised-box">
        <div className="raised-info">
          <h2 className="font-urbanist">
            ${campaign.goal_amount?.toLocaleString()}
          </h2>
          <span>to be raised</span>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="stats-list">
        <div className="stat-item">
          <span className="label">👁️ Clicks</span>
          <span className="value">{campaign.clicks || 342}</span>
        </div>
        <div className="stat-item">
          <span className="label">👥 Donors</span>
          <span className="value">{campaign.donors || 342}</span>
        </div>
        <div className="stat-item">
          <span className="label">📅 Days Left</span>
          <span className="value">{campaign.duration || 18}</span>
        </div>
      </div>

      <button className="donate-button font-urbanist">Donate Now</button>

      <div className="sidebar-routes">
        <p className="mini-title">Donation Routes Available</p>
        <PaymentRouteCard
          type="Paystack"
          name={campaign.organiser_name}
          isMini
        />
        <PaymentRouteCard
          type="Bank Details"
          name={campaign.organiser_name}
          isMini
        />
      </div>
    </div>
  );
};

export default DonationSidebar;
