"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import CampaignCard from "@/components/campaigns/CampaignCard";
import "@/styles/explore.css";

const PAGE_SIZE = 6;

export default function ExplorePage() {
  const [campaigns, setCampaigns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [creatorMap, setCreatorMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("all");

  const [searchTerm, setSearchTerm] = useState("");

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    loadExploreData();
  }, []);

  async function loadExploreData() {
    setLoading(true);
    setPageError("");

    try {
      /*
        ========================================
        LOAD ACTIVE PUBLIC CAMPAIGNS
        ========================================

        Explore only displays campaigns that are:

        - active
        - public

        Private campaigns remain available to their
        organizer and through their direct campaign link,
        but they are not discoverable here.
      */

      const { data: campaignRows, error: campaignError } = await supabase
        .from("campaigns")
        .select(
          `
          id,
          creator_id,
          category_id,
          title,
          goal_amount,
          amount_raised,
          currency,
          cover_image,
          preview_image,
          image_url,
          status,
          is_public,
          start_date,
          end_date,
          created_at,
          updated_at
        `,
        )
        .eq("status", "active")
        .eq("is_public", true)
        .order("created_at", {
          ascending: false,
        });

      if (campaignError) {
        throw campaignError;
      }

      const safeCampaigns = campaignRows || [];

      setCampaigns(safeCampaigns);

      /*
        ========================================
        LOAD CATEGORIES
        ========================================
      */

      const { data: categoryRows, error: categoryError } = await supabase
        .from("categories")
        .select("id, name, slug")
        .order("name", {
          ascending: true,
        });

      if (categoryError) {
        console.error("Categories error:", categoryError);
      }

      setCategories(categoryRows || []);

      /*
        ========================================
        LOAD CAMPAIGN CREATORS
        ========================================
      */

      const creatorIds = [
        ...new Set(
          safeCampaigns.map((campaign) => campaign.creator_id).filter(Boolean),
        ),
      ];

      if (creatorIds.length > 0) {
        const { data: creatorRows, error: creatorError } = await supabase
          .from("users")
          .select(
            `
            id,
            full_name,
            display_name
          `,
          )
          .in("id", creatorIds);

        if (creatorError) {
          console.error("Creators error:", creatorError);
        }

        const map = {};

        for (const creator of creatorRows || []) {
          map[creator.id] = creator;
        }

        setCreatorMap(map);
      }
    } catch (error) {
      console.error("Explore load error:", error);

      setPageError("We couldn't load campaigns right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  /*
    ========================================
    CATEGORY LOOKUP
    ========================================
  */

  const categoryMap = useMemo(() => {
    const map = {};

    for (const category of categories) {
      map[category.id] = category;
    }

    return map;
  }, [categories]);

  /*
    ========================================
    ENRICH CAMPAIGNS FOR SHARED CARD
    ========================================
  */

  const enrichedCampaigns = useMemo(() => {
    return campaigns.map((campaign) => {
      const category = categoryMap[campaign.category_id];

      const creator = creatorMap[campaign.creator_id];

      const creatorName =
        creator?.display_name || creator?.full_name || "Campaign organizer";

      return {
        ...campaign,

        category_name: category?.name || "",

        category_slug: category?.slug || "",

        creator_name: creatorName,
      };
    });
  }, [campaigns, categoryMap, creatorMap]);

  /*
    ========================================
    FILTER CAMPAIGNS
    ========================================
  */

  const filteredCampaigns = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return enrichedCampaigns.filter((campaign) => {
      const matchesCategory =
        selectedCategory === "all" ||
        campaign.category_slug === selectedCategory ||
        campaign.category_name?.toLowerCase() === selectedCategory;

      const matchesSearch =
        !normalizedSearch ||
        campaign.title?.toLowerCase().includes(normalizedSearch) ||
        campaign.creator_name?.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [enrichedCampaigns, selectedCategory, searchTerm]);

  /*
    ========================================
    RESET LOAD MORE
    ========================================
  */

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedCategory, searchTerm]);

  const visibleCampaigns = filteredCampaigns.slice(0, visibleCount);

  const canLoadMore = visibleCount < filteredCampaigns.length;

  /*
    ========================================
    LOADING
    ========================================
  */

  if (loading) {
    return (
      <div className="explore-page">
        <div className="explore-loading">
          <div className="explore-loading__spinner" />

          <p>Loading campaigns...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="explore-page">
      {/* =============================
          HEADER
      ============================== */}

      <section className="explore-header">
        <div className="explore-header__copy">
          <h1>Explore Campaigns</h1>

          <p>Discover and support causes that matter to you.</p>
        </div>

        <Link href="/create-campaign" className="explore-primary-btn">
          Create Campaign
        </Link>
      </section>

      {/* =============================
          CATEGORY FILTERS
      ============================== */}

      <section className="explore-categories-section">
        <div
          className="explore-category-tabs"
          role="tablist"
          aria-label="Campaign categories"
        >
          <CategoryTab
            label="All"
            active={selectedCategory === "all"}
            onClick={() => setSelectedCategory("all")}
          />

          {categories.map((category) => {
            const value = category.slug || category.name.toLowerCase();

            return (
              <CategoryTab
                key={category.id}
                label={category.name}
                active={selectedCategory === value}
                onClick={() => setSelectedCategory(value)}
              />
            );
          })}
        </div>
      </section>

      {/* =============================
          SEARCH
      ============================== */}

      <section className="explore-search-section">
        <div className="explore-search">
          <span className="explore-search__icon" aria-hidden="true" />

          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search campaigns..."
            aria-label="Search campaigns"
          />
        </div>

        <p className="explore-results-count">
          {filteredCampaigns.length}{" "}
          {filteredCampaigns.length === 1 ? "campaign" : "campaigns"}
        </p>
      </section>

      {/* =============================
          ERROR
      ============================== */}

      {pageError ? (
        <section className="explore-empty">
          <h2>Unable to load campaigns</h2>

          <p>{pageError}</p>

          <button
            type="button"
            className="explore-outline-btn"
            onClick={loadExploreData}
          >
            Try Again
          </button>
        </section>
      ) : visibleCampaigns.length > 0 ? (
        /* =============================
            CAMPAIGN GRID
        ============================== */

        <section className="explore-grid">
          {visibleCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              variant="public"
            />
          ))}
        </section>
      ) : (
        /* =============================
            EMPTY
        ============================== */

        <section className="explore-empty">
          <h2>No campaigns found</h2>

          <p>Try another category or search term.</p>
        </section>
      )}

      {/* =============================
          LOAD MORE
      ============================== */}

      {canLoadMore && !pageError && (
        <div className="explore-load-more">
          <button
            type="button"
            className="explore-outline-btn"
            onClick={() => setVisibleCount((current) => current + PAGE_SIZE)}
          >
            Load More Campaigns
          </button>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   CATEGORY TAB
========================================================= */

function CategoryTab({ label, active, onClick }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      className={`explore-category-tab ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
