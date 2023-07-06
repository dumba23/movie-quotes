import { defineStore } from "pinia";
import { getNotifications } from "@/services/notification";

export const useNotificationsStore = defineStore("notifications", {
  state: () => ({
    notifications: [],
  }),
  actions: {
    async initializeNotificationsData() {
      try {
        const res = await getNotifications();
        if (res.status === 200) {
          this.notifications = [...res.data];
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
