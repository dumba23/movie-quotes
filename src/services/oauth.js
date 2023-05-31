import axios from "@/plugins/axios/axios.js";

export const authWithGoogle = async () => {
  await axios.get("/sanctum/csrf-cookie").then(() => {
    location.href = "http://localhost:8000/auth/google/redirect";
  });
};
