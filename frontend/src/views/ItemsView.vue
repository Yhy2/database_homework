<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";

import ItemFormDialog from "../components/ItemFormDialog.vue";
import PageHero from "../components/PageHero.vue";
import { deleteItem, listItems, updateItemPrice } from "../api/items";
import { listUsers } from "../api/users";
import { useAuthSession } from "../auth/session";
import type { Item, User } from "../types";
import {
  formatCategory,
  formatPrice,
  formatStatus,
  getErrorMessage,
  statusTagType,
} from "../utils/display";

const loading = ref(false);
const router = useRouter();
const { isMerchantAuthenticated } = useAuthSession();
const dialogVisible = ref(false);
const priceDialogVisible = ref(false);
const items = ref<Item[]>([]);
const users = ref<User[]>([]);
const currentItem = ref<Item | null>(null);

const priceForm = reactive({
  price: 0,
});

const sortedItems = computed(() =>
  [...items.value].sort((left, right) => left.item_id.localeCompare(right.item_id)),
);

const itemCount = computed(() => items.value.length);
const unsoldCount = computed(() => items.value.filter((item) => item.status === 0).length);
const soldCount = computed(() => items.value.filter((item) => item.status === 1).length);
const sellerCount = computed(() => new Set(items.value.map((item) => item.seller_id)).size);
const canWrite = computed(() => isMerchantAuthenticated.value);

async function loadPageData() {
  loading.value = true;
  try {
    const [itemList, userList] = await Promise.all([listItems(), listUsers()]);
    items.value = itemList;
    users.value = userList;
  } catch (error) {
    ElMessage.error(getErrorMessage(error));
  } finally {
    loading.value = false;
  }
}

function openPriceDialog(item: Item) {
  if (!canWrite.value) {
    router.push("/login?redirect=/items");
    return;
  }

  currentItem.value = item;
  priceForm.price = Number(item.price);
  priceDialogVisible.value = true;
}

async function submitPriceUpdate() {
  if (!currentItem.value) {
    return;
  }

  if (!canWrite.value) {
    ElMessage.warning("请先登录账号");
    return;
  }

  try {
    await updateItemPrice(currentItem.value.item_id, priceForm.price);
    ElMessage.success("商品价格已更新");
    priceDialogVisible.value = false;
    await loadPageData();
  } catch (error) {
    ElMessage.error(getErrorMessage(error));
  }
}

async function removeCurrentItem(item: Item) {
  if (!canWrite.value) {
    router.push("/login?redirect=/items");
    return;
  }

  try {
    await ElMessageBox.confirm(
      `确认删除商品 ${item.item_name}（${item.item_id}）吗？`,
      "删除确认",
      {
        type: "warning",
        confirmButtonText: "确认删除",
        cancelButtonText: "取消",
      },
    );
    await deleteItem(item.item_id);
    ElMessage.success("商品已删除");
    await loadPageData();
  } catch (error) {
    if (error === "cancel") {
      return;
    }
    ElMessage.error(getErrorMessage(error));
  }
}

async function handleCreated() {
  await loadPageData();
}

function openCreateDialog() {
  if (!canWrite.value) {
    router.push("/login?redirect=/items");
    return;
  }

  dialogVisible.value = true;
}

onMounted(loadPageData);
</script>

<template>
  <section class="page-section" v-loading="loading">
    <PageHero
      eyebrow="Operations Control"
      title="商品台账与供给管理"
    >
      <template #actions>
        <el-button plain @click="loadPageData">刷新台账</el-button>
        <el-button
          v-if="canWrite"
          type="primary"
          @click="openCreateDialog"
        >
          新增商品
        </el-button>
        <el-button
          v-else
          type="primary"
          plain
          @click="openCreateDialog"
        >
          登录后上架
        </el-button>
      </template>

      <template #aside>
        <div class="hero-insight">
          <p class="hero-insight__eyebrow">Operations Snapshot</p>
          <strong class="hero-insight__value">{{ itemCount }} 件商品</strong>

          <div class="hero-mini-grid hero-mini-grid--light">
            <div class="hero-mini-card hero-mini-card--light">
              <span>商品总数</span>
              <strong>{{ itemCount }}</strong>
            </div>
            <div class="hero-mini-card hero-mini-card--light">
              <span>在售库存</span>
              <strong>{{ unsoldCount }}</strong>
            </div>
            <div class="hero-mini-card hero-mini-card--light">
              <span>已成交</span>
              <strong>{{ soldCount }}</strong>
            </div>
            <div class="hero-mini-card hero-mini-card--light">
              <span>卖家数</span>
              <strong>{{ sellerCount }}</strong>
            </div>
          </div>
        </div>
      </template>
    </PageHero>

    <section class="mode-banner" :class="{ 'mode-banner--active': canWrite }">
      <div>
        <p class="section-kicker">Access Mode</p>
        <h3>{{ canWrite ? "账号模式：可上架与维护商品" : "游客只读模式" }}</h3>
      </div>
      <p>
        {{
          canWrite
            ? "当前写操作会携带登录凭证，可新增商品、改价或删除未售商品。"
            : "当前只开放数据库读取结果，登录账号后才能上架商品。"
        }}
      </p>
    </section>

    <section class="panel-card">
      <header class="panel-card__header">
        <div>
          <p class="section-kicker">Item Ledger</p>
          <h3>商品数据库清单</h3>
        </div>
      </header>

      <el-table v-loading="loading" :data="sortedItems" border stripe empty-text="暂无商品数据">
        <el-table-column prop="item_id" label="商品编号" width="110" />
        <el-table-column prop="item_name" label="商品名称" min-width="160" />
        <el-table-column label="分类" min-width="130">
          <template #default="{ row }">
            {{ formatCategory(row.category) }}
          </template>
        </el-table-column>
        <el-table-column prop="seller_name" label="卖家" min-width="120" />
        <el-table-column label="价格" width="120">
          <template #default="{ row }">
            {{ formatPrice(row.price) }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="110">
          <template #default="{ row }">
            <el-tag :type="statusTagType(row.status)">
              {{ formatStatus(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="220" fixed="right">
          <template #default="{ row }">
            <div v-if="canWrite" class="table-actions">
              <el-button
                size="small"
                plain
                :disabled="row.status === 1"
                @click="openPriceDialog(row)"
              >
                改价
              </el-button>
              <el-button
                size="small"
                type="danger"
                plain
                :disabled="row.status === 1"
                @click="removeCurrentItem(row)"
              >
                删除
              </el-button>
            </div>
            <el-tag v-else type="info">登录后管理</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </section>

    <ItemFormDialog
      v-model="dialogVisible"
      :users="users"
      @submitted="handleCreated"
    />

    <el-dialog v-model="priceDialogVisible" title="修改商品价格" width="460px">
      <el-form label-position="top">
        <el-form-item label="商品">
          <el-input :model-value="currentItem?.item_name ?? ''" disabled />
        </el-form-item>
        <el-form-item label="新价格">
          <el-input-number
            v-model="priceForm.price"
            :min="0.01"
            :precision="2"
            style="width: 100%"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="priceDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitPriceUpdate">保存</el-button>
      </template>
    </el-dialog>
  </section>
</template>
