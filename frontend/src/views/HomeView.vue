<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

import MetricCard from "../components/MetricCard.vue";
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
  { title: "商品管理", description: "新增商品、修改价格、删除未售商品", path: "/items" },
  { title: "数据查询", description: "查看连接查询、聚合结果和数据库视图", path: "/stats" },
  { title: "交易演示", description: "现场演示事务购买与重复购买限制", path: "/purchase" },
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
    <div class="hero-card">
      <div>
        <p class="section-kicker">校园二手交易平台</p>
        <h1>把数据库作业的每一条 SQL，都变成可见、可操作的网页流程。</h1>
        <p class="section-copy">
          本站围绕真实数据库数据展示、CRUD、连接查询、聚合统计、视图和事务购买来组织页面，
          方便你直接录屏和截图完成作业交付。
        </p>
      </div>

      <div class="hero-status">
        <span>系统状态</span>
        <strong>{{ healthLabel }}</strong>
      </div>
    </div>

    <div class="metric-grid">
      <MetricCard title="用户总数" :value="userCount" description="题目初始用户已导入" tone="sun" />
      <MetricCard title="商品总数" :value="itemCount" description="包含 1 条自定义商品数据" tone="sea" />
      <MetricCard title="订单总数" :value="orderCount" description="展示历史成交与新增订单" tone="ink" />
      <MetricCard title="在售商品" :value="unsoldCount" description="可直接用于购买演示" tone="sun" />
      <MetricCard title="平均价格" :value="averagePrice" description="数据库聚合统计结果" tone="sea" />
      <MetricCard title="最多发布者" :value="topSeller" description="按商品数量自动计算" tone="ink" />
    </div>

    <section class="shortcut-grid">
      <article v-for="card in shortcuts" :key="card.path" class="shortcut-card">
        <div>
          <h2>{{ card.title }}</h2>
          <p>{{ card.description }}</p>
        </div>
        <el-button type="primary" plain @click="openPage(card.path)">
          进入页面
        </el-button>
      </article>
    </section>
  </section>
</template>
