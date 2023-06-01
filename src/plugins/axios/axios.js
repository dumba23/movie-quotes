import axios from "axios";

axios.defaults.withCredentials = true;

const defaultInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default defaultInstance;
