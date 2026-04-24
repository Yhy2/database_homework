<script setup lang="ts">
import type { TableColumn } from "../types";

withDefaults(
  defineProps<{
    title?: string;
    eyebrow?: string;
    columns: TableColumn[];
    rows: Record<string, unknown>[];
    loading?: boolean;
    emptyText?: string;
  }>(),
  {
    title: "",
    eyebrow: "Result Set",
    loading: false,
    emptyText: "暂无数据",
  },
);
</script>

<template>
  <section class="result-table-card">
    <header v-if="title" class="result-table-card__header">
      <p class="result-table-card__eyebrow">{{ eyebrow }}</p>
      <h3 v-if="title" class="result-table-card__title">{{ title }}</h3>
    </header>

    <div class="result-table-card__body">
      <el-table
        v-loading="loading"
        class="result-table"
        :data="rows"
        border
        stripe
        :empty-text="emptyText"
      >
        <el-table-column
          v-for="column in columns"
          :key="column.key"
          :prop="column.key"
          :label="column.label"
          :min-width="column.minWidth ?? 120"
          :width="column.width"
          show-overflow-tooltip
        />
      </el-table>
    </div>
  </section>
</template>
