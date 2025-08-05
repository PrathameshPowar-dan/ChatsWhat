import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:7000/api" : "/api", // Force backend URL
  withCredentials: true,
});