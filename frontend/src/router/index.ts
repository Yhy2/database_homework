import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import ItemsView from "../views/ItemsView.vue";
import LoginView from "../views/LoginView.vue";
import OrdersView from "../views/OrdersView.vue";
import PurchaseView from "../views/PurchaseView.vue";
import StatsView from "../views/StatsView.vue";
import UsersView from "../views/UsersView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/items",
      name: "items",
      component: ItemsView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/users",
      name: "users",
      component: UsersView,
    },
    {
      path: "/orders",
      name: "orders",
      component: OrdersView,
    },
    {
      path: "/stats",
      name: "stats",
      component: StatsView,
    },
    {
      path: "/purchase",
      name: "purchase",
      component: PurchaseView,
    },
  ],
});

export default router;
