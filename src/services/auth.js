import axios from "@/plugins/axios/axios.js";

export const checkAuth = async () => {
  await axios.get("/sanctum/csrf-cookie");
  return await axios.get(`/api/auth/check`, { lang: "ka" });
};

export const authByDefault = async (data) => {
  await axios.get("/sanctum/csrf-cookie");

  return await axios.post("/api/login", data, {
    headers: { "Accept-Language": localStorage.getItem("locale") },
  });
};

export const logoutUser = async () => {
  await axios.get("/sanctum/csrf-cookie");
  return await axios.post("/api/logout");
};
