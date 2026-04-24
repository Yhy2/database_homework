<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

import MetricCard from "../components/MetricCard.vue";
import PageHero from "../components/PageHero.vue";
import { listItems } from "../api/items";
import { listOrders } from "../api/orders";
import { getAggregateReports } from "../api/reports";
import { getHealth } from "../api/system";
import { listUsers } from "../api/users";
import { getErrorMessage } from "../utils/display";

const router = useRouter();
const loading = ref(false);

const healthLabel = ref("检测中");
const userCount = ref(0);
const itemCount = ref(0);
const orderCount = ref(0);
const unsoldCount = ref(0);
const averagePrice = ref("¥0.00");
const topSeller = ref("-");

const shortcuts = [
  {
    title: "商品管理",
    path: "/items",
    eyebrow: "Operations",
  },
  {
    title: "查询统计",
    path: "/stats",
    eyebrow: "Insights",
  },
  {
    title: "事务购买演示",
    path: "/purchase",
    eyebrow: "Transaction",
  },
];

async function loadDashboard() {
  loading.value = true;
  try {
    const [health, users, items, orders, aggregate] = await Promise.all([
      getHealth(),
      listUsers(),
      listItems(),
      listOrders(),
      getAggregateReports(),
    ]);

    healthLabel.value = health.database === "ok" ? "数据库连接正常" : "数据库异常";
    userCount.value = users.length;
    itemCount.value = items.length;
    orderCount.value = orders.length;
    unsoldCount.value = items.filter((item) => item.status === 0).length;
    averagePrice.value = `¥${aggregate.average_price.toFixed(2)}`;
    topSeller.value = `${aggregate.top_seller.user_name} (${aggregate.top_seller.item_count} 件)`;
  } catch (error) {
    ElMessage.error(getErrorMessage(error));
  } finally {
    loading.value = false;
  }
}

function openPage(path: string) {
  router.push(path);
}

onMounted(loadDashboard);
</script>

<template>
  <section class="page-section" v-loading="loading">
    <PageHero
      eyebrow="Campus Exchange Platform"
      title="数据库作业，也可以像企业官网一样呈现"
    >
      <template #actions>
        <el-button type="primary" @click="openPage('/stats')">查看系统能力</el-button>
        <el-button plain @click="openPage('/items')">进入商品管理</el-button>
      </template>

      <template #aside>
        <div class="hero-insight hero-insight--dark">
          <p class="hero-insight__eyebrow">运行状态</p>
          <strong class="hero-insight__value">{{ healthLabel }}</strong>
          <div class="hero-mini-grid">
            <div class="hero-mini-card">
              <span>用户</span>
              <strong>{{ userCount }}</strong>
            </div>
            <div class="hero-mini-card">
              <span>商品</span>
              <strong>{{ itemCount }}</strong>
            </div>
            <div class="hero-mini-card">
              <span>订单</span>
              <strong>{{ orderCount }}</strong>
            </div>
            <div class="hero-mini-card">
              <span>在售</span>
              <strong>{{ unsoldCount }}</strong>
            </div>
          </div>
        </div>
      </template>
    </PageHero>

    <div class="metric-grid">
      <MetricCard title="用户总数" :value="userCount" tone="sun" />
      <MetricCard title="商品总数" :value="itemCount" tone="sea" />
      <MetricCard title="订单总数" :value="orderCount" tone="ink" />
      <MetricCard title="在售商品" :value="unsoldCount" tone="sun" />
      <MetricCard title="平均价格" :value="averagePrice" tone="sea" />
      <MetricCard title="最多发布者" :value="topSeller" tone="ink" />
    </div>

    <section class="content-block">
      <header class="content-block__header">
        <p class="section-kicker">Entry Modules</p>
        <h2>核心业务入口</h2>
      </header>

      <div class="shortcut-grid">
        <article v-for="card in shortcuts" :key="card.path" class="shortcut-card">
          <div class="shortcut-card__copy">
            <p class="shortcut-card__eyebrow">{{ card.eyebrow }}</p>
            <h3>{{ card.title }}</h3>
          </div>
          <el-button type="primary" plain @click="openPage(card.path)">
            进入页面
          </el-button>
        </article>
      </div>
    </section>
  </section>
</template>
