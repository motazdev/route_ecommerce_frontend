import axios from "axios";

export default axios.create({
  baseURL: "https://route-ecommerce-lemon.vercel.app",
});

export const axiosPrivate = axios.create({
  baseURL: "https://route-ecommerce-lemon.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
