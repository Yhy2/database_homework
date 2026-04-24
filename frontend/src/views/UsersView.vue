<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { ElMessage } from "element-plus";

import PageHero from "../components/PageHero.vue";
import ResultTable from "../components/ResultTable.vue";
import { listUsers } from "../api/users";
import type { TableColumn, User } from "../types";
import { getErrorMessage } from "../utils/display";

const loading = ref(false);
const users = ref<User[]>([]);

const columns: TableColumn[] = [
  { key: "user_id", label: "用户编号", width: 120 },
  { key: "user_name", label: "用户名", minWidth: 180 },
  { key: "phone", label: "手机号", minWidth: 180 },
];

const userCount = computed(() => users.value.length);
const phoneCoverage = computed(() => users.value.filter((user) => user.phone).length);

async function loadUsers() {
  loading.value = true;
  try {
    users.value = await listUsers();
  } catch (error) {
    ElMessage.error(getErrorMessage(error));
  } finally {
    loading.value = false;
  }
}

onMounted(loadUsers);
</script>

<template>
  <section class="page-section" v-loading="loading">
    <PageHero
      eyebrow="Master Data"
      title="用户主数据与业务关联底座"
    >
      <template #actions>
        <el-button plain @click="loadUsers">刷新用户数据</el-button>
      </template>

      <template #aside>
        <div class="hero-insight hero-insight--dark">
          <p class="hero-insight__eyebrow">User Snapshot</p>
          <strong class="hero-insight__value">{{ userCount }} 位平台用户</strong>

          <div class="hero-mini-grid">
            <div class="hero-mini-card">
              <span>用户总数</span>
              <strong>{{ userCount }}</strong>
            </div>
            <div class="hero-mini-card">
              <span>手机号完整</span>
              <strong>{{ phoneCoverage }}</strong>
            </div>
          </div>
        </div>
      </template>
    </PageHero>

    <ResultTable
      title="平台用户"
      eyebrow="User Table"
      :columns="columns"
      :rows="users"
      :loading="loading"
      empty-text="暂无用户数据"
    />
  </section>
</template>
