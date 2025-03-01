import { login } from "../api/api";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Cookies from "js-cookie"; 

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const tokens = await login(username, password);
      Cookies.set("accessToken", tokens.access, { expires: 1 }); 
      Cookies.set("refreshToken", tokens.refresh, { expires: 7 });
      navigate("/me");
    } catch (error) {
      console.error("Login failed", error);
      setError("Login failed. Please check your username and password.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.title}>Login</h1>
        {error && <p className={styles.error}>{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleLogin} className={styles.button}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
