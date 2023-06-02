import axios from "@/plugins/axios/axios.js";

export const authWithGoogle = async () => {
  await axios.get("/sanctum/csrf-cookie").then(() => {
    location.href = import.meta.env.VITE_API_BASE_URL + "/auth/google/redirect";
  });
};
