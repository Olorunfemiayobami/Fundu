"use client";

import LoadingScreen from "@/components/feedback/LoadingScreen";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import CampaignCard from "@/components/campaigns/CampaignCard";
import "@/styles/explore.css";
const PAGE_SIZE = 6;
export default function ExplorePage() {
  const [campaigns, setCampaigns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [viewerId, setViewerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [categoryOverflow, setCategoryOverflow] = useState(false);
  const [clockNow, setClockNow] = useState(Date.now());
  const categoryRef = useRef(null),
    requestRef = useRef(0);
  useEffect(() => {
    loadExploreData();
    const timer = window.setInterval(() => setClockNow(Date.now()), 30000);
    return () => {
      requestRef.current++;
      window.clearInterval(timer);
    };
  }, []);
  async function loadExploreData() {
    const request = ++requestRef.current;
    setLoading(true);
    setPageError("");
    try {
      const [campaignResult, categoryResult, authResult] = await Promise.all([
        supabase
          .from("campaigns")
          .select(
            "id, creator_id, category_id, title, goal_amount, amount_raised, currency, cover_image, preview_image, image_url, status, is_public, start_date, end_date, created_at, updated_at",
          )
          .eq("status", "active")
          .eq("is_public", true)
          .order("created_at", {
            ascending: false,
          }),
        supabase.from("categories").select("id, name, slug").order("name", {
          ascending: true,
        }),
        supabase.auth.getUser(),
      ]);
      if (campaignResult.error) throw campaignResult.error;
      if (categoryResult.error)
        throw new Error(
          "We couldn't load campaign categories. Please try again.",
        );
      const rows = campaignResult.data || [],
        ids = [...new Set(rows.map((row) => row.creator_id).filter(Boolean))];
      let creators = {};
      if (ids.length) {
        const result = await supabase
          .from("users")
          .select("id, full_name, display_name")
          .in("id", ids);
        if (result.error) console.error("Campaign organizers:", result.error);
        creators = Object.fromEntries(
          (result.data || []).map((row) => [row.id, row]),
        );
      }
      if (request !== requestRef.current) return;
      const categoryMap = Object.fromEntries(
        (categoryResult.data || []).map((row) => [row.id, row]),
      );
      setCampaigns(
        rows.map((row) => ({
          ...row,
          category_name: categoryMap[row.category_id]?.name || "Campaign",
          creator_name:
            creators[row.creator_id]?.display_name ||
            creators[row.creator_id]?.full_name ||
            "Campaign organizer",
        })),
      );
      setCategories(categoryResult.data || []);
      setViewerId(authResult.data?.user?.id || null);
    } catch (error) {
      if (request === requestRef.current)
        setPageError(
          error.message || "We couldn't load campaigns. Please try again.",
        );
    } finally {
      if (request === requestRef.current) setLoading(false);
    }
  }
  const filteredCampaigns = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    return campaigns
      .filter(
        (row) =>
          row.status === "active" &&
          row.is_public === true &&
          (!row.end_date ||
            !Number.isFinite(Date.parse(row.end_date)) ||
            Date.parse(row.end_date) > clockNow) &&
          (selectedCategory === "all" ||
            row.category_id === selectedCategory) &&
          (!search ||
            (row.title || "").toLowerCase().includes(search) ||
            (row.creator_name || "").toLowerCase().includes(search)),
      )
      .sort((a, b) =>
        sortOrder === "raised"
          ? (Number(b.amount_raised) || 0) - (Number(a.amount_raised) || 0)
          : sortOrder === "ending"
            ? (Date.parse(a.end_date) || Infinity) -
              (Date.parse(b.end_date) || Infinity)
            : (Date.parse(b.created_at) || 0) - (Date.parse(a.created_at) || 0),
      );
  }, [campaigns, selectedCategory, searchTerm, sortOrder, clockNow]);
  useEffect(
    () => setVisibleCount(PAGE_SIZE),
    [selectedCategory, searchTerm, sortOrder],
  );
  useEffect(() => {
    const row = categoryRef.current;
    if (!row) return;
    const update = () =>
      setCategoryOverflow(
        row.scrollWidth - row.clientWidth - row.scrollLeft > 2,
      );
    update();
    row.addEventListener("scroll", update, {
      passive: true,
    });
    window.addEventListener("resize", update);
    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    observer?.observe(row);
    return () => {
      row.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer?.disconnect();
    };
  }, [categories, loading]);
  function clearFilters() {
    setSearchTerm("");
    setSelectedCategory("all");
  }
  return (
    <div className="explore-page">
      <header className="explore-header">
        <h1>Explore campaigns</h1>
        <p>Discover and support causes that matter to you.</p>
      </header>
      <div className="explore-controls">
        <label className="explore-search">
          <ExploreIcon name="search" />
          <span className="explore-sr">Search campaigns</span>
          <input
            type="search"
            placeholder="Search campaigns"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>
        <label className="explore-sort">
          <ExploreIcon name="sort" />
          <span className="explore-sr">Sort campaigns</span>
          <select
            aria-label="Sort campaigns"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
          >
            <option value="newest">Newest first</option>
            <option value="ending">Ending soon</option>
            <option value="raised">Most raised</option>
          </select>
        </label>
        <p className="explore-results explore-results--desktop" role="status">
          {loading
            ? "Loading campaigns…"
            : `${filteredCampaigns.length} ${filteredCampaigns.length === 1 ? "campaign" : "campaigns"}`}
        </p>
      </div>
      <div
        className={`explore-category-wrap ${categoryOverflow ? "explore-category-wrap--overflow" : ""}`}
      >
        <div
          className="explore-category-row"
          ref={categoryRef}
          aria-label="Filter by category"
        >
          <button
            type="button"
            aria-pressed={selectedCategory === "all"}
            onClick={() => setSelectedCategory("all")}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              type="button"
              key={category.id}
              aria-pressed={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        {categoryOverflow && (
          <button
            type="button"
            className="explore-category-next"
            aria-label="Show more categories"
            onClick={() =>
              categoryRef.current?.scrollBy({
                left: Math.max(200, categoryRef.current.clientWidth * 0.7),
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "auto"
                  : "smooth",
              })
            }
          >
            ›
          </button>
        )}
      </div>
      <p className="explore-results explore-results--mobile" role="status">
        {loading
          ? "Loading campaigns…"
          : `${filteredCampaigns.length} ${filteredCampaigns.length === 1 ? "campaign" : "campaigns"}`}
      </p>
      {loading ? (
        <LoadingScreen variant="cards" label="Loading campaigns" compact />
      ) : pageError ? (
        <div className="explore-empty">
          <h2>Unable to load campaigns</h2>
          <p>{pageError}</p>
          <button
            type="button"
            className="explore-button"
            onClick={loadExploreData}
          >
            Try again
          </button>
        </div>
      ) : !filteredCampaigns.length ? (
        <div className="explore-empty">
          <h2>No campaigns found</h2>
          <p>Try another category or search term.</p>
          <button
            type="button"
            className="explore-button"
            onClick={clearFilters}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="explore-grid">
            {filteredCampaigns.slice(0, visibleCount).map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                variant="public"
                appearance="collection"
                viewerId={viewerId}
              />
            ))}
            {filteredCampaigns.length < 3 && (
              <aside className="explore-promo">
                <h2>Raising money for something?</h2>
                <p>
                  Give your goal a page of its own. Add your story and bank
                  details, then share one link.
                </p>
                <Link href="/create-campaign" className="explore-button">
                  ＋ Start a fundraiser
                </Link>
              </aside>
            )}
          </div>
          {visibleCount < filteredCampaigns.length && (
            <button
              type="button"
              className="explore-load-more"
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            >
              Load more campaigns
            </button>
          )}
        </>
      )}
    </div>
  );
}
function ExploreIcon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {name === "search" ? (
        <>
          <circle cx="10" cy="10" r="7" />
          <path d="m15 15 6 6" />
        </>
      ) : (
        <>
          <path d="M8 3v18m-4-4 4 4 4-4M16 21V3m-4 4 4-4 4 4" />
        </>
      )}
    </svg>
  );
}
