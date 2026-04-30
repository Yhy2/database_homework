<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";

import { login, loginDemoAccount, register } from "../api/auth";
import LoginAccessGraphic from "../components/LoginAccessGraphic.vue";
import PageHero from "../components/PageHero.vue";
import { saveAuthSession, useAuthSession } from "../auth/session";
import { getErrorMessage } from "../utils/display";

const route = useRoute();
const router = useRouter();
const { isAuthenticated, activeUserName, logoutMerchant } = useAuthSession();

const mode = ref<"login" | "register">("login");
const submitting = ref(false);
const demoLoading = ref(false);

const loginForm = reactive({
  user_id: "",
  password: "",
});

const registerForm = reactive({
  user_id: "",
  user_name: "",
  phone: "",
  password: "",
});

const redirectTarget = computed(() => {
  const redirect = route.query.redirect;
  return typeof redirect === "string" && redirect.startsWith("/") ? redirect : "/items";
});

function finishLogin(session: Awaited<ReturnType<typeof login>>) {
  saveAuthSession(session);
  ElMessage.success(`已登录：${session.user.user_name}`);
  router.push(redirectTarget.value);
}

async function submitLogin() {
  if (!loginForm.user_id.trim() || !loginForm.password) {
    ElMessage.warning("请输入用户编号和密码");
    return;
  }

  submitting.value = true;
  try {
    finishLogin(await login({ ...loginForm, user_id: loginForm.user_id.trim() }));
  } catch (error) {
    ElMessage.error(getErrorMessage(error));
  } finally {
    submitting.value = false;
  }
}

async function submitRegister() {
  if (
    !registerForm.user_id.trim() ||
    !registerForm.user_name.trim() ||
    !registerForm.phone.trim() ||
    !registerForm.password
  ) {
    ElMessage.warning("请完整填写注册信息");
    return;
  }

  submitting.value = true;
  try {
    finishLogin(
      await register({
        user_id: registerForm.user_id.trim(),
        user_name: registerForm.user_name.trim(),
        phone: registerForm.phone.trim(),
        password: registerForm.password,
      }),
    );
  } catch (error) {
    ElMessage.error(getErrorMessage(error));
  } finally {
    submitting.value = false;
  }
}

async function useDemoAccount() {
  demoLoading.value = true;
  try {
    finishLogin(await loginDemoAccount());
  } catch (error) {
    ElMessage.error(getErrorMessage(error));
  } finally {
    demoLoading.value = false;
  }
}

function leaveCurrentAccount() {
  logoutMerchant();
  ElMessage.success("已退出登录");
  router.push("/");
}
</script>

<template>
  <section class="page-section">
    <PageHero
      eyebrow="Account Access"
      title="登录或注册后开放商品上架"
    >
      <template #actions>
        <el-button plain @click="router.push('/')">返回首页</el-button>
        <el-button type="primary" @click="router.push('/items')">查看商品</el-button>
      </template>

      <template #aside>
        <div class="hero-insight hero-insight--dark">
          <p class="hero-insight__eyebrow">Access Mode</p>
          <strong class="hero-insight__value">
            {{ isAuthenticated ? `已登录：${activeUserName}` : "游客只读模式" }}
          </strong>
          <div class="hero-mini-grid">
            <div class="hero-mini-card">
              <span>读取数据</span>
              <strong>开放</strong>
            </div>
            <div class="hero-mini-card">
              <span>写入操作</span>
              <strong>{{ isAuthenticated ? "开放" : "登录后" }}</strong>
            </div>
          </div>
        </div>
      </template>
    </PageHero>

    <LoginAccessGraphic />

    <section class="login-layout">
      <article class="login-card">
        <p class="section-kicker">Account Console</p>
        <h2>{{ mode === "login" ? "账号登录" : "注册新账号" }}</h2>

        <el-segmented
          v-model="mode"
          :options="[
            { label: '登录', value: 'login' },
            { label: '注册', value: 'register' },
          ]"
        />

        <el-form v-if="mode === 'login'" label-position="top" @submit.prevent>
          <el-form-item label="用户编号">
            <el-input v-model="loginForm.user_id" placeholder="例如 u001" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              v-model="loginForm.password"
              placeholder="输入密码"
              show-password
              @keyup.enter="submitLogin"
            />
          </el-form-item>
        </el-form>

        <el-form v-else label-position="top" @submit.prevent>
          <el-form-item label="用户编号">
            <el-input v-model="registerForm.user_id" placeholder="例如 u101" />
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="registerForm.user_name" placeholder="例如 ChenQi" />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="registerForm.phone" placeholder="例如 13900000001" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              v-model="registerForm.password"
              placeholder="至少 6 位"
              show-password
              @keyup.enter="submitRegister"
            />
          </el-form-item>
        </el-form>

        <div class="login-card__actions">
          <el-button
            type="primary"
            :loading="submitting"
            @click="mode === 'login' ? submitLogin() : submitRegister()"
          >
            {{ mode === "login" ? "登录并进入" : "注册并登录" }}
          </el-button>
          <el-button plain :loading="demoLoading" @click="useDemoAccount">
            一键演示登录
          </el-button>
          <el-button
            v-if="isAuthenticated"
            plain
            @click="leaveCurrentAccount"
          >
            退出当前账号
          </el-button>
        </div>
      </article>

      <aside class="access-card">
        <p class="section-kicker">Access Policy</p>
        <h3>当前权限边界</h3>
        <div class="access-rule">
          <strong>游客只读</strong>
          <span>可查看商品、用户、订单和统计，不会触发新增、改价、删除或购买写入。</span>
        </div>
        <div class="access-rule">
          <strong>账号可写</strong>
          <span>登录或注册成功后，写请求会携带服务端签发的登录凭证。</span>
        </div>
        <div class="access-rule">
          <strong>演示账号</strong>
          <span>点击一键演示登录即可使用内置账号，无需输入用户编号或密码。</span>
        </div>
        <div class="access-rule">
          <strong>当前身份</strong>
          <span>{{ activeUserName }}</span>
        </div>
      </aside>
    </section>
  </section>
</template>
