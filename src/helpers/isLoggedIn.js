import { checkAuth } from "@/services/auth";

export default async function isLoggedIn() {
  try {
    const response = await checkAuth();
    if (response.status === 200) {
      localStorage.setItem("authenticated", true);
    }
    return response.data.authenticated;
  } catch (error) {
    return false;
  }
}
