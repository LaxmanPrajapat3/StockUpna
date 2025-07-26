// src/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost:8000/verify", {
        method: "GET",
        credentials: "include"
      });
      setIsLoggedIn(res.status === 200);
    } catch {
      setIsLoggedIn(false);
    } finally {
      setLoading(false); // ✅ Mark auth check complete
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, checkAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
