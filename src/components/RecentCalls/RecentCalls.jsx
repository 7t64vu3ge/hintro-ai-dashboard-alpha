import React from "react";
import "./RecentCalls.css";

// Returns ordinal suffix: 1st, 2nd, 3rd, 4th…
function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

// Formats a Date object to "April 29th"
function formatDateHeading(date) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const day = date.getDate();
  return `${months[date.getMonth()]} ${day}${getOrdinalSuffix(day)}`;
}

// Formats ISO string to "11:00 am" / "2:30 pm"
function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).toLowerCase();
}

// Groups calls array into an ordered array of { heading, calls[] }
function groupCallsByDate(calls) {
  const map = new Map();
  const order = [];

  for (const call of calls) {
    const date = new Date(call.started_at);
    // Use local date string as key (e.g. "4/29/2026")
    const key = date.toLocaleDateString();
    if (!map.has(key)) {
      map.set(key, { heading: formatDateHeading(date), calls: [] });
      order.push(key);
    }
    map.get(key).calls.push(call);
  }

  return order.map((key) => map.get(key));
}

// Generates a consistent background colour from a name string
const AVATAR_COLORS = [
  "#8A38F5", "#5B8AF5", "#F55B8A", "#38C9F5", "#F5A038",
  "#38F5A0", "#C938F5", "#F5385B", "#38F5C9", "#F5C938",
];
function avatarColor(name = "") {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function ParticipantAvatars({ participants = [] }) {
  return (
    <div className="participant-avatars">
      {participants.slice(0, 4).map((p, i) => (
        <span
          key={i}
          className="participant-avatar"
          style={{ background: avatarColor(p.name), zIndex: participants.length - i }}
          title={p.name}
        >
          {(p.name || "?")[0].toUpperCase()}
        </span>
      ))}
      {participants.length > 4 && (
        <span className="participant-avatar participant-avatar--overflow">
          +{participants.length - 4}
        </span>
      )}
    </div>
  );
}

function RecentCalls({ calls = [], onStartCall }) {
  if (calls.length === 0) {
    return (
      <div className="recent-calls-container">
        <h3 className="recent-calls-title">Recent calls</h3>
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg width="34" height="36" viewBox="0 0 34 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="34" height="36" rx="8" fill="#6686FF" fillOpacity="0.12" />
              <path d="M24 16.4H10M20.1111 10V13.2M13.8889 10V13.2M13.7333 26H20.2667C21.5735 26 22.2269 26 22.726 25.7384C23.165 25.5083 23.522 25.1412 23.7457 24.6896C24 24.1762 24 23.5041 24 22.16V15.44C24 14.0959 24 13.4238 23.7457 12.9104C23.522 12.4588 23.165 12.0917 22.726 11.8616C22.2269 11.6 21.5735 11.6 20.2667 11.6H13.7333C12.4265 11.6 11.7731 11.6 11.274 11.8616C10.835 12.0917 10.478 12.4588 10.2543 12.9104C10 13.4238 10 14.0959 10 15.44V22.16C10 23.5041 10 24.1762 10.2543 24.6896C10.478 25.1412 10.835 25.5083 11.274 25.7384C11.7731 26 12.4265 26 13.7333 26Z" stroke="#6686FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

  const groups = groupCallsByDate(calls);

  return (
    <div className="recent-calls-container">
      <h3 className="recent-calls-title">Recent calls</h3>
      <div className="calls-list">
        {groups.map((group) => (
          <div key={group.heading} className="call-group">
            <div className="call-date-heading">{group.heading}</div>
            {group.calls.map((call, index) => {
              const iconLetter = (call.description || call.client || "C")[0].toUpperCase();
              return (
                <div key={call._id || index} className="call-item">
                  <div className="call-icon">
                    <span className="call-icon-text">{iconLetter}</span>
                  </div>
                  <div className="call-details">
                    <span className="call-name">{call.description || "Design Call"}</span>
                    <ParticipantAvatars participants={call.participants || []} />
                  </div>
                  <div className="call-time-actions">
                    <span className="call-time">{formatTime(call.started_at)}</span>
                    <button className="call-action-btn" aria-label="More options">
                      <svg width="4" height="15" viewBox="0 0 4 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 8.3125C2.55228 8.3125 3 7.94873 3 7.5C3 7.05127 2.55228 6.6875 2 6.6875C1.44772 6.6875 1 7.05127 1 7.5C1 7.94873 1.44772 8.3125 2 8.3125Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M2 2.625C2.55228 2.625 3 2.26123 3 1.8125C3 1.36377 2.55228 1 2 1C1.44772 1 1 1.36377 1 1.8125C1 2.26123 1.44772 2.625 2 2.625Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M2 14C2.55228 14 3 13.6362 3 13.1875C3 12.7388 2.55228 12.375 2 12.375C1.44772 12.375 1 12.7388 1 13.1875C1 13.6362 1.44772 14 2 14Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>

                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(RecentCalls);
