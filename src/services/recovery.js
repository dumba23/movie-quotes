import axios from "@/plugins/axios/axios.js";

export const recoverByMail = async (data) => {
  return await axios.post("/api/recovery", data);
};

export const checkTokenIsValid = async (token) => {
  return axios.get("/api/recovery/validate", { params: { token: token } });
};

export const changePassword = async (data, token) => {
  return axios.patch("/api/recovery/password/" + token, data);
};
