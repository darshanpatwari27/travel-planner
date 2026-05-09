import axios from "axios";

const API = axios.create({
  baseURL: "https://travel-planner-backend-np1b.onrender.com/api",
});

export default API;