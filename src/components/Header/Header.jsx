import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./Header.css";
import "./LogoutPopup.css";

function Header({ user, title }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const dropdownRef = useRef(null);
  const { setUserId } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setUserId("");
    navigate("/login");
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h2 className="header-title">{title || "Dashboard"}</h2>
      </div>

      <div className="header-right">
        <button className="watch-tutorial-btn">
          <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5.46708C13.3333 6.23689 13.3333 8.16139 12 8.93119L3 14.1273C1.66667 14.8971 0 13.9349 0 12.3953L0 2.00299C0 0.463385 1.66667 -0.498867 3 0.270933L12 5.46708Z" fill="black" />
          </svg>

          Watch tutorial
        </button>

        <div className="user-avatar-container" ref={dropdownRef} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <div className="user-avatar">
            {user?.firstName?.charAt(0) || "U"}
          </div>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.4064 6.47277L9.69104 11.1881C9.13417 11.745 8.22292 11.745 7.66604 11.1881L2.95068 6.47277" stroke="#444750" stroke-width="1.08482" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

          {isDropdownOpen && (
            <div className="logout-dropdown">
              <button className="logout-btn" onClick={() => setShowLogoutPopup(true)}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.16667 3.16667L12.5 6.5L9.16667 9.83333M12.5 6.5H4.5M4.5 0.5H3.7C2.5799 0.5 2.01984 0.5 1.59202 0.717987C1.2157 0.909734 0.909734 1.21569 0.717988 1.59202C0.5 2.01984 0.5 2.57989 0.5 3.7V9.3C0.5 10.4201 0.5 10.9802 0.717987 11.408C0.909734 11.7843 1.21569 12.0903 1.59202 12.282C2.01984 12.5 2.5799 12.5 3.7 12.5H4.5" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                Log out
              </button>
            </div>
          )}
        </div>
      </div>

      {showLogoutPopup && ReactDOM.createPortal(
        <div className="logout-popup-overlay" onClick={() => setShowLogoutPopup(false)}>
          <div className="logout-popup" onClick={(e) => e.stopPropagation()}>
            <h3 className="logout-popup-title">Leaving already?</h3>
            <div className="logout-popup-divider"></div>
            <p className="logout-popup-body">
              You can log back in anytime to continue your meetings with Hintro.
            </p>
            <div className="logout-popup-actions">
              <button className="logout-popup-cancel" onClick={() => setShowLogoutPopup(false)}>
                Cancel
              </button>
              <button className="logout-popup-confirm" onClick={handleLogout}>
                Log out
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}

export default React.memo(Header);
