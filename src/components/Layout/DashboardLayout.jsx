import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import "./DashboardLayout.css";

function DashboardLayout({ children, user, title }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={isMobileSidebarOpen} onClose={closeSidebar} />
      <div className="main-content-wrapper">
        <Header user={user} title={title} onMenuClick={toggleSidebar} />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default React.memo(DashboardLayout);
