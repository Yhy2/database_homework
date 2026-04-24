<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { ElMessage } from "element-plus";

import MetricCard from "../components/MetricCard.vue";
import ResultTable from "../components/ResultTable.vue";
import {
  getAggregateReports,
  getBasicReports,
  getJoinReports,
  getSoldItemView,
  getUnsoldItemView,
} from "../api/reports";
import type {
  AggregateReports,
  BasicReports,
  JoinReports,
  TableColumn,
} from "../types";
import { formatCategory, formatPrice, getErrorMessage } from "../utils/display";

const loading = ref(false);
const basicReports = ref<BasicReports | null>(null);
const joinReports = ref<JoinReports | null>(null);
const aggregateReports = ref<AggregateReports | null>(null);
const soldView = ref<Array<{ item_name: string; buyer_id: string }>>([]);
const unsoldView = ref<
  Array<{
    item_id: string;
    item_name: string;
    category: string;
    price: number;
    seller_id: string;
  }>
>([]);

const itemColumns: TableColumn[] = [
  { key: "item_id", label: "商品编号", width: 120 },
  { key: "item_name", label: "商品名称", minWidth: 160 },
  { key: "category_label", label: "分类", minWidth: 140 },
  { key: "price_label", label: "价格", width: 120 },
  { key: "seller_id", label: "卖家编号", width: 120 },
];

const soldItemColumns: TableColumn[] = [
  { key: "item_name", label: "商品名称", minWidth: 180 },
  { key: "buyer_name", label: "买家姓名", minWidth: 160 },
];

const orderJoinColumns: TableColumn[] = [
  { key: "order_id", label: "订单编号", width: 120 },
  { key: "item_name", label: "商品名称", minWidth: 180 },
  { key: "buyer_name", label: "买家姓名", minWidth: 160 },
  { key: "order_date", label: "日期", minWidth: 140 },
];

const sellerStatusColumns: TableColumn[] = [
  { key: "item_id", label: "商品编号", width: 120 },
  { key: "item_name", label: "商品名称", minWidth: 180 },
  { key: "purchase_status", label: "购买状态", width: 130 },
  { key: "buyer_name", label: "买家姓名", minWidth: 160 },
];

const categoryCountColumns: TableColumn[] = [
  { key: "category_label", label: "分类", minWidth: 160 },
  { key: "item_count", label: "数量", width: 120 },
];

const soldViewColumns: TableColumn[] = [
  { key: "item_name", label: "商品名称", minWidth: 180 },
  { key: "buyer_id", label: "买家编号", width: 140 },
];

const unsoldViewColumns: TableColumn[] = [
  { key: "item_id", label: "商品编号", width: 120 },
  { key: "item_name", label: "商品名称", minWidth: 160 },
  { key: "category_label", label: "分类", minWidth: 140 },
  { key: "price_label", label: "价格", width: 120 },
  { key: "seller_id", label: "卖家编号", width: 120 },
];

const unsoldRows = computed(() =>
  (basicReports.value?.unsold_items ?? []).map((item) => ({
    ...item,
    category_label: formatCategory(item.category),
    price_label: formatPrice(item.price),
  })),
);

const priceAbove30Rows = computed(() =>
  (basicReports.value?.price_above_30 ?? []).map((item) => ({
    ...item,
    category_label: formatCategory(item.category),
    price_label: formatPrice(item.price),
  })),
);

const dailyGoodsRows = computed(() =>
  (basicReports.value?.daily_goods_items ?? []).map((item) => ({
    ...item,
    category_label: formatCategory(item.category),
    price_label: formatPrice(item.price),
  })),
);

const sellerRows = computed(() =>
  (basicReports.value?.seller_u001_items ?? []).map((item) => ({
    ...item,
    category_label: formatCategory(item.category),
    price_label: formatPrice(item.price),
  })),
);

const soldItemsWithBuyersRows = computed(() =>
  (joinReports.value?.sold_items_with_buyers ?? []).map((row) => ({
    item_name: row.item_name,
    buyer_name: row.buyer_name,
  })),
);

const orderJoinRows = computed(() => joinReports.value?.orders_with_item_and_buyer ?? []);

const sellerStatusRows = computed(() =>
  (joinReports.value?.u001_sales_status ?? []).map((row) => ({
    ...row,
    buyer_name: row.buyer_name || "-",
  })),
);

const categoryCountRows = computed(() =>
  (aggregateReports.value?.category_counts ?? []).map((row) => ({
    ...row,
    category_label: formatCategory(row.category),
  })),
);

const soldViewRows = computed(() => soldView.value);

const unsoldViewRows = computed(() =>
  unsoldView.value.map((row) => ({
    ...row,
    category_label: formatCategory(row.category),
    price_label: formatPrice(row.price),
  })),
);

async function loadReports() {
  loading.value = true;
  try {
    const [basic, join, aggregate, sold, unsold] = await Promise.all([
      getBasicReports(),
      getJoinReports(),
      getAggregateReports(),
      getSoldItemView(),
      getUnsoldItemView(),
    ]);

    basicReports.value = basic;
    joinReports.value = join;
    aggregateReports.value = aggregate;
    soldView.value = sold;
    unsoldView.value = unsold;
  } catch (error) {
    ElMessage.error(getErrorMessage(error));
  } finally {
    loading.value = false;
  }
}

onMounted(loadReports);
</script>

<template>
  <section class="page-section">
    <header class="section-header">
      <div>
        <p class="section-kicker">数据库查询展示</p>
        <h1>基本查询、连接查询、聚合统计与视图</h1>
        <p class="section-copy">
          每个表格都来自后端原生 SQL 查询或数据库视图，可直接作为作业截图与结果证明。
        </p>
      </div>

      <el-button plain @click="loadReports">刷新结果</el-button>
    </header>

    <div class="metric-grid" v-loading="loading">
      <MetricCard
        title="商品总数"
        :value="aggregateReports?.total_items ?? 0"
        description="聚合查询结果"
        tone="sun"
      />
      <MetricCard
        title="平均价格"
        :value="aggregateReports ? `¥${aggregateReports.average_price.toFixed(2)}` : '¥0.00'"
        description="所有商品平均价格"
        tone="sea"
      />
      <MetricCard
        title="发布最多的用户"
        :value="aggregateReports?.top_seller?.user_name ?? '-'"
        :description="aggregateReports ? `${aggregateReports.top_seller.item_count} 件商品` : ''"
        tone="ink"
      />
    </div>

    <div class="stats-grid">
      <ResultTable title="未售商品" :columns="itemColumns" :rows="unsoldRows" :loading="loading" />
      <ResultTable title="价格大于 30 的商品" :columns="itemColumns" :rows="priceAbove30Rows" :loading="loading" />
      <ResultTable title="生活用品类商品" :columns="itemColumns" :rows="dailyGoodsRows" :loading="loading" />
      <ResultTable title="u001 发布的商品" :columns="itemColumns" :rows="sellerRows" :loading="loading" />

      <ResultTable
        title="已售商品及买家姓名"
        :columns="soldItemColumns"
        :rows="soldItemsWithBuyersRows"
        :loading="loading"
      />
      <ResultTable
        title="订单商品 + 买家 + 日期"
        :columns="orderJoinColumns"
        :rows="orderJoinRows"
        :loading="loading"
      />
      <ResultTable
        title="u001 卖出的商品状态"
        :columns="sellerStatusColumns"
        :rows="sellerStatusRows"
        :loading="loading"
      />
      <ResultTable
        title="每类商品数量"
        :columns="categoryCountColumns"
        :rows="categoryCountRows"
        :loading="loading"
      />

      <ResultTable
        title="已售商品视图（sold_item_view）"
        :columns="soldViewColumns"
        :rows="soldViewRows"
        :loading="loading"
      />
      <ResultTable
        title="未售商品视图（unsold_item_view）"
        :columns="unsoldViewColumns"
        :rows="unsoldViewRows"
        :loading="loading"
      />
    </div>
  </section>
</template>
