// ✅ src/api.js
import axios from "axios";

// Adjust to your backend URL if deployed
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// =========================
// 🔐 AUTH ENDPOINTS
// =========================

export const signupApi = async (username, email, password) => {
  try {
    const res = await API.post("/auth/signup", { username, email, password });
    return res.data;
  } catch (err) {
    console.error("Signup API Error:", err.response?.data || err.message);
    throw err;
  }
};

export const loginApi = async (email, password) => {
  try {
    const res = await API.post("/auth/login", { email, password });
    return res.data;
  } catch (err) {
    console.error("Login API Error:", err.response?.data || err.message);
    throw err;
  }
};

// =========================
// 🧱 PORTFOLIO ENDPOINTS
// =========================

export const savePortfolioApi = async (portfolio) => {
  try {
    const res = await API.post("/portfolios/save", portfolio);
    return res.data;
  } catch (err) {
    console.error("Save Portfolio Error:", err.response?.data || err.message);
    throw err;
  }
};

export const publishPortfolioApi = async (portfolio) => {
  try {
    const res = await API.post("/portfolios/publish", portfolio);
    return res.data;
  } catch (err) {
    console.error("Publish Portfolio Error:", err.response?.data || err.message);
    throw err;
  }
};

// ✅ Optional helper for adding Auth Token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
