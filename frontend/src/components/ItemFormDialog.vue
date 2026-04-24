<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";

import { createItem } from "../api/items";
import type { CreateItemPayload, User } from "../types";
import { formatCategory, getErrorMessage } from "../utils/display";

const props = defineProps<{
  modelValue: boolean;
  users: User[];
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
  (event: "submitted"): void;
}>();

const visible = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit("update:modelValue", value),
});

const formRef = ref<FormInstance>();
const loading = ref(false);
const categoryOptions = ["Book", "DailyGoods", "Electronics", "Furniture"];

const form = reactive<CreateItemPayload>({
  item_id: "",
  item_name: "",
  category: "Book",
  price: 20,
  seller_id: "",
});

const rules: FormRules<CreateItemPayload> = {
  item_id: [{ required: true, message: "请输入商品编号", trigger: "blur" }],
  item_name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
  category: [{ required: true, message: "请选择分类", trigger: "change" }],
  price: [{ required: true, message: "请输入价格", trigger: "change" }],
  seller_id: [{ required: true, message: "请选择卖家", trigger: "change" }],
};

function resetForm() {
  form.item_id = "";
  form.item_name = "";
  form.category = "Book";
  form.price = 20;
  form.seller_id = props.users[0]?.user_id ?? "";
  formRef.value?.clearValidate();
}

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      resetForm();
    }
  },
);

watch(
  () => props.users,
  (users) => {
    if (!form.seller_id && users.length > 0) {
      form.seller_id = users[0].user_id;
    }
  },
  { immediate: true },
);

async function handleSubmit() {
  await formRef.value?.validate();
  loading.value = true;

  try {
    await createItem({
      ...form,
      price: Number(form.price),
    });
    ElMessage.success("商品已新增");
    visible.value = false;
    emit("submitted");
  } catch (error) {
    ElMessage.error(getErrorMessage(error));
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <el-dialog v-model="visible" title="新增商品" width="560px">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
      <el-form-item label="商品编号" prop="item_id">
        <el-input v-model="form.item_id" placeholder="例如 i101" />
      </el-form-item>

      <el-form-item label="商品名称" prop="item_name">
        <el-input v-model="form.item_name" placeholder="例如 Arduino Kit" />
      </el-form-item>

      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="分类" prop="category">
            <el-select v-model="form.category" style="width: 100%">
              <el-option
                v-for="option in categoryOptions"
                :key="option"
                :label="formatCategory(option)"
                :value="option"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="价格" prop="price">
            <el-input-number
              v-model="form.price"
              :min="0.01"
              :precision="2"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="卖家" prop="seller_id">
        <el-select v-model="form.seller_id" style="width: 100%">
          <el-option
            v-for="user in users"
            :key="user.user_id"
            :label="`${user.user_name} (${user.user_id})`"
            :value="user.user_id"
          />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit">
        创建商品
      </el-button>
    </template>
  </el-dialog>
</template>
