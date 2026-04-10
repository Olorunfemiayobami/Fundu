import React, { useState } from 'react';

const CampaignComments = ({ comments, onPostComment }) => {
  const [newComment, setNewComment] = useState("");

  return (
    <section className="comments-section">
      <div className="comments-header">
        <h3 className="section-title font-urbanist">Comments ({comments?.length || 0})</h3>
        <button className="hide-btn">Hide</button>
      </div>

      <div className="comments-list">
        {comments?.map((comment, index) => (
          <div key={index} className="comment-card">
            <div className="user-avatar">{comment.user_name?.charAt(0)}</div>
            <div className="comment-body">
              <div className="comment-meta">
                <span className="user-name font-urbanist">{comment.user_name}</span>
                <span className="comment-time">2 days ago</span>
              </div>
              <p className="comment-text">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="comment-input-area">
        <textarea 
          placeholder="Leave a supportive comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button 
          className="post-comment-btn font-urbanist"
          onClick={() => onPostComment(newComment)}
        >
          Post Comment
        </button>
      </div>
    </section>
  );
};

export default CampaignComments;