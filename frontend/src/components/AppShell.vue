<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthSession } from "../auth/session";

const route = useRoute();
const router = useRouter();
const { activeMerchantName, isMerchantAuthenticated, logoutMerchant } = useAuthSession();

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

function openPage(path: string) {
  router.push(path);
}

function openLogin() {
  router.push({
    path: "/login",
    query: { redirect: route.fullPath },
  });
}

function exitMerchantMode() {
  logoutMerchant();
}
</script>

<template>
  <div class="app-shell">
    <div class="app-shell__backdrop" />

    <header class="site-header">
      <div class="site-header__inner">
        <button class="brand-mark" type="button" @click="openHome">
          <span class="brand-mark__eyebrow">Campus Exchange Platform</span>
          <span class="brand-mark__title">校园二手交易平台</span>
          <span class="brand-mark__subtitle">Database System Showcase</span>
        </button>

        <nav class="site-nav" aria-label="主导航">
          <button
            v-for="item in navItems"
            :key="item.path"
            class="nav-item"
            :class="{ 'is-active': activePath === item.path }"
            type="button"
            @click="openPage(item.path)"
          >
            {{ item.label }}
          </button>
        </nav>

        <div class="site-header__actions">
          <span
            class="session-pill"
            :class="{ 'session-pill--active': isMerchantAuthenticated }"
          >
            {{ isMerchantAuthenticated ? `商家：${activeMerchantName}` : "游客只读模式" }}
          </span>
          <button
            v-if="isMerchantAuthenticated"
            class="auth-button"
            type="button"
            @click="exitMerchantMode"
          >
            退出登录
          </button>
          <button
            v-else
            class="auth-button auth-button--primary"
            type="button"
            @click="openLogin"
          >
            商家登录
          </button>
        </div>
      </div>
    </header>

    <main class="page-frame">
      <router-view v-slot="{ Component, route }">
        <Transition name="page-route" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </Transition>
      </router-view>
    </main>
  </div>
</template>
