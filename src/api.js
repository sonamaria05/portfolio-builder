import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

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

export const getMyPortfolioApi = async () => {
  try {
    const res = await API.get("/portfolios/me");
    return res.data;
  } catch (err) {
    console.error("Get Portfolio Error:", err.response?.data || err.message);
    throw err;
  }
};

export const getPublishedPortfolioApi = async (slug) => {
  try {
    const res = await API.get(`/portfolios/public/${encodeURIComponent(slug)}`);
    return res.data;
  } catch (err) {
    console.error("Get Published Portfolio Error:", err.response?.data || err.message);
    throw err;
  }
};

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
