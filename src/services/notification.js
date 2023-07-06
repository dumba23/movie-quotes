import axios from "@/plugins/axios/axios.js";

export const getNotifications = async () => {
  await axios.get("/sanctum/csrf-cookie");
  return await axios.get("/api/notification");
};

export const addNotification = async (data) => {
  await axios.get("/sanctum/csrf-cookie");
  return await axios.post("/api/notification", data);
};

export const markNotificationAsRead = async (id) => {
  await axios.get("/sanctum/csrf-cookie");
  return await axios.post(`/api/notifications${id}`);
};

export const markAllAsRead = async () => {
  await axios.get("/sanctum/csrf-cookie");
  return await axios.patch("/api/notification/mark-all-as-read");
};
