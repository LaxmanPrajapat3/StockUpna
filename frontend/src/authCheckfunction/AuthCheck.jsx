// src/components/AuthCheck.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthCheck = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:8000/verify", {
          method: "GET",
          credentials: "include", // Important: sends the cookie
        });

        if (res.status === 200) {
          setLoading(false); // Authenticated
        } else {
          navigate("/login"); // Redirect to login
        }
      } catch (error) {
        navigate("/login"); // Redirect on error
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) return <p className="text-center p-4">Checking authentication...</p>;

  return <>{children}</>;
};

export default AuthCheck;
