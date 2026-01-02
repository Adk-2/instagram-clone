import axios from "axios";

// Create axios instance
const API = axios.create({
  baseURL: "https://instagram-backend-4h4e.onrender.com/api"
});


// Add token to every request if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
