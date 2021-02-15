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
      import("../views/Bibliotheque.vue")
  },
  {
    path: "/subs",
    name: "Abonnement",
    component: () =>
      import("../views/Abonnement.vue")
  },
  {
    path: "/settings",
    name: "Parametre",
    component: () =>
      import("../views/Parametre.vue")
  },
  {
    path: "/stream",
    name: "Stream",
    component: () =>
      import("../views/Stream.vue")
  },
  {
    path: "/watch",
    name: "Watch",
    component: () =>
      import("../views/Watch.vue")
  },
  {
    path: "/user",
    name: "Inscription",
    component: () =>
      import("../views/Inscription.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
