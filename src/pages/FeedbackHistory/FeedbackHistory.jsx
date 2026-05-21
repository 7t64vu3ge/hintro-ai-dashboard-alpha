import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import FeedbackPopup from "../../components/FeedbackPopup/FeedbackPopup";
import { useUser } from "../../context/UserContext";
import "./FeedbackHistory.css";

const getOrdinalNum = (n) => {
  return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = getOrdinalNum(date.getDate());
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutesStr} ${ampm}`;
};

function FeedbackHistory() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const { user } = useUser();

  const loadFeedbacks = () => {
    const data = JSON.parse(localStorage.getItem("feedbacks") || "[]");
    setFeedbacks(data);
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const handleFeedbackClose = () => {
    setIsFeedbackOpen(false);
    loadFeedbacks();
  };

  return (
    <DashboardLayout user={user} title="Feedback History">
      <div className="feedback-history-content">
        <p className="feedback-history-subtitle">Browse your previous feedback submissions</p>

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
                      <td>{item.rating}/5</td>
                      <td>{desc ? `- ${desc}` : "-"}</td>
                      <td>{formatDate(item.timestamp)}</td>
                      <td>{formatTime(item.timestamp)}</td>
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
      
      {isFeedbackOpen && <FeedbackPopup onClose={handleFeedbackClose} />}
    </DashboardLayout>
  );
}

export default FeedbackHistory;
