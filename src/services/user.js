import axios from "axios";
import axiosInstance from "@/plugins/axios/axios.js";

export const getUserData = async () => {
  await axiosInstance.get("/sanctum/csrf-cookie");
  return await axiosInstance.get("/api/user", {
    headers: { "Accept-Language": localStorage.getItem("locale") },
  });
};

export const editUserData = async (data) => {
  await axiosInstance.get("/sanctum/csrf-cookie");
  return await axios.post(
    import.meta.env.VITE_API_BASE_URL + "/api/user/edit",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept-Language": localStorage.getItem("locale"),
      },
    }
  );
};
