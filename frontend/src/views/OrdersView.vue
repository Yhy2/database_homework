<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { ElMessage } from "element-plus";

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
  <section class="page-section">
    <header class="section-header">
      <div>
        <p class="section-kicker">交易数据</p>
        <h1>订单列表</h1>
        <p class="section-copy">
          订单页展示商品、买家、卖家和成交日期，便于直接对应连接查询与事务购买结果。
        </p>
      </div>

      <el-button plain @click="loadOrders">刷新数据</el-button>
    </header>

    <ResultTable
      title="平台订单"
      :columns="columns"
      :rows="rows"
      :loading="loading"
      empty-text="暂无订单数据"
    />
  </section>
</template>
