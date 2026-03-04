import axios from "axios";

// Use relative API path in production, VITE_API_URL in development
const baseURL = import.meta.env.PROD ? "/api" : import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // by adding this field browser will send the cookies to server automatically, on every single req
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
