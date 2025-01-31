import axios from "axios";
import { getAccessToken } from "./auth";

export const axiosInstance = axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("token");
    const expiresIn = localStorage.getItem("expiresIns");
    if (!token || Date.now() >= +expiresIn) {
      token = await getAccessToken();
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.log(error);

    return null;
  }
);
