import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useUser } from "../../context/UserContext";
import "./FeedbackPopup.css";

const StarIcon = ({ filled }) => (
  <svg width="36" height="34" viewBox="0 0 36 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.7731 0.592758C17.1255 -0.19773 18.2475 -0.197728 18.5998 0.59276L22.9768 10.4121C23.1221 10.7382 23.4302 10.962 23.7852 10.9995L34.4766 12.1279C35.3373 12.2187 35.684 13.2858 35.0411 13.8652L27.0548 21.0623C26.7897 21.3013 26.672 21.6635 26.7461 22.0127L28.9767 32.5295C29.1563 33.3761 28.2485 34.0356 27.4988 33.6032L18.1861 28.2319C17.8769 28.0535 17.496 28.0535 17.1868 28.2319L7.87409 33.6032C7.12439 34.0356 6.21666 33.3761 6.39623 32.5295L8.62686 22.0127C8.70092 21.6635 8.58324 21.3013 8.31808 21.0623L0.331855 13.8652C-0.311058 13.2858 0.0356658 12.2187 0.89635 12.1279L11.5877 10.9995C11.9427 10.962 12.2508 10.7382 12.3961 10.4121L16.7731 0.592758Z"
      fill={filled ? "#F8C624" : "#D9D9D9"}
    />
  </svg>
);

function FeedbackPopup({ onClose }) {
  const { userId } = useUser();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);

  const getTextareaLabel = () => {
    if (rating >= 1 && rating <= 3) {
      return "What frustrated you or felt confusing?";
    }
    if (rating >= 4) {
      return "What did you like the most?";
    }
    return "";
  };

  const showTextarea = rating >= 1;

  const handleSubmit = () => {
    const feedback = {
      rating,
      comment,
      timestamp: new Date().toISOString(),
    };

    const key = `feedbacks_${userId}`;
    const existingFeedbacks = JSON.parse(localStorage.getItem(key) || "[]");
    existingFeedbacks.push(feedback);
    localStorage.setItem(key, JSON.stringify(existingFeedbacks));

    onClose();
  };

  return ReactDOM.createPortal(
    <div className="feedback-popup-overlay" onClick={onClose}>
      <div
        className="feedback-popup"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="feedback-popup-title">Give Feedback</h3>
        <p className="feedback-popup-subtitle">
          Describe your experience using Hintro...
        </p>

        <div className="feedback-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className="feedback-star"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
            >
              <StarIcon
                filled={star <= (hoveredStar || rating)}
              />
            </button>
          ))}
        </div>

        {showTextarea && (
          <>
            <p className="feedback-textarea-label">{getTextareaLabel()}</p>
            <textarea
              className="feedback-textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder=""
            />
          </>
        )}

        <div className="feedback-popup-actions">
          <button className="feedback-back-btn" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.63994 3.58725H0.398682M3.58749 0.398438L0.398682 3.58725L3.58749 6.77606" stroke="black" stroke-width="0.797203" stroke-linecap="round" stroke-linejoin="round" />
            </svg>


            Back
          </button>
          <button className="feedback-submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default FeedbackPopup;
