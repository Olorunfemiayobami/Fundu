import "../../styles/profilebanner.css";

export default function ProfileBanner() {
  return (
    <section className="profile-banner">
      {/* BANNER HEADER */}
      <div className="banner-header">
        <div className="banner-text-group">
          <h3>Complete your profile setup</h3>
          <p>Finish these steps to start receiving donations.</p>
        </div>

        <button className="complete-setup-btn">Complete Setup</button>
      </div>

      {/* CHECKLIST ROW */}
      <div className="checklist-row">
        {/* State: Completed */}
        <div className="check-item completed">
          <div className="status-icon">✓</div>
          <span>Add profile picture</span>
        </div>

        {/* State: Uncompleted */}
        <div className="check-item">
          <div className="status-icon"></div>
          <span>Verify ID</span>
        </div>

        <div className="check-item">
          <div className="status-icon"></div>
          <span>Add bank details</span>
        </div>

        <div className="check-item">
          <div className="status-icon"></div>
          <span>Launch first campaign</span>
        </div>
      </div>
    </section>
  );
}
