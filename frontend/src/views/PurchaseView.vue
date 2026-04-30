<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";

import PageHero from "../components/PageHero.vue";
import TransactionFlowGraphic from "../components/TransactionFlowGraphic.vue";
import { purchaseItem } from "../api/orders";
import { getBasicReports } from "../api/reports";
import { listUsers } from "../api/users";
import { useAuthSession } from "../auth/session";
import type { Item, User } from "../types";
import {
  formatCategory,
  formatPrice,
  getErrorMessage,
} from "../utils/display";

const loading = ref(false);
const router = useRouter();
const { isMerchantAuthenticated } = useAuthSession();
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

const availableCount = computed(() => unsoldItems.value.length);
const canWrite = computed(() => isMerchantAuthenticated.value);

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
  if (!canWrite.value) {
    router.push("/login?redirect=/purchase");
    return;
  }

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
  <section class="page-section" v-loading="loading">
    <PageHero
      eyebrow="Transactional Purchase"
      title="事务购买演示台"
    >
      <template #actions>
        <div class="action-row action-row--field">
          <span class="inline-field-label">选择成交买家</span>
          <el-select v-model="selectedBuyer" placeholder="选择买家" style="min-width: 220px">
            <el-option
              v-for="buyer in buyerOptions"
              :key="buyer.value"
              :label="buyer.label"
              :value="buyer.value"
            />
          </el-select>
        </div>
        <el-button plain @click="loadPurchaseData">刷新可购买商品</el-button>
        <el-button
          v-if="!canWrite"
          type="primary"
          plain
          @click="router.push('/login?redirect=/purchase')"
        >
          登录后购买
        </el-button>
      </template>

      <template #aside>
        <div class="hero-insight hero-insight--dark">
          <p class="hero-insight__eyebrow">Transaction Snapshot</p>
          <strong class="hero-insight__value">{{ availableCount }} 件可成交商品</strong>

          <div class="hero-mini-grid">
            <div class="hero-mini-card">
              <span>候选买家</span>
              <strong>{{ buyerOptions.length }}</strong>
            </div>
            <div class="hero-mini-card">
              <span>可购买商品</span>
              <strong>{{ availableCount }}</strong>
            </div>
          </div>
        </div>
      </template>
    </PageHero>

    <section class="mode-banner" :class="{ 'mode-banner--active': canWrite }">
      <div>
        <p class="section-kicker">Transaction Access</p>
        <h3>{{ canWrite ? "账号模式：可执行购买事务" : "游客只读模式" }}</h3>
      </div>
      <p>
        {{
          canWrite
            ? "购买会写入订单并更新商品状态，用于演示事务和重复购买拦截。"
            : "当前只展示可购买商品数据，登录后才会触发购买写操作。"
        }}
      </p>
    </section>

    <TransactionFlowGraphic />

    <section class="panel-card">
      <header class="panel-card__header">
        <div>
          <p class="section-kicker">Available Inventory</p>
          <h3>可购买商品清单</h3>
        </div>
      </header>

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
              :disabled="!selectedBuyer || !canWrite"
              @click="handlePurchase(row)"
            >
              {{ canWrite ? "立即购买" : "登录后购买" }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </section>
</template>
