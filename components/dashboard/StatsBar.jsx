import "../../styles/statsbar.css";

export default function StatsBar() {
  return (
    <div className="stats-grid">
      <div className="stat-item">
        <label>Total Raised</label>
        {/* We add teal-text here to make the 4.2M teal */}
        <h2 className="teal-text">₦4.2M</h2>
      </div>

      <div className="stat-item">
        <label>Campaigns</label>
        <h2>12</h2>
      </div>

      <div className="stat-item">
        <label>Donors</label>
        <h2>1.5K</h2>
      </div>
    </div>
  );
}
