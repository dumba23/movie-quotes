import { defineStore } from "pinia";
import { getUserQuotesList, getQuotesList } from "@/services/quotes";

export const useQuotesStore = defineStore("quotes", {
  state: () => ({
    quotes: [],
    allQuotes: [],
  }),
  actions: {
    async initializeQuotesData() {
      try {
        const res = await getUserQuotesList();
        if (res.status === 200) {
          this.quotes = [...res.data.data];
        }
      } catch (error) {
        console.error(error);
      }
    },
    async initializeAllQuotesData() {
      try {
        const res = await getQuotesList();
        if (res.status === 200) {
          this.allQuotes = [...res.data.data];
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
