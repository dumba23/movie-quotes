import axios from "@/plugins/axios/axios.js";

export const getNotifications = async (perPage = 5, page = 1) => {
  await axios.get("/sanctum/csrf-cookie");
  return await axios.get("/api/notifications", {
    params: {
      per_page: perPage,
      page,
    },
  });
};

export const addNotification = async (data) => {
  await axios.get("/sanctum/csrf-cookie");
  return await axios.post("/api/notifications", data);
};

export const markSelectedAsRead = async (notificationIds) => {
  await axios.get("/sanctum/csrf-cookie");
  return await axios.put(`/api/notifications/mark-selected-as-read`, {
    ids: notificationIds,
  });
};

export const markAllAsRead = async () => {
  await axios.get("/sanctum/csrf-cookie");
  return await axios.patch("/api/notifications/mark-all-as-read");
};
