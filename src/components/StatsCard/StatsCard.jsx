import React from "react";
import "./StatsCard.css";

function StatsCard({ title, value, icon, colorClass }) {
  return (
    <div className="stats-card">
      <div className={`stats-icon-container ${colorClass}`}>
        {icon}
      </div>
      <div className="stats-content">
        <h3 className="stats-title">{title}</h3>
        <p className="stats-value">{value}</p>
      </div>
    </div>
  );
}

export default React.memo(StatsCard);
