// src/context/UserContext.jsx
"use client";

import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { useRouter } from "next/navigation";

// Create user context
export const UserContext = createContext(null);

// Custom hook for accessing context
export const useUser = () => useContext(UserContext);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          router.push("/auth/login");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      fetchUser();
    } else {
      setLoading(false); // No need to load if user is already set
    }
  }, [user, router]);

  // Memoize context value to prevent re-renders
  const contextValue = useMemo(
    () => ({ user, setUser, loading, error }),
    [user, loading, error]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
