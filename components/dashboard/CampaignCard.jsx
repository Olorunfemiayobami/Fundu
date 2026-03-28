import Image from "next/image";
import "../../styles/campaigncard.css";

export default function CampaignCard({ title, author, amount, imageSrc }) {
  return (
    <div className="campaign-card">
      {/* IMAGE & TAG */}
      <div className="card-image-container">
        <Image
          src={imageSrc || "/images/campaign-placeholder.jpg"}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="active-tag">Active</div>
      </div>

      {/* CONTENT */}
      <div className="card-content">
        <div className="title-author-group">
          <h4 className="campaign-title">{title}</h4>
          <p className="campaign-author">by {author}</p>
        </div>

        <div className="amount-container">
          <span className="amount-value">${amount}</span>
          <div className="to-be-raised-box">
            <span className="to-be-raised-text">to be raised</span>
          </div>
        </div>
      </div>
    </div>
  );
}
