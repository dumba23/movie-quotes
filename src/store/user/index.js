import { defineStore } from "pinia";
import { getUserData } from "@/services/user";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
  }),
  actions: {
    async initializeUserData() {
      try {
        const res = await getUserData();
        if (res.status === 200) {
          this.user = res.data.data;
        }
      } catch (error) {
        return;
      }
    },
  },
});
