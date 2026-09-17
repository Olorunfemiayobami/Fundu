import { supabase } from "./supabase";

/*
 * =========================================================
 * UPLOAD COVER IMAGE
 * =========================================================
 *
 * Upload a newly cropped campaign cover image.
 */

async function uploadCoverImage(file) {
  const originalExtension = file.name?.split(".").pop()?.toLowerCase() || "jpg";

  const safeExtension =
    originalExtension === "jpeg" ? "jpg" : originalExtension;

  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${safeExtension}`;

  const filePath = `campaign-covers/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("campaign-images")
    .upload(filePath, file, {
      cacheControl: "3600",

      upsert: false,

      contentType: file.type || "image/jpeg",
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data: urlData } = supabase.storage
    .from("campaign-images")
    .getPublicUrl(filePath);

  if (!urlData?.publicUrl) {
    throw new Error(
      "The cover image was uploaded, but its public URL could not be created.",
    );
  }

  return urlData.publicUrl;
}

/*
 * =========================================================
 * NORMALIZE END DATE
 * =========================================================
 *
 * formData.duration contains the actual end date selected
 * by the organizer.
 *
 * Fundu currently uses Nigeria time (WAT / UTC+1).
 *
 * If an organizer selects:
 *
 * 2026-11-18
 *
 * the campaign should remain active throughout
 * November 18 and end at:
 *
 * 2026-11-18 23:59:59 Nigeria time.
 *
 * The +01:00 timezone offset makes that explicit when
 * Supabase stores the timestamp.
 */

function normalizeCampaignEndDate(endDate) {
  if (!endDate) {
    return null;
  }

  const value = String(endDate).trim();

  /*
   * The campaign creation form uses:
   *
   * YYYY-MM-DD
   */

  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  if (!datePattern.test(value)) {
    return null;
  }

  /*
   * Validate that this is a real calendar date.
   */

  const [year, month, day] = value.split("-").map(Number);

  const validationDate = new Date(Date.UTC(year, month - 1, day));

  const isValidDate =
    validationDate.getUTCFullYear() === year &&
    validationDate.getUTCMonth() === month - 1 &&
    validationDate.getUTCDate() === day;

  if (!isValidDate) {
    return null;
  }

  /*
   * End of the selected day in Nigeria time.
   *
   * Nigeria uses WAT (UTC+1) throughout the year.
   */

  return `${value}T23:59:59+01:00`;
}

/*
 * =========================================================
 * SAVE OR UPDATE CAMPAIGN
 * =========================================================
 *
 * Used by:
 *
 * - autosave
 * - Save & Exit
 * - Continue
 * - Publish
 * - editing an existing campaign
 * - restarting an ended campaign
 *
 *
 * IMPORTANT:
 *
 * If campaignId exists, Supabase updates that same
 * campaign.
 *
 * It does NOT intentionally create another campaign.
 */

export async function saveCampaign({
  campaignId,
  userId,
  formData,
  blocks,
  payoutDetails = null,
  status = "draft",
}) {
  try {
    /*
     * =========================================================
     * REQUIRED SAVE INFORMATION
     * =========================================================
     */

    if (!userId) {
      throw new Error("You must be signed in to save a campaign.");
    }

    /*
     * =========================================================
     * EXISTING COVER IMAGE
     * =========================================================
     */

    let imageUrl =
      formData.cover_image ||
      formData.coverImage ||
      formData.image_url ||
      formData.preview_image ||
      "";

    /*
     * imagePreview can be either:
     *
     * - a real Supabase URL
     * - a temporary blob: URL
     *
     * Never save blob URLs into Supabase.
     */

    if (
      !imageUrl &&
      formData.imagePreview &&
      !String(formData.imagePreview).startsWith("blob:")
    ) {
      imageUrl = formData.imagePreview;
    }

    /*
     * =========================================================
     * NEW COVER IMAGE
     * =========================================================
     */

    const hasNewCoverFile =
      typeof File !== "undefined" && formData.coverImageFile instanceof File;

    if (hasNewCoverFile) {
      imageUrl = await uploadCoverImage(formData.coverImageFile);
    }

    /*
     * =========================================================
     * CAMPAIGN END DATE
     * =========================================================
     *
     * This is stored as the end of the selected day
     * in Nigeria time.
     */

    const campaignEndDate = normalizeCampaignEndDate(formData.duration);

    /*
     * =========================================================
     * CAMPAIGN VISIBILITY
     * =========================================================
     *
     * All campaigns are Public by default.
     *
     * Only an explicit false value makes the
     * campaign Private.
     */

    const isPublic = formData.isPublic !== false;

    /*
     * =========================================================
     * STORY
     * =========================================================
     */

    const safeBlocks = Array.isArray(blocks) ? blocks : [];

    /*
     * =========================================================
     * DATABASE SAVE
     * =========================================================
     */

    const { data, error } = await supabase.rpc("save_campaign", {
      p_campaign_id: campaignId || null,

      p_creator_id: userId,

      p_category_id: formData.categoryId || null,

      p_title: formData.title?.trim() || "",

      p_description:
        formData.shortDescription?.trim() || formData.title?.trim() || "",

      p_goal_amount: Number.parseFloat(formData.goal) || 0,

      p_currency: formData.currency || "NGN",

      p_country: formData.country || "Nigeria",

      p_cover_image: imageUrl || null,

      p_story_blocks: safeBlocks,

      p_status: status,

      /*
       * End of the organizer's selected date.
       *
       * Example:
       *
       * 2026-11-18T23:59:59+01:00
       */

      p_end_date: campaignEndDate,

      p_payout_details: payoutDetails,

      /*
       * Campaign visibility.
       *
       * true  = Public
       * false = Private
       */

      p_is_public: isPublic,
    });

    if (error) {
      throw error;
    }

    /*
     * =========================================================
     * SUCCESS
     * =========================================================
     */

    return {
      success: true,

      campaignId: data || campaignId || null,

      imageUrl: imageUrl || null,

      endDate: campaignEndDate,

      isPublic,
    };
  } catch (error) {
    console.error("Error in saveCampaign:", error);

    return {
      success: false,

      error: error?.message || "Could not save campaign.",
    };
  }
}
