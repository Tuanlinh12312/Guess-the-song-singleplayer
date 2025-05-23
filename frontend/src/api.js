import axios from "axios";

// const API_URL = "http://localhost:8080";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
