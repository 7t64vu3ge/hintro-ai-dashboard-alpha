import React from "react";
import "./Header.css";

function Header({ user }) {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h2 className="header-title">Dashboard</h2>
      </div>

      <div className="header-right">
        <button className="watch-tutorial-btn">
          <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 5.46708C13.3333 6.23689 13.3333 8.16139 12 8.93119L3 14.1273C1.66667 14.8971 0 13.9349 0 12.3953L0 2.00299C0 0.463385 1.66667 -0.498867 3 0.270933L12 5.46708Z" fill="black"/>
</svg>

          Watch tutorial
        </button>

        <div className="user-avatar-container">
          <div className="user-avatar">
            {user?.firstName?.charAt(0) || "U"}
          </div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="avatar-dropdown-icon">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </header>
  );
}

export default React.memo(Header);
