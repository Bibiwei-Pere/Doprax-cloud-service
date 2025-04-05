import { createRouter, createWebHistory } from "vue-router";
import Service from "../views/Service.vue";
import Home from "@/views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/service",
      name: "service",
      component: Service,
    },
  ],
});

export default router;
