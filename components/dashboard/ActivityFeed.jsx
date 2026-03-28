import React from "react";
import "../../styles/activityfeed.css";

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      user: "Sarah J.",
      action: "donated",
      amount: "$50",
      time: "2 mins ago",
      avatar: "SJ",
    },
    {
      id: 2,
      user: "Michael R.",
      action: "shared",
      detail: "on Twitter",
      time: "15 mins ago",
      avatar: "MR",
    },
    {
      id: 3,
      user: "Anonymous",
      action: "donated",
      amount: "$100",
      time: "1 hour ago",
      avatar: "?",
    },
  ];

  return (
    <div className="activity-section">
      <div className="activity-list">
        {activities.map((item) => (
          <div key={item.id} className="activity-item">
            <div className="activity-avatar">{item.avatar}</div>
            <div className="activity-content">
              <p className="activity-text">
                <strong>{item.user}</strong> {item.action}{" "}
                {item.amount || item.detail}
              </p>
              <span className="activity-time">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
      {/* <button className="view-all-btn">View All Activity</button> */}
    </div>
  );
};

export default ActivityFeed;
