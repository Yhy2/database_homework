<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

import ItemFormDialog from "../components/ItemFormDialog.vue";
import { deleteItem, listItems, updateItemPrice } from "../api/items";
import { listUsers } from "../api/users";
import type { Item, User } from "../types";
import {
  formatCategory,
  formatPrice,
  formatStatus,
  getErrorMessage,
  statusTagType,
} from "../utils/display";

const loading = ref(false);
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
  currentItem.value = item;
  priceForm.price = Number(item.price);
  priceDialogVisible.value = true;
}

async function submitPriceUpdate() {
  if (!currentItem.value) {
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

onMounted(loadPageData);
</script>

<template>
  <section class="page-section">
    <header class="section-header">
      <div>
        <p class="section-kicker">数据操作</p>
        <h1>商品列表与 CRUD</h1>
        <p class="section-copy">
          这里展示数据库中的真实商品数据，并支持新增商品、修改未售商品价格、删除未售商品。
        </p>
      </div>

      <div class="action-row">
        <el-button plain @click="loadPageData">刷新数据</el-button>
        <el-button type="primary" @click="dialogVisible = true">新增商品</el-button>
      </div>
    </header>

    <section class="panel-card">
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
            <div class="table-actions">
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
          </template>
        </el-table-column>
      </el-table>
    </section>

    <ItemFormDialog
      v-model="dialogVisible"
      :users="users"
      @submitted="handleCreated"
    />

    <el-dialog v-model="priceDialogVisible" title="修改商品价格" width="420px">
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
