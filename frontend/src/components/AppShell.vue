<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const navItems = [
  { label: "首页", path: "/" },
  { label: "商品列表", path: "/items" },
  { label: "用户列表", path: "/users" },
  { label: "订单列表", path: "/orders" },
  { label: "查询统计", path: "/stats" },
  { label: "购买演示", path: "/purchase" },
];

const activePath = computed(() => {
  const matched = navItems.find((item) =>
    item.path === "/" ? route.path === "/" : route.path.startsWith(item.path),
  );
  return matched?.path ?? "/";
});

function openHome() {
  router.push("/");
}
</script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <button class="brand-button" type="button" @click="openHome">
        <span class="brand-eyebrow">Database Homework</span>
        <span class="brand-title">Campus Exchange Studio</span>
      </button>

      <el-menu
        class="nav-menu"
        mode="horizontal"
        router
        :default-active="activePath"
      >
        <el-menu-item
          v-for="item in navItems"
          :key="item.path"
          :index="item.path"
        >
          {{ item.label }}
        </el-menu-item>
      </el-menu>
    </header>

    <main class="page-frame">
      <router-view />
    </main>
  </div>
</template>
