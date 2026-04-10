import { supabase } from "./supabase";

/**
 * Saves or updates a campaign in Supabase.
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
    let imageUrl = formData.imagePreview;

    // 1. Handle Image Upload
    if (formData.coverImageFile instanceof File) {
      const file = formData.coverImageFile;
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}-${Date.now()}.${fileExt}`;
      const filePath = `campaign-covers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("campaign-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("campaign-images")
        .getPublicUrl(filePath);
      imageUrl = urlData.publicUrl;
    }

    // 2. Call the Database RPC Function
    // Maps the frontend arguments to the SQL function parameters
    const { data, error } = await supabase.rpc("save_campaign", {
      p_campaign_id: campaignId || null,
      p_creator_id: userId,
      p_category_id: formData.categoryId || null,
      p_title: formData.title || "",
      p_description: formData.shortDescription || formData.title || "",
      p_goal_amount: parseFloat(formData.goal) || 0,
      p_currency: formData.currency || "NGN",
      p_country: formData.country || "Nigeria",
      p_cover_image: imageUrl || null,
      p_story_blocks: blocks || [],
      p_status: status, // Dynamic status (draft or active)
      p_payout_details: payoutDetails, // Dynamic bank info
      p_duration: parseInt(formData.duration) || 1,
    });

    if (error) throw error;

    return {
      success: true,
      campaignId: data,
    };
  } catch (error) {
    console.error("Error in saveCampaign:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}
