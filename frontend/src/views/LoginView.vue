<script setup lang="ts">
import { computed, reactive } from "vue";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";

import PageHero from "../components/PageHero.vue";
import {
  getExpectedDemoAccessToken,
  loginMerchant,
  useAuthSession,
} from "../auth/session";

const route = useRoute();
const router = useRouter();
const { isMerchantAuthenticated, activeMerchantName, logoutMerchant } = useAuthSession();

const expectedToken = getExpectedDemoAccessToken();

const form = reactive({
  merchantName: "Campus Merchant",
  accessToken: expectedToken,
});

const redirectTarget = computed(() => {
  const redirect = route.query.redirect;
  return typeof redirect === "string" && redirect.startsWith("/") ? redirect : "/items";
});

function submitLogin() {
  if (!form.merchantName.trim()) {
    ElMessage.warning("请输入商家名称");
    return;
  }

  if (form.accessToken !== expectedToken) {
    ElMessage.error("演示令牌不正确");
    return;
  }

  loginMerchant({
    merchantName: form.merchantName,
    accessToken: form.accessToken,
  });
  ElMessage.success("已进入商家模式");
  router.push(redirectTarget.value);
}

function leaveMerchantMode() {
  logoutMerchant();
  ElMessage.success("已退出商家模式");
  router.push("/");
}
</script>

<template>
  <section class="page-section">
    <PageHero
      eyebrow="Merchant Access"
      title="商家登录后开放商品上架"
    >
      <template #actions>
        <el-button plain @click="router.push('/')">返回首页</el-button>
        <el-button type="primary" @click="router.push('/items')">查看商品</el-button>
      </template>

      <template #aside>
        <div class="hero-insight hero-insight--dark">
          <p class="hero-insight__eyebrow">Access Mode</p>
          <strong class="hero-insight__value">
            {{ isMerchantAuthenticated ? "商家模式" : "游客只读模式" }}
          </strong>
          <div class="hero-mini-grid">
            <div class="hero-mini-card">
              <span>读取数据</span>
              <strong>开放</strong>
            </div>
            <div class="hero-mini-card">
              <span>上架商品</span>
              <strong>{{ isMerchantAuthenticated ? "开放" : "登录后" }}</strong>
            </div>
          </div>
        </div>
      </template>
    </PageHero>

    <section class="login-layout">
      <article class="login-card">
        <p class="section-kicker">Merchant Console</p>
        <h2>进入商家模式</h2>

        <el-form label-position="top" @submit.prevent>
          <el-form-item label="商家名称">
            <el-input v-model="form.merchantName" placeholder="例如 Campus Merchant" />
          </el-form-item>
          <el-form-item label="演示访问令牌">
            <el-input
              v-model="form.accessToken"
              placeholder="输入演示令牌"
              show-password
            />
          </el-form-item>
        </el-form>

        <div class="login-card__actions">
          <el-button type="primary" @click="submitLogin">登录并上架商品</el-button>
          <el-button
            v-if="isMerchantAuthenticated"
            plain
            @click="leaveMerchantMode"
          >
            退出当前商家
          </el-button>
        </div>
      </article>

      <aside class="access-card">
        <p class="section-kicker">Access Policy</p>
        <h3>当前权限边界</h3>
        <div class="access-rule">
          <strong>游客只读</strong>
          <span>可查看商品、用户、订单、查询统计，不会携带写接口令牌。</span>
        </div>
        <div class="access-rule">
          <strong>商家可写</strong>
          <span>登录后开放商品上架，并允许演示改价、删除和购买事务。</span>
        </div>
        <div class="access-rule">
          <strong>当前身份</strong>
          <span>{{ activeMerchantName }}</span>
        </div>
      </aside>
    </section>
  </section>
</template>
