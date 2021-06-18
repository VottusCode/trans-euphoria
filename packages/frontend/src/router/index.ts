import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { syncUser } from "./middleware/syncUser";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("../layouts/fullscreen.vue"),
    children: [
      {
        path: "/",
        component: () => import("../pages/index.vue"),
      },
      {
        path: "/pronouns/:id",
        component: () => import("../pages/pronouns.vue"),
      },
      {
        path: "/dashboard/profile",
        component: () => import("../pages/dashboard/profile.vue"),
        beforeEnter: syncUser(),
      },
      {
        path: "/dashboard/login",
        component: () => import("../pages/dashboard/login.vue"),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
