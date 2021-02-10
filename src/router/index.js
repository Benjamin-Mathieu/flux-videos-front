import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/video",
    name: "Bibliothèque",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Bibliotheque.vue")
  },
  {
    path: "/subs",
    name: "Abonnement",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Abonnement.vue")
  },
  {
    path: "/settings",
    name: "Parametre",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Parametre.vue")
  },
  {
    path: "/stream",
    name: "Stream",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Stream.vue")
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
