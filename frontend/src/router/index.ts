import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("../pages/index.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
