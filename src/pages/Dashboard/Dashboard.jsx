import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useUser } from "../../context/UserContext";
import { fetchProfile, fetchDashboard, fetchStats, fetchCallHistory } from "../../api/dashboardApi";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import WelcomeBanner from "../../components/WelcomeBanner/WelcomeBanner";
import StatsCard from "../../components/StatsCard/StatsCard";
import RecentCalls from "../../components/RecentCalls/RecentCalls";
import "./Dashboard.css";

function Dashboard() {
  const { 
    userId,
    profile, setProfile,
    dashboardData, setDashboardData,
    statsData, setStatsData,
    callHistory, setCallHistory
  } = useUser();
  const [loading, setLoading] = useState(!profile);
  
  useEffect(() => {
    const loadData = async () => {
      if (profile && dashboardData && statsData && callHistory) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [profileRes, dashboardRes, statsRes, historyRes] = await Promise.allSettled([
          fetchProfile(userId),
          fetchDashboard(userId),
          fetchStats(userId),
          fetchCallHistory(userId, 10)
        ]);

        if (profileRes.status === "fulfilled")   setProfile(profileRes.value);
        if (dashboardRes.status === "fulfilled") setDashboardData(dashboardRes.value);
        if (statsRes.status === "fulfilled")     setStatsData(statsRes.value);
        if (historyRes.status === "fulfilled")   setCallHistory(historyRes.value?.callSessions || []);
        else console.warn("Call history could not be loaded:", historyRes.reason);
      } catch (error) {
        console.error("Error loading dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadData();
    }
  }, [userId, profile, dashboardData, statsData, callHistory, setProfile, setDashboardData, setStatsData, setCallHistory]);

  const handleStartCall = useCallback(() => {
    console.log("Start new call clicked");
  }, []);

  const statsList = useMemo(() => {
    const data = statsData || {};
    const totalSessions = data.totalSessions ?? 0;
    const averageDurationSec = data.averageDuration ?? 0;
    const totalAIInteractions = data.totalAIInteractions ?? 0;
    const lastSession = data.lastSession ?? [];

    let formattedDuration = "0";
    if (averageDurationSec > 0) {
      if (averageDurationSec >= 86400) {
        const days = Math.floor(averageDurationSec / 86400);
        const remainingSeconds = averageDurationSec % 86400;
        const hours = Math.floor(remainingSeconds / 3600);
        formattedDuration = hours > 0 ? `${days}d ${hours}h` : `${days} days`;
      } else {
        const minutes = Math.floor(averageDurationSec / 60);
        const seconds = averageDurationSec % 60;
        formattedDuration = `${minutes}m ${seconds}s`;
      }
    }

    let formattedLastSession = "-";
    if (lastSession && lastSession.length > 0) {
      formattedLastSession = "2 days ago";
    }

    return [
      {
        title: "Total Sessions",
        value: totalSessions,
        colorClass: "red",
        icon: (
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="50" rx="10" fill="#FFE1E1"/>
            <path d="M13.8 25C13.8 18.8144 18.8144 13.8 25 13.8V25H36.2C36.2 31.1856 31.1856 36.2 25 36.2C18.8144 36.2 13.8 31.1856 13.8 25Z" fill="#DE362A" fillOpacity="0.8"/>
            <path d="M27.8 14.1527C31.7357 15.1657 34.8343 18.2643 35.8472 22.2001H27.8V14.1527Z" fill="#DE362A" fillOpacity="0.8"/>
          </svg>
        )
      },
      {
        title: "Average Duration",
        value: formattedDuration,
        colorClass: "blue",
        icon: (
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="50" rx="10" fill="#E1FCFF"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M25 13.7998C31.1856 13.7998 36.2002 18.8144 36.2002 25C36.2002 31.1856 31.1856 36.2002 25 36.2002C18.8144 36.2002 13.7998 31.1856 13.7998 25C13.7998 18.8144 18.8144 13.7998 25 13.7998ZM25 18.4004C24.4477 18.4004 24 18.8481 24 19.4004V25C24.0001 25.265 24.1056 25.5196 24.293 25.707L28.2529 29.667C28.6434 30.0573 29.2765 30.0573 29.667 29.667C30.0573 29.2765 30.0573 28.6434 29.667 28.2529L26 24.5859V19.4004C26 18.8481 25.5523 18.4004 25 18.4004Z" fill="#4C9DA6"/>
          </svg>
        )
      },
      {
        title: "AI Used",
        value: totalAIInteractions ? `${totalAIInteractions} times` : "0",
        colorClass: "green",
        icon: (
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="50" rx="10" fill="#E1FFE4"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M21 15C21.4465 15 21.8389 15.296 21.9615 15.7253L23.0458 19.5202C23.5204 21.1812 24.8188 22.4796 26.4798 22.9542L30.2747 24.0385C30.704 24.1611 31 24.5535 31 25C31 25.4465 30.704 25.8389 30.2747 25.9615L26.4798 27.0458C24.8188 27.5204 23.5204 28.8188 23.0458 30.4798L21.9615 34.2747C21.8389 34.704 21.4465 35 21 35C20.5535 35 20.1611 34.704 20.0385 34.2747L18.9542 30.4798C18.4796 28.8188 17.1812 27.5204 15.5202 27.0458L11.7253 25.9615C11.296 25.8389 11 25.4465 11 25C11 24.5535 11.296 24.1611 11.7253 24.0385L15.5202 22.9542C17.1812 22.4796 18.4796 21.1812 18.9542 19.5202L20.0385 15.7253C20.1611 15.296 20.5535 15 21 15Z" fill="#499955"/>
          </svg>
        )
      },
      {
        title: "Last Session",
        value: formattedLastSession,
        colorClass: "purple",
        icon: (
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="50" rx="10" fill="#EBE1FF"/>
            <path d="M26 26C26 26.5523 25.5523 27 25 27C24.4477 27 24 26.5523 24 26C24 25.4477 24.4477 25 25 25C25.5523 25 26 25.4477 26 26Z" fill="#7B57C2"/>
            <path d="M19 30C19.5523 30 20 29.5523 20 29C20 28.4477 19.5523 28 19 28C18.4477 28 18 28.4477 18 29C18 29.5523 18.4477 30 19 30Z" fill="#7B57C2"/>
            <path d="M20 32C20 32.5523 19.5523 33 19 33C18.4477 33 18 32.5523 18 32C18 31.4477 18.4477 31 19 31C19.5523 31 20 31.4477 20 32Z" fill="#7B57C2"/>
            <path d="M22 30C22.5523 30 23 29.5523 23 29C23 28.4477 22.5523 28 22 28C21.4477 28 21 28.4477 21 29C21 29.5523 21.4477 30 22 30Z" fill="#7B57C2"/>
            <path d="M23 32C23 32.5523 22.5523 33 22 33C21.4477 33 21 32.5523 21 32C21 31.4477 21.4477 31 22 31C22.5523 31 23 31.4477 23 32Z" fill="#7B57C2"/>
            <path d="M25 30C25.5523 30 26 29.5523 26 29C26 28.4477 25.5523 28 25 28C24.4477 28 24 28.4477 24 29C24 29.5523 24.4477 30 25 30Z" fill="#7B57C2"/>
            <path d="M26 32C26 32.5523 25.5523 33 25 33C24.4477 33 24 32.5523 24 32C24 31.4477 24.4477 31 25 31C25.5523 31 26 31.4477 26 32Z" fill="#7B57C2"/>
            <path d="M28 30C28.5523 30 29 29.5523 29 29C29 28.4477 28.5523 28 28 28C27.4477 28 27 28.4477 27 29C27 29.5523 27.4477 30 28 30Z" fill="#7B57C2"/>
            <path d="M29 32C29 32.5523 28.5523 33 28 33C27.4477 33 27 32.5523 27 32C27 31.4477 27.4477 31 28 31C28.5523 31 29 31.4477 29 32Z" fill="#7B57C2"/>
            <path d="M31 30C31.5523 30 32 29.5523 32 29C32 28.4477 31.5523 28 31 28C30.4477 28 30 28.4477 30 29C30 29.5523 30.4477 30 31 30Z" fill="#7B57C2"/>
            <path d="M29 26C29 26.5523 28.5523 27 28 27C27.4477 27 27 26.5523 27 26C27 25.4477 27.4477 25 28 25C28.5523 25 29 25.4477 29 26Z" fill="#7B57C2"/>
            <path d="M31 27C31.5523 27 32 26.5523 32 26C32 25.4477 31.5523 25 31 25C30.4477 25 30 25.4477 30 26C30 26.5523 30.4477 27 31 27Z" fill="#7B57C2"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M18 12C18.5523 12 19 12.4477 19 13V15H31V13C31 12.4477 31.4477 12 32 12C32.5523 12 33 12.4477 33 13V15H34C36.2091 15 38 16.7909 38 19V34C38 36.2091 36.2091 38 34 38H16C13.7909 38 12 36.2091 12 34V19C12 16.7909 13.7909 15 16 15H17V13C17 12.4477 17.4477 12 18 12ZM36 24C36 22.8954 35.1046 22 34 22H16C14.8954 22 14 22.8954 14 24V34C14 35.1046 14.8954 36 16 36H34C35.1046 36 36 35.1046 36 34V24Z" fill="#7B57C2"/>
          </svg>
        )
      }
    ];
  }, [statsData]);

  if (loading) {
    return <div className="loading-state">Loading dashboard...</div>;
  }

  return (
    <DashboardLayout user={profile}>
      <div className="dashboard-content">
        <WelcomeBanner userName={profile?.firstName || "User"} />
        
        <div className="stats-grid">
          {statsList.map((stat, idx) => (
            <StatsCard 
              key={idx}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              colorClass={stat.colorClass}
            />
          ))}
        </div>

        <RecentCalls calls={callHistory} onStartCall={handleStartCall} />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
