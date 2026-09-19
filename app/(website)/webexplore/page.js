"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import CampaignCard from "@/components/campaigns/CampaignCard";

const PAGE_SIZE = 9;

export default function PublicExplorePage() {
  const [campaigns, setCampaigns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [creatorMap, setCreatorMap] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  /* =========================================================
     LOAD PUBLIC EXPLORE DATA
     ========================================================= */

  useEffect(() => {
    let mounted = true;

    async function loadExplore() {
      setLoading(true);
      setError("");

      try {
        /* ---------------------------------------------------
           PUBLIC CAMPAIGNS
           Only campaigns that are active AND public.
           --------------------------------------------------- */

        const { data: campaignRows, error: campaignError } = await supabase
          .from("campaigns")
          .select("*")
          .eq("status", "active")
          .eq("is_public", true)
          .order("created_at", { ascending: false });

        if (campaignError) {
          throw campaignError;
        }

        if (!mounted) return;

        const safeCampaigns = campaignRows || [];

        setCampaigns(safeCampaigns);

        /* ---------------------------------------------------
           CATEGORIES
           --------------------------------------------------- */

        const { data: categoryRows, error: categoryError } = await supabase
          .from("categories")
          .select("id, name, slug")
          .order("name", { ascending: true });

        if (!mounted) return;

        if (categoryError) {
          console.error("Public Explore category load error:", categoryError);

          setCategories([]);
        } else {
          setCategories(categoryRows || []);
        }

        /* ---------------------------------------------------
           CREATOR NAMES
           --------------------------------------------------- */

        const creatorIds = [
          ...new Set(
            safeCampaigns
              .map((campaign) => campaign.creator_id)
              .filter(Boolean),
          ),
        ];

        if (creatorIds.length === 0) {
          setCreatorMap({});
          return;
        }

        const { data: creatorRows, error: creatorError } = await supabase
          .from("users")
          .select("id, full_name, display_name")
          .in("id", creatorIds);

        if (!mounted) return;

        if (creatorError) {
          console.error("Public Explore creator load error:", creatorError);

          setCreatorMap({});
        } else {
          const nextCreatorMap = {};

          for (const creator of creatorRows || []) {
            nextCreatorMap[creator.id] = creator;
          }

          setCreatorMap(nextCreatorMap);
        }
      } catch (loadError) {
        console.error("Public Explore load error:", loadError);

        if (mounted) {
          setCampaigns([]);
          setCategories([]);
          setCreatorMap({});

          setError("We couldn't load fundraisers right now. Please try again.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadExplore();

    return () => {
      mounted = false;
    };
  }, []);

  /* =========================================================
     CATEGORY LOOKUP
     ========================================================= */

  const categoryMap = useMemo(() => {
    const map = {};

    for (const category of categories) {
      map[category.id] = category;
    }

    return map;
  }, [categories]);

  /* =========================================================
     PREPARE CAMPAIGNS FOR EXISTING CAMPAIGN CARD
     ========================================================= */

  const preparedCampaigns = useMemo(() => {
    return campaigns.map((campaign) => {
      const creator = creatorMap[campaign.creator_id];
      const category = categoryMap[campaign.category_id];

      return {
        ...campaign,

        creator_name:
          creator?.display_name || creator?.full_name || "Campaign organiser",

        category_name: category?.name || "",
        category_slug: category?.slug || "",
      };
    });
  }, [campaigns, creatorMap, categoryMap]);

  /* =========================================================
     SEARCH + CATEGORY FILTER
     ========================================================= */

  const filteredCampaigns = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return preparedCampaigns.filter((campaign) => {
      const campaignCategory =
        campaign.category_slug?.toLowerCase() ||
        campaign.category_name?.toLowerCase() ||
        "";

      const matchesCategory =
        selectedCategory === "all" || campaignCategory === selectedCategory;

      const matchesSearch =
        !searchTerm ||
        campaign.title?.toLowerCase().includes(searchTerm) ||
        campaign.creator_name?.toLowerCase().includes(searchTerm) ||
        campaign.category_name?.toLowerCase().includes(searchTerm);

      return matchesCategory && matchesSearch;
    });
  }, [preparedCampaigns, selectedCategory, search]);

  /* Reset pagination whenever the filter changes. */

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedCategory, search]);

  const visibleCampaigns = filteredCampaigns.slice(0, visibleCount);

  const hasMore = visibleCount < filteredCampaigns.length;

  /* =========================================================
     PAGE
     ========================================================= */

  return (
    <main className="web-explore">
      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="web-explore__hero">
        <div className="wrap">
          <div className="web-explore__hero-copy">
            <span className="web-explore__eyebrow">Explore fundraisers</span>

            <h1>Find something worth showing up for.</h1>

            <p className="lead">
              Discover public fundraisers, understand what people are raising
              money for, and support the ones that matter to you.
            </p>
          </div>

          {/* SEARCH */}

          <div className="web-explore__search">
            <span className="web-explore__search-icon" aria-hidden="true" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search fundraisers"
              aria-label="Search fundraisers"
            />

            {search && (
              <button
                type="button"
                className="web-explore__search-clear"
                aria-label="Clear search"
                onClick={() => setSearch("")}
              >
                ×
              </button>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          CAMPAIGNS
          ===================================================== */}

      <section className="band web-explore__content">
        <div className="wrap">
          {/* CATEGORY FILTERS */}

          <div
            className="web-explore__filters"
            aria-label="Filter fundraisers by category"
          >
            <button
              type="button"
              className={`web-explore__filter ${
                selectedCategory === "all" ? "is-active" : ""
              }`}
              aria-pressed={selectedCategory === "all"}
              onClick={() => setSelectedCategory("all")}
            >
              All
            </button>

            {categories.map((category) => {
              const value = (category.slug || category.name).toLowerCase();

              const active = selectedCategory === value;

              return (
                <button
                  key={category.id}
                  type="button"
                  className={`web-explore__filter ${active ? "is-active" : ""}`}
                  aria-pressed={active}
                  onClick={() => setSelectedCategory(value)}
                >
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* SECTION HEADING */}

          <div className="web-explore__head">
            <div>
              <h2>Fundraisers you can support</h2>

              <p>Every campaign below has been made public by its organiser.</p>
            </div>

            {!loading && !error && (
              <span className="web-explore__count">
                {filteredCampaigns.length}{" "}
                {filteredCampaigns.length === 1 ? "fundraiser" : "fundraisers"}
              </span>
            )}
          </div>

          {/* LOADING */}

          {loading && (
            <div
              className="web-explore__state"
              role="status"
              aria-live="polite"
            >
              <div className="web-explore__spinner" aria-hidden="true" />

              <p>Loading fundraisers...</p>
            </div>
          )}

          {/* ERROR */}

          {!loading && error && (
            <div className="web-explore__state">
              <h3>We couldn't load the fundraisers.</h3>

              <p>{error}</p>

              <button
                type="button"
                className="web-explore__outline"
                onClick={() => window.location.reload()}
              >
                Try again
              </button>
            </div>
          )}

          {/* CAMPAIGN CARDS */}

          {!loading && !error && visibleCampaigns.length > 0 && (
            <div className="web-explore__grid">
              {visibleCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  variant="public"
                />
              ))}
            </div>
          )}

          {/* EMPTY STATE */}

          {!loading && !error && visibleCampaigns.length === 0 && (
            <div className="web-explore__state">
              <h3>No fundraisers found.</h3>

              <p>Try another search or choose a different category.</p>

              {(search || selectedCategory !== "all") && (
                <button
                  type="button"
                  className="web-explore__outline"
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("all");
                  }}
                >
                  Clear filters
                </button>
              )}
            </div>
          )}

          {/* LOAD MORE */}

          {!loading && !error && hasMore && (
            <div className="web-explore__more">
              <button
                type="button"
                className="web-explore__outline"
                onClick={() =>
                  setVisibleCount((current) => current + PAGE_SIZE)
                }
              >
                Load more fundraisers
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
