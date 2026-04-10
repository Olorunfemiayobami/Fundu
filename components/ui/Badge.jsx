import React from "react";
import "../../styles/badge.css";

const Badge = ({ status }) => {
  const currentStatus = status?.toLowerCase() || "draft";

  return (
    <div className={`badge-container ${currentStatus}`}>
      <span className="badge-text">{status}</span>
    </div>
  );
};

export default Badge;
