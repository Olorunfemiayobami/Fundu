"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import DonationSidebar from "./components/DonationSidebar";
import CampaignUpdates from "./components/CampaignUpdates";
import CampaignComments from "./components/CampaignComments";
import CampaignStory from "./components/CampaignStory";
import "./campaign-details.css";

export default function CampaignDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [campaign, setCampaign] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFullData() {
      if (!id) return;

      try {
        // 1. Fetch the campaign record first
        const { data: campaignData, error: campError } = await supabase
          .from("campaigns")
          .select("*")
          .eq("id", id)
          .single();

        if (campError) {
          console.error("Supabase error:", campError.message);
          setLoading(false);
          return;
        }

        // 2. Fetch User (Account Owner), Updates, and Comments in parallel
        const [userRes, upRes, comRes] = await Promise.all([
          campaignData.creator_id
            ? supabase
                .from("users")
                .select("full_name, display_name")
                .eq("id", campaignData.creator_id)
                .single()
            : Promise.resolve({ data: null }),
          supabase
            .from("updates")
            .select("*")
            .eq("campaign_id", id)
            .order("created_at", { ascending: false }),
          supabase
            .from("comments")
            .select("*")
            .eq("campaign_id", id)
            .order("created_at", { ascending: false }),
        ]);

        if (campaignData) {
          // Merge creator data into campaign object
          campaignData.creator = userRes.data || null;

          // --- MATCHING THE EDITOR LOGIC ---
          if (
            campaignData.story_blocks &&
            typeof campaignData.story_blocks === "string"
          ) {
            try {
              campaignData.story_blocks = JSON.parse(campaignData.story_blocks);
            } catch (e) {
              console.error("Failed to parse story_blocks JSON", e);
            }
          }
          setCampaign(campaignData);
        }

        if (!upRes.error) setUpdates(upRes.data);
        if (!comRes.error) setComments(comRes.data);
      } catch (err) {
        console.error("Unexpected fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFullData();
  }, [id]);

  const handlePostComment = async (text) => {
    if (!text.trim()) return;
    const { data, error } = await supabase
      .from("comments")
      .insert([{ campaign_id: id, text, user_name: "Anonymous Supporter" }])
      .select();

    if (!error) setComments([data[0], ...comments]);
  };

  if (loading) {
    return (
      <div
        className="loading-state"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
        }}
      >
        <div className="spinner"></div>
        <p className="font-urbanist" style={{ marginTop: "16px" }}>
          Gathering Campaign Data...
        </p>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div
        className="error-view"
        style={{ textAlign: "center", padding: "100px 20px" }}
      >
        <h2 className="font-urbanist">Campaign not found</h2>
        <p>The campaign might be a draft or the ID is incorrect.</p>
        <button
          className="btn-save-draft-aligned"
          style={{ marginTop: "20px", cursor: "pointer" }}
          onClick={() => router.push("/")}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="campaign-page">
      <header className="page-nav">
        <button className="back-btn" onClick={() => router.back()}>
          ← Campaign Details
        </button>
      </header>

      <div className="details-grid">
        <main className="details-left">
          <section className="campaign-hero">
            <div className="category-tag">
              {campaign.category || "Community"}
            </div>
            <h1>{campaign.title}</h1>

            <p className="campaign-author">
              by{" "}
              {campaign.creator?.full_name ||
                campaign.creator?.display_name ||
                campaign.organiser_name ||
                "Anonymous"}
            </p>

            <div className="hero-image-container">
              <img
                src={
                  campaign.image_url ||
                  campaign.cover_image ||
                  "/placeholder-hero.jpg"
                }
                alt={campaign.title}
              />
            </div>
          </section>

          {/* UPDATED: Passing both storyBlocks and storyContent */}
          <CampaignStory
            storyBlocks={campaign.story_blocks}
            storyContent={campaign.story_content || campaign.description}
            organiserName={
              campaign.creator?.full_name || campaign.organiser_name
            }
          />

          <CampaignUpdates updates={updates} />

          <CampaignComments
            comments={comments}
            onPostComment={handlePostComment}
          />
        </main>

        <aside className="details-right">
          <DonationSidebar campaign={campaign} />
        </aside>
      </div>
    </div>
  );
}
