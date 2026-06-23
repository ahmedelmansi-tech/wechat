import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" && "/api/v1",
  withCredentials: true,
});
