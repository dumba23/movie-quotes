import { defineStore } from "pinia";
import {
  getUserMoviesList,
  getUserMovie,
  getMoviesList,
} from "@/services/movies";

export const useMoviesStore = defineStore("movies", {
  state: () => ({
    allMovies: [],
    movies: [],
    movie: {},
  }),
  actions: {
    async initializeAllMoviesData() {
      try {
        const res = await getMoviesList();
        if (res.status === 200) {
          this.movies = [...res.data.data];
        }
      } catch (error) {
        console.error(error);
      }
    },
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
        if (res.status === 200) this.movie = res.data.data;
      } catch (error) {
        if (error.response.status) {
          window.location.replace("/403");
        }
      }
    },
    clearMovieData() {
      this.movie = {};
    },
    clearMoviesData() {
      this.movies = [];
    },
  },
});
