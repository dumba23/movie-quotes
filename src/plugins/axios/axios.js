import axios from "axios";

axios.defaults.withCredentials = true;

const defaultInstance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default defaultInstance;
