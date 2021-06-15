import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

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
        path: "/dashboard/profile",
        component: () => import("../pages/dashboard/profile.vue"),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
