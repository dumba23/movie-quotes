import axios from "@/plugins/axios/axios.js";

export const recoverByMail = async (data) => {
  return await axios.post("/api/recovery", data, {
    headers: { "Accept-Language": localStorage.getItem("locale") },
  });
};

export const checkTokenIsValid = async (token) => {
  return axios.get(`/api/recovery/validate?token=${token}`, {
    headers: { "Accept-Language": localStorage.getItem("locale") },
  });
};

export const changePassword = async (data, token) => {
  return axios.patch("/api/recovery/password/" + token, data, {
    headers: { "Accept-Language": localStorage.getItem("locale") },
  });
};
