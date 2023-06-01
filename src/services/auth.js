import axios from "@/plugins/axios/axios.js";

export const authByDefault = async (data) => {
  await axios.get("/sanctum/csrf-cookie");
  return await axios.post("/api/login", data);
};
