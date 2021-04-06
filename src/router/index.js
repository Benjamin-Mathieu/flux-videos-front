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
      import("../components/LancerStream.vue")
  },
  {
    path: "/stream/:id",
    name: "ViewStream",
    component: () =>
      import("../views/WatchStream.vue")
  },
  {
    path: "/user",
    name: "Inscription",
    component: () =>
      import("../views/Inscription.vue")
  },
  {
    path: "/se-connecter",
    name: "connexion",
    component: () =>
    import("../views/Connexion.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
