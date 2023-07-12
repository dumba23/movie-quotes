import { createRouter, createWebHistory } from "vue-router";
import LandingView from "@/views/LandingView.vue";
import ProfileView from "@/views/ProfileView.vue";
import MoviesView from "@/views/MoviesView.vue";
import MovieView from "@/views/MovieView.vue";
import NewsFeedView from "@/views/NewsFeedView.vue";
import ForbiddenView from "@/views/ForbiddenView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import isLoggedIn from "@/helpers/isLoggedIn";

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
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/movies",
      name: "movies",
      component: MoviesView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/movies/:id",
      name: "movie",
      component: MovieView,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/news-feed",
      name: "news",
      component: NewsFeedView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/403",
      name: "forbidden",
      component: ForbiddenView,
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const isLoggedInValue = await isLoggedIn();

    if (!isLoggedInValue) {
      next("/403");
    } else {
      if (to.name === "name") {
        next({ name: "news" });
      } else {
        next();
      }
    }
  } else if (to.name === "home" && (await isLoggedIn())) {
    next({ name: "news" });
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  const isExistingRoute = router.hasRoute(to.name);
  if (!isExistingRoute) {
    next({ name: "not-found" });
  } else {
    next();
  }
});

export default router;
