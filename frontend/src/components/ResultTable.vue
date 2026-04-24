<script setup lang="ts">
import type { TableColumn } from "../types";

withDefaults(
  defineProps<{
    title?: string;
    columns: TableColumn[];
    rows: Record<string, unknown>[];
    loading?: boolean;
    emptyText?: string;
  }>(),
  {
    title: "",
    loading: false,
    emptyText: "暂无数据",
  },
);
</script>

<template>
  <section class="panel-card">
    <header v-if="title" class="panel-card__header">
      <h3>{{ title }}</h3>
    </header>

    <el-table
      v-loading="loading"
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
  </section>
</template>
