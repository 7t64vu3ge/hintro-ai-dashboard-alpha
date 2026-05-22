import React, { useState, useCallback } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import FeedbackPopup from "../../components/FeedbackPopup/FeedbackPopup";
import { useUser } from "../../context/UserContext";
import "./FeedbackHistory.css";

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true }).toLowerCase();
}

function FeedbackHistory() {
  const { profile, userId } = useUser();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const [feedbacks, setFeedbacks] = useState(() =>
    JSON.parse(localStorage.getItem(`feedbacks_${userId}`) || "[]")
  );

  const handleFeedbackClose = useCallback(() => {
    setFeedbacks(JSON.parse(localStorage.getItem(`feedbacks_${userId}`) || "[]"));
    setIsFeedbackOpen(false);
  }, [userId]);

  return (
    <DashboardLayout user={profile} title="Feedback History">
      {isFeedbackOpen && <FeedbackPopup onClose={handleFeedbackClose} />}
      <div className="feedback-history-content">
        <p className="feedback-history-subtitle">View and manage all your submitted feedback</p>
        <div className="feedback-history-container">
          <table className="feedback-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Rating</th>
                <th>Description</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.length > 0 ? (
                feedbacks.map((item, idx) => {
                  let desc = item.comment || "";
                  if (desc.length > 40) desc = desc.substring(0, 40) + "...";

                  return (
                    <tr key={idx}>
                      <td>My First Call</td>
                      <td>
                        <span className="rating-ratio">{item.rating}/5</span>
                        <span className="rating-stars">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className={star <= item.rating ? "star-filled" : "star-empty"}>
                              ★
                            </span>
                          ))}
                        </span>
                      </td>
                      <td>{desc || "Had issues understanding boxy control...."}</td>
                      <td className="feedback-date">{formatDate(item.timestamp)}</td>
                      <td className="feedback-time">{formatTime(item.timestamp)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="feedback-empty-state">
                    <p className="feedback-empty-text">No feedbacks yet</p>
                    <button className="feedback-give-btn" onClick={() => setIsFeedbackOpen(true)}>
                      Give Feedback
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default FeedbackHistory;
