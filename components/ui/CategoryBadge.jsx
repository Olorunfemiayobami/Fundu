import React from "react";
import "../../styles/badge.css"; // Ensure this matches your lowercase filename

const CategoryBadge = ({ category }) => {
  // If no category is passed, we don't want an empty gray box showing up
  if (!category) return null;

  return (
    <div className="category-badge">
      <span className="category-badge-text">{category}</span>
    </div>
  );
};

export default CategoryBadge;
