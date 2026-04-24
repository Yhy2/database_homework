<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";

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
  <section class="page-section">
    <header class="section-header">
      <div>
        <p class="section-kicker">基础数据</p>
        <h1>用户列表</h1>
        <p class="section-copy">
          所有用户数据都直接来自数据库中的 <code>user</code> 表，用于演示外键与业务关联。
        </p>
      </div>

      <el-button plain @click="loadUsers">刷新数据</el-button>
    </header>

    <ResultTable
      title="平台用户"
      :columns="columns"
      :rows="users"
      :loading="loading"
      empty-text="暂无用户数据"
    />
  </section>
</template>
