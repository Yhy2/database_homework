# 企业官网化前端改版实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将校园二手交易平台前端改造成企业官网化视觉语言，同时保留业务页表格效率与现有后端接口。

**架构：** 以前端表现层重构为主。通过重写全局样式 token、导航骨架、页面横幅和通用卡片组件建立统一视觉，再逐页调整首页与业务页的内容结构。后端 API、SQL 和路由路径保持不变。

**技术栈：** Vue 3、Vite、Element Plus、TypeScript、Vitest、Vue Test Utils

---

### 任务 1：建立前端测试基线

**文件：**
- 修改：`frontend/package.json`
- 修改：`frontend/vite.config.ts`
- 修改：`frontend/tsconfig.app.json`
- 创建：`frontend/src/test/setup.ts`
- 创建：`frontend/src/components/__tests__/app-shell.spec.ts`
- 创建：`frontend/src/views/__tests__/home-view.spec.ts`

- [ ] **步骤 1：编写失败的测试**

为以下行为补测试：
- `AppShell` 渲染企业化品牌区与 6 个主导航入口。
- `HomeView` 渲染首屏标题、系统状态和核心入口模块。

- [ ] **步骤 2：运行测试验证失败**

运行：`cd frontend && npm test -- --runInBand`
预期：失败，报错为测试环境未配置或页面结构与断言不匹配。

- [ ] **步骤 3：补齐最小测试基础设施**

添加 Vitest、Vue Test Utils、jsdom，并配置基础测试环境。

- [ ] **步骤 4：再次运行测试，确认仍因结构不匹配而失败**

运行：`cd frontend && npm test -- --runInBand`
预期：测试框架可执行，但断言失败。

### 任务 2：重做全局壳层与设计 token

**文件：**
- 修改：`frontend/src/components/AppShell.vue`
- 修改：`frontend/src/styles/main.css`
- 创建：`frontend/src/components/PageHero.vue`

- [ ] **步骤 1：实现新的全局导航骨架**

目标：
- 企业官网式悬浮顶栏。
- 品牌区、导航区和统一页面容器。
- 保留现有路由行为。

- [ ] **步骤 2：实现新的全局样式系统**

目标：
- 重建颜色、字体、间距、背景和卡片样式。
- 建立统一的横幅区、内容容器、按钮和表格容器规则。

- [ ] **步骤 3：运行壳层与首页测试**

运行：`cd frontend && npm test -- --runInBand`
预期：`AppShell` 相关测试通过，`HomeView` 仍可能失败。

### 任务 3：重做首页与通用信息卡组件

**文件：**
- 修改：`frontend/src/views/HomeView.vue`
- 修改：`frontend/src/components/MetricCard.vue`

- [ ] **步骤 1：实现官网式首页首屏与模块分区**

目标：
- Hero 区、状态区、指标区、核心入口区、能力展示区。
- 保留原有数据加载逻辑。

- [ ] **步骤 2：增强指标卡展示**

目标：
- 提升数据卡的展示层次、文字节奏与企业感。

- [ ] **步骤 3：运行首页测试验证通过**

运行：`cd frontend && npm test -- --runInBand`
预期：首页测试通过。

### 任务 4：重做业务页横幅与结果容器

**文件：**
- 修改：`frontend/src/components/ResultTable.vue`
- 修改：`frontend/src/components/ItemFormDialog.vue`
- 修改：`frontend/src/views/ItemsView.vue`
- 修改：`frontend/src/views/UsersView.vue`
- 修改：`frontend/src/views/OrdersView.vue`
- 修改：`frontend/src/views/StatsView.vue`
- 修改：`frontend/src/views/PurchaseView.vue`

- [ ] **步骤 1：统一业务页横幅区**

目标：
- 每页具备标题、说明、摘要指标或规则说明、主操作按钮。

- [ ] **步骤 2：统一结果容器与表格外层**

目标：
- 所有表格进入统一的白色内容卡片。
- 标题区、辅助说明、空状态视觉统一。

- [ ] **步骤 3：重做商品弹窗与购买操作模块**

目标：
- 弹窗、表单与购买交互视觉统一到新系统中。

- [ ] **步骤 4：运行前端构建验证**

运行：`cd frontend && npm run build`
预期：构建通过。

### 任务 5：运行整体验证

**文件：**
- 无新增代码文件；验证当前改动

- [ ] **步骤 1：运行前端单元测试**

运行：`cd frontend && npm test -- --runInBand`
预期：测试全部通过。

- [ ] **步骤 2：运行前端构建**

运行：`cd frontend && npm run build`
预期：构建通过。

- [ ] **步骤 3：运行本地部署 smoke test**

运行：`docker compose up --build -d`
运行：`curl --noproxy '*' -I http://127.0.0.1:8080/`
预期：首页返回 `200`。

- [ ] **步骤 4：Commit**

```bash
git add frontend docs/superpowers/plans/2026-04-24-enterprise-frontend-refresh-implementation.md
git commit -m "feat(前端): 完成企业官网化视觉改版"
```
