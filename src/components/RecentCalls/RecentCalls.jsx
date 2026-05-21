import React from "react";
import "./RecentCalls.css";

function RecentCalls({ calls = [], onStartCall }) {
  if (calls.length === 0) {
    return (
      <div className="recent-calls-container">
        <h3 className="recent-calls-title">Recent calls</h3>
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg width="34" height="36" viewBox="0 0 34 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="34" height="36" rx="8" fill="#6686FF" fill-opacity="0.12" />
              <path d="M24 16.4H10M20.1111 10V13.2M13.8889 10V13.2M13.7333 26H20.2667C21.5735 26 22.2269 26 22.726 25.7384C23.165 25.5083 23.522 25.1412 23.7457 24.6896C24 24.1762 24 23.5041 24 22.16V15.44C24 14.0959 24 13.4238 23.7457 12.9104C23.522 12.4588 23.165 12.0917 22.726 11.8616C22.2269 11.6 21.5735 11.6 20.2667 11.6H13.7333C12.4265 11.6 11.7731 11.6 11.274 11.8616C10.835 12.0917 10.478 12.4588 10.2543 12.9104C10 13.4238 10 14.0959 10 15.44V22.16C10 23.5041 10 24.1762 10.2543 24.6896C10.478 25.1412 10.835 25.5083 11.274 25.7384C11.7731 26 12.4265 26 13.7333 26Z" stroke="#6686FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

          </div>
          <div className="empty-state-texts">
            <div className="empty-state-text-wrapper">
              <h4 className="empty-state-title">No Recent Calls</h4>
              <p className="empty-state-desc">
                Connect your Google Calendar to see upcoming meetings,
                get reminders, and join calls directly from Hintro.
              </p>
            </div>
          </div>
          <div className="empty-state-btn" onClick={onStartCall}>
            <p className="empty-state-btn-text">Start a Call</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="recent-calls-container">
      <h3 className="recent-calls-title">Recent calls</h3>
      <div className="calls-list">
        {calls.map((call, index) => (
          <div key={call._id || index} className="call-item-wrapper">
            <div className="call-item">
              <div className="call-icon">
                <span className="call-icon-text">K</span>
              </div>
              <div className="call-details">
                <span className="call-name">{call.description || "Design Call"}</span>
                <div className="call-tags">
                  <span className="call-tag"></span>
                  <span className="call-tag"></span>
                  <span className="call-tag"></span>
                </div>
              </div>
              <div className="call-time-actions">
                <span className="call-time">
                  {new Date(call.started_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase()}
                </span>
                <button className="call-action-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="5" r="2" fill="#6B7280" />
                    <circle cx="12" cy="12" r="2" fill="#6B7280" />
                    <circle cx="12" cy="19" r="2" fill="#6B7280" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(RecentCalls);
