import axiosInstance from "./axios";
import { ENDPOINTS } from "./endpoints";
import { getUserHeaders } from "./index";

export const fetchProfile = async(userId) => {
    try {
        const response = await axiosInstance.get(
            ENDPOINTS.PROFILE,
            getUserHeaders(userId)
        )

        return response.data
    }
    catch (error) {
        console.error("Profile Fetch Error:", error)
        throw error
    }

}

export const fetchDashboard = async(userId) => {
    try {
        const response = await axiosInstance.get(
            ENDPOINTS.DASHBOARD,
            getUserHeaders(userId)
        )

        return response.data
    }
    catch (error) {
        console.error("Dashboard Fetch Error:", error)
        throw error
    }
}

export const fetchStats = async(userId) => {
    try {
        const response = await axiosInstance.get(
            ENDPOINTS.STATS,
            getUserHeaders(userId)
        )

        return response.data
    }
    catch (error) {
        console.error("Stats Fetch Error:", error)
        throw error
    }
}

export const fetchCallHistory = async(userId, limit=10) => {
    try {
        const response = await axiosInstance.get(
            `${ENDPOINTS.CALL_HISTORY}?limit=${limit}`,
            getUserHeaders(userId)
        )

        return response.data
    }
    catch (error) {
        console.error("Call History Fetch Error:", error)
        throw error
    }
}