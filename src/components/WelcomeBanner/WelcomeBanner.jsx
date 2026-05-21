import React from "react";
import "./WelcomeBanner.css";

function WelcomeBanner({ userName = "User" }) {
  return (
    <div className="welcome-banner">
      <div className="welcome-text">
        <h2 className="welcome-title">
          Hi, {userName} 👋 Welcome to Hintro
        </h2>
        <p className="welcome-subtitle">
          Ready to make your next call smarter?
        </p>
      </div>

      <button className="start-call-btn">
        Start New Call
      </button>
    </div>
  );
}

export default React.memo(WelcomeBanner);
