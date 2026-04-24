<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

import { purchaseItem } from "../api/orders";
import { getBasicReports } from "../api/reports";
import { listUsers } from "../api/users";
import type { Item, User } from "../types";
import {
  formatCategory,
  formatPrice,
  getErrorMessage,
} from "../utils/display";

const loading = ref(false);
const submittingItemId = ref("");
const users = ref<User[]>([]);
const unsoldItems = ref<Item[]>([]);
const selectedBuyer = ref("");

const buyerOptions = computed(() =>
  users.value.map((user) => ({
    label: `${user.user_name} (${user.user_id})`,
    value: user.user_id,
  })),
);

async function loadPurchaseData() {
  loading.value = true;
  try {
    const [userList, basicReports] = await Promise.all([listUsers(), getBasicReports()]);
    users.value = userList;
    unsoldItems.value = basicReports.unsold_items;
    selectedBuyer.value ||= userList[0]?.user_id ?? "";
  } catch (error) {
    ElMessage.error(getErrorMessage(error));
  } finally {
    loading.value = false;
  }
}

async function handlePurchase(item: Item) {
  if (!selectedBuyer.value) {
    ElMessage.warning("请先选择买家");
    return;
  }

  try {
    await ElMessageBox.confirm(
      `确认由 ${selectedBuyer.value} 购买商品 ${item.item_name} 吗？`,
      "购买确认",
      {
        type: "warning",
        confirmButtonText: "确认购买",
        cancelButtonText: "取消",
      },
    );
    submittingItemId.value = item.item_id;
    await purchaseItem({
      item_id: item.item_id,
      buyer_id: selectedBuyer.value,
    });
    ElMessage.success("购买成功，订单已写入数据库");
    await loadPurchaseData();
  } catch (error) {
    if (error === "cancel") {
      return;
    }
    ElMessage.error(getErrorMessage(error));
  } finally {
    submittingItemId.value = "";
  }
}

onMounted(loadPurchaseData);
</script>

<template>
  <section class="page-section">
    <header class="section-header">
      <div>
        <p class="section-kicker">事务购买演示</p>
        <h1>只允许未售商品成交一次</h1>
        <p class="section-copy">
          点击购买后，后端会在一个事务中新增订单并把商品状态更新为已售，重复购买会被直接拒绝。
        </p>
      </div>

      <div class="action-row">
        <el-select v-model="selectedBuyer" placeholder="选择买家" style="min-width: 220px">
          <el-option
            v-for="buyer in buyerOptions"
            :key="buyer.value"
            :label="buyer.label"
            :value="buyer.value"
          />
        </el-select>
        <el-button plain @click="loadPurchaseData">刷新可购买商品</el-button>
      </div>
    </header>

    <section class="panel-card">
      <el-table
        v-loading="loading"
        :data="unsoldItems"
        border
        stripe
        empty-text="当前没有可购买的商品"
      >
        <el-table-column prop="item_id" label="商品编号" width="120" />
        <el-table-column prop="item_name" label="商品名称" min-width="180" />
        <el-table-column label="分类" min-width="140">
          <template #default="{ row }">
            {{ formatCategory(row.category) }}
          </template>
        </el-table-column>
        <el-table-column prop="seller_name" label="卖家" min-width="140" />
        <el-table-column label="价格" width="120">
          <template #default="{ row }">
            {{ formatPrice(row.price) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button
              type="primary"
              :loading="submittingItemId === row.item_id"
              :disabled="!selectedBuyer"
              @click="handlePurchase(row)"
            >
              立即购买
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </section>
</template>
