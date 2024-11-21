import axios from "axios";

// URL backend Strapi
const API_URL = "http://localhost:1337/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
