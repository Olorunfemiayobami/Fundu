import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import CampaignCard from "@/components/ui/CampaignCard";
import { supabase } from "@/lib/supabase";
import "@/styles/campaigns.css";

const Campaigns = ({ currentUser }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Active Campaigns");
  const [searchQuery, setSearchQuery] = useState("");
  const [campaignData, setCampaignData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      setIsLoading(true);
      try {
        let user = currentUser;
        if (!user) {
          const {
            data: { user: authUser },
          } = await supabase.auth.getUser();
          user = authUser;
        }

        if (user) {
          const { data, error } = await supabase
            .from("campaigns")
            .select("*")
            .eq("creator_id", user.id)
            .order("created_at", { ascending: false });

          if (error) throw error;
          setCampaignData(data || []);
        }
      } catch (error) {
        console.error("Error fetching campaigns:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCampaigns();
  }, [currentUser]);

  const filteredCampaigns = useMemo(() => {
    return campaignData.filter((campaign) => {
      const matchesSearch = (campaign.title || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const statusVal = (campaign.status || "draft").toLowerCase();

      if (activeTab === "Active Campaigns")
        return statusVal === "active" && matchesSearch;
      if (activeTab === "Draft") return statusVal === "draft" && matchesSearch;
      return matchesSearch;
    });
  }, [campaignData, searchQuery, activeTab]);

  return (
    <div className="campaigns-page-container">
      <div className="campaigns-header">
        <h1 className="page-title font-urbanist">Campaigns</h1>
        <button
          className="btn-create-campaign font-urbanist"
          onClick={() => router.push("/create-campaign")}
        >
          Create Campaign
        </button>
      </div>

      <div className="tabs-container">
        {["Active Campaigns", "All Campaigns", "Draft"].map((tab) => (
          <button
            key={tab}
            className={`tab-item font-urbanist ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search campaigns..."
          className="search-input font-urbanist"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="campaign-grid">
        {isLoading ? (
          <div className="empty-state font-urbanist">Loading...</div>
        ) : filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((camp) => (
            <CampaignCard
              key={camp.id}
              id={camp.id}
              title={camp.title}
              status={camp.status}
              raisedAmount={camp.raised_amount}
              goalAmount={camp.goal_amount}
              clicks={camp.views_count}
              donors={camp.donors_count}
              daysActive={camp.days_active}
              updatesCount={camp.updates_count}
              coverImage={camp.image_url || camp.cover_image}
              lastUpdated={
                camp.updated_at
                  ? new Date(camp.updated_at).toLocaleDateString()
                  : "Recently"
              }
            />
          ))
        ) : (
          <div className="empty-state font-urbanist">No campaigns found.</div>
        )}
      </div>
    </div>
  );
};

export default Campaigns;
