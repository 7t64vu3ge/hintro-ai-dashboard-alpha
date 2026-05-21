import { createContext, useContext, useState } from "react";

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(() => localStorage.getItem("userId") || "u1")
    const [profile, setProfile] = useState(null)

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(null)

    return (
        <UserContext.Provider
            value={{
                userId,
                setUserId,

                profile,
                setProfile,

                loading,
                setLoading,

                error,
                setError,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
  return useContext(UserContext)
}