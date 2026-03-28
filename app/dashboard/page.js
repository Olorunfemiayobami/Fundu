import "../../styles/dashboard.css";
import "../../styles/statsbar.css";
import StatsBar from "../../components/dashboard/StatsBar";
import ProfileBanner from "../../components/dashboard/ProfileBanner";
import CampaignCard from "../../components/dashboard/CampaignCard";
import ActivityFeed from "../../components/dashboard/ActivityFeed";

export default function DashboardPage() {
  return (
    <div className="dashboard-page">
      {/* Container locks content to 1600px max-width and 80px side padding */}
      <div className="dashboard-container">
        <header className="welcome-header">
          <div className="welcome-text">
            <h1>Welcome Back, Ayobami</h1>
            <p>Your impact is growing. Here's what's happening today.</p>
          </div>
          <StatsBar />
        </header>

        <ProfileBanner />

        <section className="section-block">
          <div className="section-header">
            <h3>Campaigns</h3>
            <button className="text-link">View All ›</button>
          </div>
          <div className="campaign-grid">
            <CampaignCard
              title="Education for Rural Children"
              author="Sarah Johnson"
              amount="45,000"
              imageSrc="/images/campaign-1.jpg"
            />
            <CampaignCard
              title="Medical Emergency Fund"
              author="David Smith"
              amount="12,500"
              imageSrc="/images/campaign-2.jpg"
            />
            <CampaignCard
              title="Clean Water Initiative"
              author="Community Health"
              amount="8,000"
              imageSrc="/images/campaign-3.jpg"
            />
            <CampaignCard
              title="Tech for Schools"
              author="Innovation Lab"
              amount="22,000"
              imageSrc="/images/campaign-4.jpg"
            />
          </div>
        </section>

        <section className="section-block">
          <div className="section-header">
            <h3>Recent Activity</h3>
            <button className="text-link">View All ›</button>
          </div>
          <ActivityFeed />
        </section>
      </div>
    </div>
  );
}
