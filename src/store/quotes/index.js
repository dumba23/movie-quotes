import { defineStore } from "pinia";
import { getUserQuotesList } from "@/services/quotes";

export const useQuotesStore = defineStore("quotes", {
  state: () => ({
    quotes: [],
  }),
  actions: {
    async initializeQuotesData() {
      try {
        const res = await getUserQuotesList();
        if (res.status === 200) {
          this.quotes = [...res.data];
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
