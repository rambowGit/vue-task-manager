import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "create",
    component: () => import("../views/CreatePage.vue"),
  },
  {
    path: "/list",
    name: "list",
    component: () => import("../views/ListPage.vue"),
  },
  {
    path: "/task/:id",
    name: "task",
    component: () => import("../views/TaskPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
