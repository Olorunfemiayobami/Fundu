"use client";

import CampaignCard from "@/components/campaigns/CampaignCard";

export default function ExploreDraftPreview({ formData, creatorProfile }) {
  const campaign = {
    title: formData.title?.trim() || "Your campaign title",
    category_name: formData.category || "Choose a category",
    creator_id: creatorProfile.id,
    creator_name: formData.organiser?.trim() || creatorProfile.name || "Campaign organizer",
    goal_amount: formData.goal,
    amount_raised: 0,
    currency: formData.currency || "NGN",
    cover_image: formData.imagePreview || formData.coverImage || formData.cover_image ||
      formData.image_url || formData.preview_image || "",
    // Preview the remaining calendar days, matching the Basics helper in Lagos.
    end_date: formData.duration ? `${formData.duration}T00:00:00+01:00` : null,
    status: "draft",
  };

  return (
    <section className="cw-explore-preview" aria-labelledby="cw-explore-preview-title">
      <h2 id="cw-explore-preview-title">How it will look on Explore</h2>
      <CampaignCard campaign={campaign} variant="public" appearance="collection"
        viewerId={creatorProfile.id} preview />
    </section>
  );
}
