import defaultInstance from "@/plugins/axios/axios.js";

export const registerUser = async (data) => {
  return defaultInstance.post("/api/register", data, {
    headers: { "Accept-Language": localStorage.getItem("locale") },
  });
};
