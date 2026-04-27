# 市集门户登录态实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 在保留现有页面结构和主题色的前提下，补充商家登录入口，让游客只能读取数据，登录后才能执行上架等写操作。

**架构：** 新增前端商家会话模块，`http` 写请求只在商家登录后附带演示 token。保留现有首页、商品、用户、订单、统计、购买演示路由，只新增 `/login` 页面和顶部登录状态区。

**技术栈：** Vue 3、Vue Router、Element Plus、Axios、Vitest、Vue Test Utils

---

### 任务 1：登录态与写接口授权

**文件：**
- 创建：`frontend/src/auth/session.ts`
- 修改：`frontend/src/api/http.ts`
- 测试：`frontend/src/auth/__tests__/session.spec.ts`
- 测试：`frontend/src/api/__tests__/http-auth.spec.ts`

- [x] **步骤 1：编写失败测试**
- [x] **步骤 2：实现商家会话读写、登出和 token 获取**
- [x] **步骤 3：改造 HTTP 拦截器，只在登录后为写请求加 `X-Demo-Token`**
- [x] **步骤 4：运行目标测试验证通过**

### 任务 2：登录页与顶部入口

**文件：**
- 创建：`frontend/src/views/LoginView.vue`
- 修改：`frontend/src/router/index.ts`
- 修改：`frontend/src/components/AppShell.vue`
- 修改：`frontend/src/styles/main.css`
- 测试：`frontend/src/components/__tests__/app-shell.spec.ts`

- [x] **步骤 1：新增 `/login` 路由和演示级登录表单**
- [x] **步骤 2：顶部保留现有导航，右侧扩展游客/商家状态和登录/退出按钮**
- [x] **步骤 3：运行壳层测试**

### 任务 3：保留页面结构并扩展权限表现

**文件：**
- 修改：`frontend/src/views/HomeView.vue`
- 修改：`frontend/src/views/ItemsView.vue`
- 修改：`frontend/src/views/PurchaseView.vue`
- 修改：`frontend/src/styles/main.css`
- 测试：`frontend/src/views/__tests__/items-view.spec.ts`
- 测试：`frontend/src/views/__tests__/home-view.spec.ts`
- 测试：`frontend/src/views/__tests__/purchase-view.spec.ts`

- [x] **步骤 1：首页仍保留 hero、指标和入口，只改成市集门户文案和商家入口**
- [x] **步骤 2：商品页未登录显示只读提示，登录后显示上架按钮和现有写操作**
- [x] **步骤 3：购买演示页未登录禁用购买，登录后开放事务写操作**
- [x] **步骤 4：运行前端全量测试和构建**
