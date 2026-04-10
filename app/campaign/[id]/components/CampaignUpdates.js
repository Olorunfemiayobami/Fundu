import React from 'react';

const CampaignUpdates = ({ updates }) => {
  if (!updates || updates.length === 0) return null;

  return (
    <section className="updates-section">
      <h3 className="section-title font-urbanist">Updates</h3>
      <div className="updates-timeline">
        {updates.map((update, index) => (
          <div key={index} className="update-item">
            <div className="update-header">
              <div className="update-icon">🎉</div>
              <div className="update-meta">
                <p className="update-title font-urbanist">{update.title}</p>
                <p className="update-date">{new Date(update.created_at).toLocaleDateString()}</p>
              </div>
              {update.is_milestone && <span className="milestone-tag">Milestone</span>}
            </div>
            <p className="update-content">{update.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CampaignUpdates;