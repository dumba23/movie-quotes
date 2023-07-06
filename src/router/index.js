import { createRouter, createWebHistory } from "vue-router";
import LandingView from "@/views/LandingView.vue";
import ProfileView from "@/views/ProfileView.vue";
import MoviesView from "@/views/MoviesView.vue";
import MovieView from "@/views/MovieView.vue";
import NewsFeedView from "@/views/NewsFeedView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: LandingView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/movies",
      name: "movies",
      component: MoviesView,
    },
    {
      path: "/movies/:id",
      name: "movie",
      component: MovieView,
      props: true,
    },
    {
      path: "/news-feed",
      name: "news",
      component: NewsFeedView,
    },
  ],
});

export default router;
