import { getUserData, refreshToken } from "../api/api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Me.module.css";

const Me = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let accessToken = localStorage.getItem("accessToken");
      const refreshTokenValue = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshTokenValue) {
        navigate("/login");
        return;
      }

      try {
        const data = await getUserData(accessToken);
        setUserData(data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          try {
            const newTokens = await refreshToken(refreshTokenValue);
            localStorage.setItem("accessToken", newTokens.access);
            localStorage.setItem("refreshToken", newTokens.refresh);
            const data = await getUserData(newTokens.access);
            setUserData(data);
          } catch (refreshError) {
            console.error("Token refresh failed", refreshError);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            navigate("/login");
          }
        } else {
          console.error("Failed to fetch user data", error);
          navigate("/login");
        }
      }
    };

    fetchData();

    const timer = setTimeout(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    }, 120000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <h1 className={styles.title}>User Profile</h1>
        {userData && (
          <pre className={styles.data}>{JSON.stringify(userData, null, 2)}</pre>
        )}
        <button className={styles.logoutButton} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Me;
