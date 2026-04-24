<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { ElMessage } from "element-plus";

import PageHero from "../components/PageHero.vue";
import ResultTable from "../components/ResultTable.vue";
import { listOrders } from "../api/orders";
import type { Order, TableColumn } from "../types";
import { getErrorMessage } from "../utils/display";

const loading = ref(false);
const orders = ref<Order[]>([]);

const columns: TableColumn[] = [
  { key: "order_id", label: "订单编号", width: 120 },
  { key: "item_name", label: "商品名称", minWidth: 180 },
  { key: "buyer_name", label: "买家姓名", minWidth: 160 },
  { key: "seller_name", label: "卖家姓名", minWidth: 160 },
  { key: "order_date", label: "成交日期", minWidth: 140 },
];

const rows = computed(() => orders.value);
const orderCount = computed(() => orders.value.length);
const participantCount = computed(() => {
  const ids = new Set<string>();
  orders.value.forEach((order) => {
    ids.add(order.buyer_id);
    ids.add(order.seller_id);
  });
  return ids.size;
});
const latestOrderDate = computed(() =>
  [...orders.value]
    .sort((left, right) => right.order_date.localeCompare(left.order_date))[0]?.order_date ?? "-",
);

async function loadOrders() {
  loading.value = true;
  try {
    orders.value = await listOrders();
  } catch (error) {
    ElMessage.error(getErrorMessage(error));
  } finally {
    loading.value = false;
  }
}

onMounted(loadOrders);
</script>

<template>
  <section class="page-section" v-loading="loading">
    <PageHero
      eyebrow="Transaction Records"
      title="交易订单与成交留痕"
    >
      <template #actions>
        <el-button plain @click="loadOrders">刷新订单数据</el-button>
      </template>

      <template #aside>
        <div class="hero-insight">
          <p class="hero-insight__eyebrow">Order Snapshot</p>
          <strong class="hero-insight__value">{{ orderCount }} 笔成交记录</strong>

          <div class="hero-mini-grid hero-mini-grid--light">
            <div class="hero-mini-card hero-mini-card--light">
              <span>订单数</span>
              <strong>{{ orderCount }}</strong>
            </div>
            <div class="hero-mini-card hero-mini-card--light">
              <span>参与用户</span>
              <strong>{{ participantCount }}</strong>
            </div>
            <div class="hero-mini-card hero-mini-card--light">
              <span>最新成交日</span>
              <strong>{{ latestOrderDate }}</strong>
            </div>
          </div>
        </div>
      </template>
    </PageHero>

    <ResultTable
      title="平台订单"
      eyebrow="Order Ledger"
      :columns="columns"
      :rows="rows"
      :loading="loading"
      empty-text="暂无订单数据"
    />
  </section>
</template>
