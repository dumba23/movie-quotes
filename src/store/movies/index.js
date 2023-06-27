import { defineStore } from "pinia";
import { getUserMoviesList, getUserMovie } from "@/services/movies";

export const useMoviesStore = defineStore("movies", {
  state: () => ({
    movies: [],
    movie: {},
  }),
  actions: {
    async initializeMoviesData() {
      try {
        const res = await getUserMoviesList();
        if (res.status === 200) {
          this.movies = [...res.data.data];
        }
      } catch (error) {
        console.error(error);
      }
    },
    async initializeMovieData(payload) {
      try {
        const res = await getUserMovie(payload.id);
        if (res.status === 200) this.movie = res.data;
      } catch (error) {
        console.error(error);
      }
    },
    clearMovieData() {
      this.movie = {};
    },
  },
});
