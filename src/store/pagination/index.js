import { defineStore } from "pinia";

export const usePaginationStore = defineStore("pagination", {
  state: () => ({
    modalName: null,
  }),
  getters: {
    activeModalName: (state) => state.modalName,
  },
  actions: {
    updateModalName(payload) {
      this.modalName = payload.name;
    },
  },
});
