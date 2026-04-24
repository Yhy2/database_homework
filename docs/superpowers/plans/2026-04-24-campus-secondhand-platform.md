# 校园二手交易平台数据库作业实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 在 2026-05-07 前完成一个可在线访问的校园二手交易平台数据库系统，满足作业中的数据库定义、数据操作、查询展示、视图、简单业务逻辑、安全性说明、并发恢复说明，以及代码、说明文档、操作视频三类交付物要求。

**架构：** 采用 `Vue 3 + Vite + Element Plus + Axios` 作为整站前端，采用 `Flask + 原生 SQL + MySQL` 作为后端与数据库访问层。数据库相关逻辑以原生 SQL 为主，Python 只负责参数传递、事务控制、接口编排和错误处理；Vue 负责页面路由、表格展示、表单交互和结果反馈。开发阶段前后端分开联调；本地部署验收和公网部署阶段统一使用“`Vue 构建产物 + Flask API + MySQL + Nginx`”的交付形态，确保先本地跑通，再迁移到公网。

**技术栈：** Python 3.11、Flask、PyMySQL、MySQL 8、Vue 3、Vite、Vue Router、Axios、Element Plus、Docker Compose、Gunicorn、Nginx、Pytest

---

## 一、需求边界与验收重点

### 1. 必须完成的硬性要求

- 需要 1 个公网可访问网址，且访问者无需本地运行环境。
- 至少包含首页、商品列表页、用户列表页、订单列表页。
- 页面必须展示数据库真实数据，而不是静态假数据。
- 需要完成数据库定义、初始数据导入、增删改查、连接查询、聚合查询、视图、购买业务逻辑。
- 需要补充安全性、并发与恢复的文字说明。
- 需要整理说明文档、结果截图和完整演示视频。

### 2. 项目成功标准

- 本地开发环境能稳定联调，前端页面和后端接口可独立排错。
- 本地部署版本一键启动后，可以通过浏览器完成作业中所有演示操作。
- 所有查询结果与数据库中的真实数据一致，刷新页面后仍能看到最新结果。
- 购买逻辑具备事务性，已售商品不能重复购买。
- 公网部署后，访问路径与本地部署版本保持一致，录屏与截图可以直接基于公网地址完成。
- SQL 命名与页面文案保持一致，不因保留字或中英文字段映射导致演示出错。

### 3. 本计划的关键原则

- 先本地，后公网：本地部署是验收基线，公网部署是发布动作，不反过来做。
- SQL 优先：建表、初始化、查询、视图、购买事务都保留清晰的 SQL 表达，避免被 ORM 抽象掩盖。
- 前后端职责清晰：Vue 负责交互和展示，Flask 负责 API 与事务，MySQL 负责数据约束和持久化。
- 开发态与部署态分离：开发时重联调效率，部署时重稳定性和可演示性。
- 同一套业务逻辑同时服务本地部署与公网部署，避免出现两套实现路径。

## 二、方案结论与取舍

### 方案 A：整站 Vue 3 + Flask API + 原生 SQL（采用）

优点：
- 页面观感和交互空间更大，首页、统计页、表单弹窗、状态提示都能做得更完整。
- 前后端分层清晰，后续排查“是 SQL 问题、API 问题，还是页面问题”会更直接。
- 原生 SQL 依然保留在后端和 `sql/` 目录中，数据库作业的核心不会被前端框架稀释。
- Vue 构建后的静态资源可以并入最终交付镜像，利于本地部署验收和公网发布。

缺点：
- 工程复杂度高于服务端模板方案。
- 需要额外处理接口约定、前端构建、反向代理和开发联调。

### 方案 B：Flask + Jinja2 + Bootstrap

优点：
- 开发最快，部署最简单。
- 页面、接口、模板都在一个服务里，排错成本低。

缺点：
- 视觉和交互上限更低。
- 既然你已经明确要求“整站 Vue”，这个方案不再符合当前目标。

### 当前结论

按你的最新决定，正式采用方案 A。需要明确的一点是：整站 Vue 会提升前端完成度，但也会抬高工期和部署复杂度。因此，计划中会把“本地部署验收”单独设为一道关卡，只有本地部署版完全稳定后，才进入公网部署。

## 三、推荐目录结构与文件职责

### 后端

- `backend/requirements.txt`：Python 依赖清单。
- `backend/app.py`：Flask 启动入口。
- `backend/config.py`：环境变量、数据库连接、调试配置。
- `backend/db.py`：数据库连接初始化、连接获取、事务提交与回滚。
- `backend/repositories/user_repository.py`：用户相关原生 SQL。
- `backend/repositories/item_repository.py`：商品增删改查与筛选 SQL。
- `backend/repositories/order_repository.py`：订单查询、购买事务、状态校验 SQL。
- `backend/repositories/report_repository.py`：连接查询、聚合查询、视图查询 SQL。
- `backend/routes/users_api.py`：用户列表接口。
- `backend/routes/items_api.py`：商品列表、增删改接口。
- `backend/routes/orders_api.py`：订单列表与购买接口。
- `backend/routes/reports_api.py`：基本查询、连接查询、聚合查询、视图接口。
- `backend/routes/spa.py`：返回 Vue 构建后的 `index.html`，支持前端路由刷新。

### 前端

- `frontend/package.json`：前端依赖与脚本。
- `frontend/vite.config.ts`：Vite 配置，开发阶段代理 `/api` 到 Flask。
- `frontend/index.html`：Vue 入口模板。
- `frontend/src/main.ts`：Vue 启动入口。
- `frontend/src/App.vue`：应用根组件。
- `frontend/src/router/index.ts`：页面路由。
- `frontend/src/api/http.ts`：Axios 实例与拦截器。
- `frontend/src/api/items.ts`：商品相关接口封装。
- `frontend/src/api/users.ts`：用户相关接口封装。
- `frontend/src/api/orders.ts`：订单与购买接口封装。
- `frontend/src/api/reports.ts`：查询、统计、视图接口封装。
- `frontend/src/views/HomeView.vue`：首页。
- `frontend/src/views/ItemsView.vue`：商品列表与商品操作页。
- `frontend/src/views/UsersView.vue`：用户列表页。
- `frontend/src/views/OrdersView.vue`：订单列表页。
- `frontend/src/views/StatsView.vue`：查询、聚合、视图展示页。
- `frontend/src/views/PurchaseView.vue`：购买演示页。
- `frontend/src/components/AppShell.vue`：导航布局。
- `frontend/src/components/MetricCard.vue`：统计卡片。
- `frontend/src/components/ItemFormDialog.vue`：新增商品与修改价格弹窗。
- `frontend/src/components/ResultTable.vue`：通用结果表格。
- `frontend/src/styles/main.css`：全局样式。

### SQL 与初始化

- `sql/01_schema.sql`：建库建表、主键、外键、唯一约束、非空约束。
- `sql/02_seed.sql`：题目给定的初始数据与自定义新商品数据。
- `sql/03_views.sql`：已售商品视图、未售商品视图。
- `sql/04_queries.sql`：题目要求的查询语句归档。
- `sql/05_purchase.sql`：购买事务 SQL 示例或存储过程方案。

### 部署与测试

- `docker-compose.yml`：本地部署与验收编排。
- `Dockerfile`：多阶段构建，先构建 Vue，再打包 Flask。
- `.env.example`：本地与公网配置模板。
- `deploy/nginx.conf`：公网反向代理配置。
- `deploy/gunicorn.conf.py`：Gunicorn 运行配置。
- `tests/test_api.py`：核心接口测试。
- `tests/test_purchase.py`：购买事务与重复购买限制测试。
- `tests/test_sql_contract.py`：关键查询结果与字段结构测试。

### 文档与交付材料

- `docs/report.md`：项目说明文档。
- `docs/screenshots/`：截图归档目录。
- `docs/video-outline.md`：录屏脚本。
- `README.md`：项目简介与运行说明。

## 四、阶段计划

### 任务 1：锁定整站 Vue + Flask API 的项目骨架

**文件：**
- 创建：`docker-compose.yml`
- 创建：`Dockerfile`
- 创建：`backend/requirements.txt`
- 创建：`backend/app.py`
- 创建：`backend/config.py`
- 创建：`backend/db.py`
- 创建：`frontend/package.json`
- 创建：`frontend/vite.config.ts`
- 创建：`frontend/src/main.ts`
- 创建：`frontend/src/App.vue`
- 创建：`.env.example`
- 修改：`README.md`

- [ ] **步骤 1：确定统一技术路线**

选择 `Vue 3 + Vite + Element Plus + Flask + 原生 SQL + MySQL + Docker Compose`，并明确：
- 前端整站使用 Vue Router。
- 后端不引入 ORM。
- 页面数据全部来自 API。

- [ ] **步骤 2：搭建开发骨架**

后端先提供基础健康检查接口，前端先提供最小页面骨架和路由跳转。

- [ ] **步骤 3：初始化依赖**

后端依赖示例：

```txt
Flask
PyMySQL
python-dotenv
gunicorn
pytest
```

前端依赖示例：

```json
{
  "dependencies": {
    "axios": "^1.0.0",
    "element-plus": "^2.0.0",
    "vue": "^3.0.0",
    "vue-router": "^4.0.0"
  }
}
```

- [ ] **步骤 4：打通开发联调**

要求：
- Flask 在本地暴露 API。
- Vite 开发服务器通过代理转发 `/api`。
- 首页可以成功请求到后端测试接口。

- [ ] **步骤 5：验证本地开发环境**

运行：
- `docker compose up --build -d db backend`
- `cd frontend && npm install && npm run dev -- --host`

预期：
- MySQL 容器正常启动。
- Flask 接口正常返回。
- Vue 页面正常加载并能调通 `/api/health`。

- [ ] **步骤 6：Commit**

```bash
git add docker-compose.yml Dockerfile backend frontend .env.example README.md
git commit -m "feat: 初始化 Vue 和 Flask 的前后端项目骨架"
```

### 任务 2：完成数据库设计、约束与初始化 SQL

**文件：**
- 创建：`sql/01_schema.sql`
- 创建：`sql/02_seed.sql`
- 创建：`sql/03_views.sql`
- 创建：`sql/04_queries.sql`
- 创建：`sql/05_purchase.sql`
- 创建：`backend/repositories/item_repository.py`
- 创建：`backend/repositories/order_repository.py`
- 创建：`backend/repositories/report_repository.py`
- 修改：`backend/db.py`
- 测试：`tests/test_sql_contract.py`
- 测试：`tests/test_purchase.py`

- [ ] **步骤 1：编写建表 SQL**

关键约束必须覆盖：

```sql
CREATE TABLE orders (
  order_id VARCHAR(20) PRIMARY KEY,
  item_id VARCHAR(20) NOT NULL UNIQUE,
  buyer_id VARCHAR(20) NOT NULL,
  order_date DATE NOT NULL,
  FOREIGN KEY (item_id) REFERENCES item(item_id),
  FOREIGN KEY (buyer_id) REFERENCES user(user_id)
);
```

- [ ] **步骤 2：落实一致性规则**

重点保证：
- `orders.item_id` 全局唯一，防止一个商品被交易多次。
- 购买操作必须同时新增订单并把商品状态改为 `1`。
- 商品状态为 `0` 时不能出现在订单表中。
- 如果坚持使用 `user` 作为表名，SQL 中统一写成 `` `user` ``。

- [ ] **步骤 3：导入题目给定初始数据**

将 `u001` 到 `u004`、`i001` 到 `i005`、订单 `0001` 与 `0002` 全量写入 `sql/02_seed.sql`。

- [ ] **步骤 4：补充 1 条自定义新商品数据**

示例：

```sql
INSERT INTO item (item_id, item_name, category, price, status, seller_id)
VALUES ('i006', 'Keyboard', 'Electronics', 60, 0, 'u002');
```

- [ ] **步骤 5：创建视图**

```sql
CREATE VIEW sold_item_view AS
SELECT i.item_name, o.buyer_id
FROM item i
JOIN orders o ON i.item_id = o.item_id;
```

- [ ] **步骤 6：实现购买事务 SQL**

示意如下：

```sql
START TRANSACTION;

SELECT status
FROM item
WHERE item_id = %s
FOR UPDATE;

INSERT INTO orders (order_id, item_id, buyer_id, order_date)
VALUES (%s, %s, %s, %s);

UPDATE item
SET status = 1
WHERE item_id = %s;

COMMIT;
```

Python 侧只负责参数化执行与失败回滚。

- [ ] **步骤 7：运行 SQL 与测试验证**

运行：
- `docker compose exec db mysql -uroot -p$MYSQL_ROOT_PASSWORD < sql/01_schema.sql`
- `pytest tests/test_sql_contract.py tests/test_purchase.py -v`

预期：
- 建表成功。
- 初始化数据成功。
- 重复购买测试先失败后修复为通过。

- [ ] **步骤 8：Commit**

```bash
git add sql backend/db.py backend/repositories tests
git commit -m "feat: 完成数据库结构、初始数据、视图与购买事务 SQL"
```

### 任务 3：完成后端 API 层

**文件：**
- 创建：`backend/routes/users_api.py`
- 创建：`backend/routes/items_api.py`
- 创建：`backend/routes/orders_api.py`
- 创建：`backend/routes/reports_api.py`
- 创建：`backend/routes/spa.py`
- 修改：`backend/app.py`
- 测试：`tests/test_api.py`

- [ ] **步骤 1：定义 API 路由**

建议至少包含：
- `GET /api/users`
- `GET /api/items`
- `POST /api/items`
- `PATCH /api/items/<item_id>/price`
- `DELETE /api/items/<item_id>`
- `GET /api/orders`
- `GET /api/reports/basic`
- `GET /api/reports/join`
- `GET /api/reports/aggregate`
- `GET /api/views/sold-items`
- `GET /api/views/unsold-items`
- `POST /api/purchase`

- [ ] **步骤 2：统一返回结构**

建议统一使用：

```json
{
  "code": 0,
  "message": "success",
  "data": []
}
```

- [ ] **步骤 3：实现参数校验与错误处理**

至少覆盖：
- 缺失参数。
- 非法价格。
- 删除已售商品。
- 重复购买。

- [ ] **步骤 4：实现 Vue 刷新兼容**

`backend/routes/spa.py` 需要保证：
- 直接访问前端路由不返回 `404`。
- 浏览器刷新 `/items`、`/orders`、`/stats` 时仍能加载 Vue 应用。

- [ ] **步骤 5：运行 API 测试**

运行：`pytest tests/test_api.py -v`

预期：
- 所有核心接口返回 `200` 或明确业务错误码。
- JSON 结构稳定。

- [ ] **步骤 6：Commit**

```bash
git add backend/routes backend/app.py tests/test_api.py
git commit -m "feat: 完成 Flask API 层与前端路由回退支持"
```

### 任务 4：完成 Vue 页面骨架与导航

**文件：**
- 创建：`frontend/src/router/index.ts`
- 创建：`frontend/src/views/HomeView.vue`
- 创建：`frontend/src/views/ItemsView.vue`
- 创建：`frontend/src/views/UsersView.vue`
- 创建：`frontend/src/views/OrdersView.vue`
- 创建：`frontend/src/views/StatsView.vue`
- 创建：`frontend/src/views/PurchaseView.vue`
- 创建：`frontend/src/components/AppShell.vue`
- 创建：`frontend/src/styles/main.css`

- [ ] **步骤 1：配置前端路由**

至少包含：
- `/`
- `/items`
- `/users`
- `/orders`
- `/stats`
- `/purchase`

- [ ] **步骤 2：实现全局布局**

导航至少包含：
- 首页
- 商品列表
- 用户列表
- 订单列表
- 查询统计
- 购买演示

- [ ] **步骤 3：确定前端视觉方案**

默认使用 `Element Plus`：
- 首页使用摘要卡片和快捷入口。
- 列表页使用表格、标签、按钮组。
- 操作使用弹窗表单和确认框。
- 操作结果使用消息提示。

- [ ] **步骤 4：实现空状态与加载态**

要求：
- API 请求中显示加载状态。
- 无数据时显示空状态文案。
- 请求失败时显示可理解的错误提示。

- [ ] **步骤 5：验证页面骨架**

运行：
- `cd frontend && npm run dev -- --host`

预期：
- 所有页面可以打开。
- 路由跳转正常。
- 页面结构与后续数据展示区域已经预留。

- [ ] **步骤 6：Commit**

```bash
git add frontend/src/router frontend/src/views frontend/src/components frontend/src/styles
git commit -m "feat: 完成 Vue 页面骨架与导航布局"
```

### 任务 5：完成作业要求的数据操作与查询展示

**文件：**
- 创建：`frontend/src/api/http.ts`
- 创建：`frontend/src/api/items.ts`
- 创建：`frontend/src/api/users.ts`
- 创建：`frontend/src/api/orders.ts`
- 创建：`frontend/src/api/reports.ts`
- 创建：`frontend/src/components/ItemFormDialog.vue`
- 创建：`frontend/src/components/ResultTable.vue`
- 创建：`frontend/src/components/MetricCard.vue`
- 修改：`frontend/src/views/ItemsView.vue`
- 修改：`frontend/src/views/UsersView.vue`
- 修改：`frontend/src/views/OrdersView.vue`
- 修改：`frontend/src/views/StatsView.vue`
- 测试：`tests/test_api.py`
- 测试：`tests/test_sql_contract.py`

- [ ] **步骤 1：接入用户、商品、订单列表接口**

要求：
- 页面首次加载即请求真实数据库数据。
- 不允许写死假数据。

- [ ] **步骤 2：实现数据操作**

需要支持：
- 插入新商品。
- 修改某商品价格。
- 删除一个未售出的商品。

要求：
- 页面操作全部走 API。
- API 内部全部通过参数化原生 SQL 完成。

- [ ] **步骤 3：实现基本查询**

必须覆盖：
- 所有未售出商品。
- 价格大于 `30` 的商品。
- `DailyGoods` 类商品（页面展示时映射为“生活用品”）。
- `u001` 发布的所有商品。

- [ ] **步骤 4：实现连接查询**

必须覆盖：
- 已售商品及买家姓名。
- 每个订单的商品名、买家名、日期。
- 卖家是 `u001` 的商品是否被购买。

- [ ] **步骤 5：实现聚合与分组**

必须覆盖：
- 商品总数。
- 每类商品数量。
- 所有商品平均价格。
- 发布商品数量最多的用户。

- [ ] **步骤 6：实现视图展示**

要求：
- 前端单独展示“已售商品视图”和“未售商品视图”。
- 页面上标注数据来源于数据库视图，而不是普通查询拼装。

- [ ] **步骤 7：优化前端展示效果**

建议：
- 查询结果用统一表格组件展示。
- 聚合统计用卡片展示。
- 商品状态使用颜色区分。
- 危险操作增加二次确认。

- [ ] **步骤 8：运行测试与人工验收**

运行：
- `pytest tests/test_api.py tests/test_sql_contract.py -v`
- 浏览器手动验证各页面与查询区块。

预期：
- 查询结果正确。
- 操作后页面立即更新或重新请求。
- 刷新页面后仍能看到数据库最新状态。

- [ ] **步骤 9：Commit**

```bash
git add frontend/src backend/routes backend/repositories tests
git commit -m "feat: 完成作业要求的数据操作、查询与视图展示"
```

### 任务 6：完成购买业务逻辑、并发说明与安全性说明

**文件：**
- 修改：`backend/routes/orders_api.py`
- 修改：`backend/repositories/order_repository.py`
- 修改：`frontend/src/views/PurchaseView.vue`
- 修改：`docs/report.md`
- 测试：`tests/test_purchase.py`

- [ ] **步骤 1：实现购买接口**

购买动作触发后必须：
- 在 `orders` 表中插入订单。
- 将对应 `item.status` 更新为 `1`。

- [ ] **步骤 2：阻止重复购买**

需要同时做：
- 后端 SQL 事务校验。
- 前端对已售商品按钮禁用。
- 接口失败时返回明确错误信息。

- [ ] **步骤 3：补充并发与恢复说明**

在 `docs/report.md` 中说明：
- 两人同时购买同一商品时会出现竞争条件。
- 如何使用事务和行级锁解决。
- 崩溃后如何依赖事务日志、备份或恢复策略找回订单数据。

- [ ] **步骤 4：补充安全性说明**

在 `docs/report.md` 中说明：
- 普通访客默认只开放查询能力。
- 修改、删除、购买等接口只允许演示入口调用。
- 生产环境关闭调试模式，不暴露任意 SQL 执行能力。

- [ ] **步骤 5：运行购买测试**

运行：`pytest tests/test_purchase.py -v`

预期：
- 首次购买成功。
- 再次购买同一商品返回失败。

- [ ] **步骤 6：Commit**

```bash
git add backend/routes backend/repositories frontend/src/views/PurchaseView.vue docs/report.md tests/test_purchase.py
git commit -m "feat: 完成购买业务逻辑与安全并发说明"
```

### 任务 7：完成本地部署验收闭环

**文件：**
- 修改：`Dockerfile`
- 修改：`docker-compose.yml`
- 修改：`.env.example`
- 修改：`backend/routes/spa.py`
- 修改：`README.md`
- 修改：`docs/report.md`

- [ ] **步骤 1：实现多阶段构建**

要求：
- 第一阶段使用 Node 构建 Vue `dist`。
- 第二阶段打包 Flask，并把 `dist` 拷贝进可交付镜像。

- [ ] **步骤 2：完成本地部署版本**

本地部署版本应做到：
- 只运行 `docker compose up --build -d` 即可访问完整站点。
- 不需要额外手动启动 Vite。
- Vue 前端资源由最终交付镜像提供。

- [ ] **步骤 3：做一次完整本地验收**

按作业顺序手工验证：
- 首页、商品页、用户页、订单页可访问。
- 初始数据可见。
- 新增、改价、删除生效。
- 查询与视图结果正确。
- 购买事务正确。

- [ ] **步骤 4：录制本地预演视频**

先录一个本地版本预演，确保流程顺畅，再决定是否基于公网重新录制最终视频。

- [ ] **步骤 5：Commit**

```bash
git add Dockerfile docker-compose.yml .env.example backend/routes/spa.py README.md docs/report.md
git commit -m "chore: 完成本地部署版构建与验收说明"
```

### 任务 8：增加低风险创新点（可选但推荐）

**文件：**
- 创建：`frontend/src/views/HealthView.vue`
- 创建：`backend/routes/health_api.py`
- 修改：`backend/repositories/report_repository.py`
- 修改：`docs/report.md`

- [ ] **步骤 1：实现数据一致性检查页**

检查项可以包括：
- `orders` 中是否存在重复 `item_id`。
- 已售商品状态是否与订单表一致。
- 外键引用是否完整。

- [ ] **步骤 2：实现“一键重置演示数据”脚本**

可提供仅在本地或演示模式启用的重置入口，便于反复录屏。

- [ ] **步骤 3：实现统计可视化**

可选使用图表展示：
- 每类商品数量。
- 商品价格分布。

要求：
- 图表只是展示层增强，底层数据依然来自题目要求的 SQL 查询。

- [ ] **步骤 4：在说明文档中单列创新点章节**

强调创新点是“数据库教学友好增强”，不是偏离作业目标的无关功能。

- [ ] **步骤 5：Commit**

```bash
git add frontend/src/views backend/routes backend/repositories docs/report.md
git commit -m "feat: 增加数据健康检查与统计可视化"
```

### 任务 9：在本地完全稳定后进行公网部署

**文件：**
- 创建：`deploy/nginx.conf`
- 创建：`deploy/gunicorn.conf.py`
- 修改：`docs/report.md`
- 修改：`README.md`

- [ ] **步骤 1：冻结本地版本**

只有在以下条件全部满足后才进入公网部署：
- 本地部署版所有功能通过。
- 本地视频预演通过。
- 说明文档初稿完成。

- [ ] **步骤 2：准备公网部署环境**

公网环境至少包括：
- 1 台 Linux 主机。
- Docker 与 Docker Compose。
- 可访问的公网 IP 或域名。

- [ ] **步骤 3：部署同一套交付镜像**

运行思路：

```bash
docker compose up --build -d
```

要求：
- 前端静态资源与后端 API 使用同一对外入口。
- Nginx 负责反向代理与缓存静态资源。

- [ ] **步骤 4：基于公网完成最终验收**

检查：
- 外网浏览器可直接访问。
- 所有页面可打开。
- 数据操作与查询仍然有效。
- 录制视频过程无报错。

- [ ] **步骤 5：Commit**

```bash
git add deploy README.md docs/report.md
git commit -m "feat: 完成公网部署与发布配置"
```

### 任务 10：整理提交材料并做最终冻结

**文件：**
- 修改：`docs/report.md`
- 创建：`docs/screenshots/`
- 创建：`docs/video-outline.md`
- 修改：`README.md`

- [ ] **步骤 1：整理说明文档**

文档必须覆盖：
- 在线访问网址（建议写在开头）。
- 从运行代码到获得最终网址的完整步骤。
- 全部页面截图。
- 各类任务运行结果截图与说明。
- 第八、九部分简答。

- [ ] **步骤 2：补齐截图清单**

至少包括：
- 首页。
- 商品列表。
- 用户列表。
- 订单列表。
- 查询统计页。
- 购买成功与重复购买失败示例。
- 本地部署或公网部署成功界面。

- [ ] **步骤 3：录制最终操作视频**

建议脚本顺序：
- 打开网址。
- 浏览首页与数据页。
- 演示新增、改价、删除。
- 演示查询与统计。
- 演示购买事务。
- 结束时展示数据库变化。

- [ ] **步骤 4：打包与命名**

命名遵循题目要求：
- 压缩包：`[姓名]+[学号]`
- 视频：`[姓名]+[学号]视频`
- 邮件主题：`26 数据库大作业+[姓名]`

- [ ] **步骤 5：最终自查**

逐项对照 `request.md`，确认没有遗漏任何一个功能点或材料项。

- [ ] **步骤 6：Commit**

```bash
git add docs README.md
git commit -m "docs: 完成作业提交材料与最终说明"
```

## 五、推荐时间表

如果以当前日期 2026-04-24 开始，并以 2026-05-07 作为截止节点，建议节奏如下：

- 2026-04-24：锁定整站 Vue 技术路线，完成前后端骨架与开发联调。
- 2026-04-25 至 2026-04-26：完成数据库设计、SQL 脚本、视图与购买事务。
- 2026-04-27：完成 Flask API 层。
- 2026-04-28 至 2026-04-29：完成 Vue 页面、CRUD、查询展示和视图展示。
- 2026-04-30：完成购买流程、本地部署版构建与第一次完整预演。
- 2026-05-01：补充创新点与说明文档初稿。
- 2026-05-02 至 2026-05-03：完成公网部署与公网回归测试。
- 2026-05-04：整理截图、录制最终视频。
- 2026-05-05 至 2026-05-06：预留用于修复问题、补文档、打包材料，避免压线提交。

## 六、风险与规避策略

- 风险 1：整站 Vue 带来额外的前端工程复杂度，影响主线交付。
  规避：前端只使用 `Vue Router + Axios + Element Plus`，不再额外引入状态管理、SSR 或复杂构建链。

- 风险 2：开发联调正常，但部署版前端路由刷新 `404`。
  规避：在 Flask 和 Nginx 两层都明确配置 SPA 回退策略。

- 风险 3：前端展示完成较快，但后端 SQL 和事务约束不扎实。
  规避：优先完成 `sql/` 脚本、API 测试和购买事务，再美化页面。

- 风险 4：本地开发依赖 Vite，但最终交付镜像未包含前端资源。
  规避：把多阶段构建和本地部署版验收设为强制关卡。

- 风险 5：购买逻辑只做前端限制，未做数据库级保护。
  规避：后端事务、唯一约束、状态校验同时存在。

- 风险 6：创新点抢占主线工期。
  规避：创新点只在主线功能全部通过后再做，且保持可选。

## 七、最终验收清单

- [ ] 公网网址可直接访问。
- [ ] 首页、商品列表、用户列表、订单列表 4 个核心页面齐全。
- [ ] 页面展示真实数据库数据。
- [ ] 初始数据已导入。
- [ ] 新增商品、修改价格、删除未售商品可演示。
- [ ] 基本查询全部可展示。
- [ ] 连接查询全部可展示。
- [ ] 聚合与分组全部可展示。
- [ ] 已售商品视图、未售商品视图可展示。
- [ ] 购买商品逻辑可演示，且禁止重复购买。
- [ ] 安全性说明已写入文档。
- [ ] 并发与恢复说明已写入文档。
- [ ] 说明文档、截图、视频齐全。
- [ ] 项目代码、压缩包命名、视频命名、邮件主题符合题目要求。

## 八、执行建议

如果时间紧，推荐按以下优先级推进：

1. 数据库约束与购买事务 SQL
2. Flask API 层
3. Vue 核心页面与查询展示
4. 本地部署闭环
5. 说明文档与截图
6. 公网部署
7. 创新点

如果你后面要我继续推进，我建议下一步直接按这份新计划搭项目脚手架，先把 `Vue 3 + Flask API + MySQL` 的本地联调版做出来，再推进本地部署版。
