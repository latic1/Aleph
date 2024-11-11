import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DetailView from "@/views/DetailView.vue";
import DefultLayout from "@/components/DefultLayout.vue";
import DashboardLayout from "@/components/dashboard/DashboardLayout.vue";
import DashboardView from "@/views/DashboardView.vue";
import PropertiesView from "@/views/PropertiesView.vue";
import CreatePropertyView from "@/views/CreatePropertyView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: DefultLayout,
      meta: { isGuest: true },

      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
        },
        {
          path: "property/:id",
          name: "detail",
          component: DetailView,
        },
        {
          path: "about",
          name: "about",
          component: () => import("../views/AboutView.vue"),
        },
      ],
    },
    {
      path: "/admin",
      component: DashboardLayout,
      meta: { requiresAuth: true },

      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: DashboardView,
        },
        {
          path: "properties",
          name: "properties",
          component: PropertiesView,
        },
        {
          path: "properties/create",
          name: "createProperties",
          component: CreatePropertyView,
        },
        {
          path: "offers",
          name: "offers",
          component: PropertiesView,
        },
      ],
    },
    {
      path: "/auth/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: { isGuest: true },

    },
    {
      path: "/auth/forgot-password",
      name: "forgotPassword",
      component: () => import("../views/ForgotPasswordView.vue"),
      meta: { isGuest: true },

    },
    {
      path: "/:catchAll(.*)",
      name: "notFound",
      component: () => import("../views/NotFound.vue"),

    }
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('TOKEN')) {
    next({ name: "login" });
  } else if (localStorage.getItem('TOKEN') && to.meta.isGuest) {
    next({ name: "dashboard" });
  } else {
    next();
  }
});

export default router;
