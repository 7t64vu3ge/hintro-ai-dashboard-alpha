import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import "./DashboardLayout.css";

function DashboardLayout({ children, user }) {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content-wrapper">
        <Header user={user} />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default React.memo(DashboardLayout);
