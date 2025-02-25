import axios from "axios";

const BASE_URL = "http://185.231.180.66:8000";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/token/`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/token/refresh/`, {
      refresh: refreshToken,
    });
    return response.data;
  } catch (error) {
    console.error("Token refresh failed", error);
    throw error;
  }
};

export const getUserData = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user data", error);
    throw error;
  }
};
