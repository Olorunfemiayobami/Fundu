import Image from "next/image";
import { useRouter } from "next/navigation";
import "../../styles/campaigncard.css";

export default function CampaignCard({
  id,
  title,
  author,
  amount,
  imageSrc,
  status,
  currency = "NGN",
}) {
  const router = useRouter();

  // ✅ NEW: Normalize status to handle null, undefined, or empty strings ("")
  // This ensures the word "draft" appears instead of "undefined"
  const currentStatus =
    status && status.trim() !== "" ? status.toLowerCase() : "draft";

  const handleEdit = () => {
    router.push(`/create-campaign?id=${id}`);
  };

  // ✅ Safe formatting to prevent crashes
  const formatAmount = (val) => {
    if (val === null || val === undefined || val === "") return "0";
    const num = Number(val);
    return isNaN(num) ? "0" : num.toLocaleString();
  };

  return (
    <div className="campaign-card">
      <div className="card-image-container">
        <Image
          src={imageSrc || "/images/campaign-placeholder.jpg"}
          alt={title || "Campaign"}
          fill
          style={{ objectFit: "cover" }}
        />
        {/* ✅ UPDATED: Use the normalized currentStatus for class and text */}
        <div
          className={`active-tag ${currentStatus === "draft" ? "draft-tag" : ""}`}
        >
          {currentStatus}
        </div>
      </div>

      <div className="card-content">
        <div className="title-author-group">
          <h4 className="campaign-title">{title}</h4>
          <p className="campaign-author">by {author}</p>
        </div>

        <div className="amount-container">
          <span className="amount-value">
            {currency} {formatAmount(amount)}
          </span>
          <div className="to-be-raised-box">
            <span className="to-be-raised-text">to be raised</span>
          </div>
        </div>

        <div className="card-actions" style={{ marginTop: "16px" }}>
          {/* ✅ UPDATED: Check against the normalized currentStatus */}
          {currentStatus === "draft" ? (
            <button className="btn-edit-campaign-card" onClick={handleEdit}>
              Edit Campaign
            </button>
          ) : (
            <button className="btn-view-campaign-card">View Campaign</button>
          )}
        </div>
      </div>
    </div>
  );
}
