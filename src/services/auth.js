import axios from "@/plugins/axios/axios.js";

export const authByDefault = async (data) => {
  await axios.get("/sanctum/csrf-cookie");
  return await axios.post("/api/login", data);
};

export const logoutUser = async () => {
  await axios.get("/sanctum/csrf-cookie");
  return await axios.post("/api/logout");
};
