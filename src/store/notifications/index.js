import { defineStore } from "pinia";
import { getNotifications, markSelectedAsRead } from "@/services/notification";

export const useNotificationsStore = defineStore("notifications", {
  state: () => ({
    notifications: [],
    currentPage: 1,
    lastPage: 1,
    perPage: 5,
    total: 0,
  }),
  actions: {
    async markVisibleAsRead() {
      try {
        const visibleNotificationIds = this.notifications.map(
          (notification) => notification.id
        );

        if (visibleNotificationIds.length > 0) {
          await markSelectedAsRead(visibleNotificationIds);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async initializeNotificationsData() {
      try {
        const res = await getNotifications(this.perPage, this.currentPage);

        if (res.status === 200) {
          const { notifications, pagination } = res.data;
          this.notifications = [...notifications];
          this.currentPage = pagination.current_page;
          this.lastPage = pagination.last_page;
          this.perPage = pagination.per_page;
          this.total = pagination.total;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async loadMoreNotifications() {
      if (this.currentPage < this.lastPage) {
        try {
          const nextPage = this.currentPage + 1;
          const res = await getNotifications(this.perPage, nextPage);
          if (res.status === 200) {
            const { notifications, pagination } = res.data;
            this.notifications = [...this.notifications, ...notifications];
            this.currentPage = pagination.current_page;
            this.markVisibleAsRead();
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
});
