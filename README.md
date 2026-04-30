# 校园二手交易平台数据库作业

这是一个面向数据库课程作业的校园二手交易平台。项目基于 `Vue 3 + Vite + Element Plus + Flask + MySQL 8` 实现，围绕数据库建模、原生 SQL 查询、视图、事务和前后端数据展示完成。

系统数据全部来自 MySQL 数据库，不使用静态假数据，适合用于课程验收、截图、录屏和公网演示。

## 在线访问

- 公网地址：`http://campusmarketapply.site`
- 本地 Docker 默认地址：`http://localhost:8080`
- 生产 Docker 默认地址：`http://服务器公网IP`

## 技术栈

| 层级 | 技术 |
| --- | --- |
| 前端 | Vue 3、Vite、TypeScript、Vue Router、Axios、Element Plus |
| 后端 | Flask、PyMySQL、Gunicorn |
| 数据库 | MySQL 8、原生 SQL |
| 测试 | Pytest、Vitest |
| 部署 | Docker、Docker Compose、Nginx 配置参考 |

## 主要功能

### 1. 首页总览

- 展示平台数据概览。
- 提供商品、用户、订单、统计和购买演示入口。
- 使用前端组件展示业务流程和数据流效果。

### 2. 商品管理

- 查看所有商品。
- 展示商品编号、名称、分类、价格、状态和卖家信息。
- 支持新增商品。
- 支持修改未售商品价格。
- 支持删除未售商品。
- 已售商品禁止改价和删除。

### 3. 用户与订单展示

- 查看用户列表。
- 查看订单列表。
- 订单信息关联展示商品、买家和卖家。

### 4. 查询统计

页面展示数据库作业要求中的 SQL 查询结果：

- 查询所有未售商品。
- 查询价格大于 30 的商品。
- 查询生活用品类商品。
- 查询 `u001` 发布的商品。
- 查询已售商品及买家姓名。
- 查询订单对应的商品名、买家名和日期。
- 查询卖家 `u001` 的商品是否被购买。
- 统计商品总数。
- 按分类统计商品数量。
- 统计商品平均价格。
- 查询发布商品数量最多的用户。

### 5. 数据库视图

系统创建并展示两个数据库视图：

- `sold_item_view`：已售商品视图。
- `unsold_item_view`：未售商品视图。

### 6. 购买事务演示

购买接口 `/api/purchase` 使用事务完成：

1. 锁定目标商品。
2. 检查商品是否已售出。
3. 创建订单。
4. 更新商品状态为已售出。

后端使用 `SELECT ... FOR UPDATE` 和 `orders.item_id` 唯一约束共同防止重复购买。

### 7. 演示级写操作保护

新增、改价、删除和购买接口需要携带 `X-Demo-Token` 请求头。普通访客默认只能读取数据，进入商家模式后才能执行写操作。

## 项目结构

```text
database_homework/
├── backend/                     Flask 后端应用
│   ├── app.py                   Flask 应用入口，注册路由和异常处理
│   ├── config.py                环境变量和应用配置
│   ├── db.py                    MySQL 连接、查询和事务封装
│   ├── errors.py                API 异常类型定义
│   ├── responses.py             统一 JSON 响应和写操作令牌校验
│   ├── routes/                  API 路由层
│   │   ├── health_api.py        健康检查接口
│   │   ├── users_api.py         用户接口
│   │   ├── items_api.py         商品接口
│   │   ├── orders_api.py        订单与购买接口
│   │   ├── reports_api.py       查询统计和视图接口
│   │   └── spa.py               生产环境前端静态页面托管
│   └── repositories/            数据访问层，集中编写原生 SQL
│       ├── user_repository.py   用户查询
│       ├── item_repository.py   商品查询、新增、改价、删除
│       ├── order_repository.py  订单查询和购买事务
│       └── report_repository.py 统计查询、连接查询和视图查询
├── frontend/                    Vue 前端应用
│   ├── package.json             前端依赖和脚本
│   ├── vite.config.ts           Vite 配置和开发代理
│   └── src/
│       ├── api/                 Axios 请求封装和各模块 API
│       ├── auth/                商家模式本地会话和令牌处理
│       ├── components/          通用页面组件和数据流图形组件
│       ├── router/              前端路由配置
│       ├── styles/              全局样式
│       ├── views/               页面视图
│       ├── types.ts             前端数据类型
│       └── main.ts              前端入口
├── sql/                         数据库脚本
│   ├── 01_schema.sql            建表、主键、外键和检查约束
│   ├── 02_seed.sql              初始化用户、商品和订单数据
│   ├── 03_views.sql             创建已售和未售商品视图
│   ├── 04_queries.sql           作业要求 SQL 查询归档
│   └── 05_purchase.sql          购买事务示意 SQL
├── tests/                       后端测试
│   ├── conftest.py              测试数据库初始化和测试客户端
│   ├── test_api.py              API 功能测试
│   ├── test_sql_contract.py     SQL 数据一致性测试
│   └── test_purchase.py         购买事务测试
├── docs/                        项目文档
│   ├── report.md                项目说明报告
│   ├── video-outline.md         录屏讲解提纲
│   └── deploy-public.md         公网部署说明
├── deploy/                      部署配置
│   ├── gunicorn.conf.py         Gunicorn 配置
│   └── nginx.conf               Nginx 反向代理参考配置
├── Dockerfile                   前后端生产镜像构建文件
├── docker-compose.yml           本地 Docker Compose 配置
├── docker-compose.prod.yml      生产 Docker Compose 配置
├── .env.example                 本地环境变量模板
└── .env.production.example      生产环境变量模板
```

## 数据库设计

系统包含 3 张核心表。

| 表名 | 说明 |
| --- | --- |
| `user` | 用户表，保存用户编号、用户名和手机号 |
| `item` | 商品表，保存商品编号、名称、分类、价格、状态和卖家编号 |
| `orders` | 订单表，保存订单编号、商品编号、买家编号和下单日期 |

关键约束：

- `user.user_id`、`item.item_id`、`orders.order_id` 为主键。
- `item.seller_id` 外键引用 `user.user_id`。
- `orders.buyer_id` 外键引用 `user.user_id`。
- `orders.item_id` 外键引用 `item.item_id`。
- `orders.item_id` 设置唯一约束，保证一个商品最多成交一次。
- `item.status` 只能为 `0` 或 `1`，分别表示未售和已售。
- `item.price >= 0`。

## API 接口概览

| 方法 | 路径 | 功能 |
| --- | --- | --- |
| `GET` | `/api/health` | 健康检查 |
| `GET` | `/api/users` | 查询用户列表 |
| `GET` | `/api/items` | 查询商品列表 |
| `POST` | `/api/items` | 新增商品 |
| `PATCH` | `/api/items/<item_id>/price` | 修改商品价格 |
| `DELETE` | `/api/items/<item_id>` | 删除商品 |
| `GET` | `/api/orders` | 查询订单列表 |
| `POST` | `/api/purchase` | 购买商品 |
| `GET` | `/api/reports/basic` | 基本查询结果 |
| `GET` | `/api/reports/join` | 连接查询结果 |
| `GET` | `/api/reports/aggregate` | 聚合统计结果 |
| `GET` | `/api/views/sold-items` | 已售商品视图 |
| `GET` | `/api/views/unsold-items` | 未售商品视图 |

写操作接口需要请求头：

```http
X-Demo-Token: 你的演示令牌
```

## 快速启动

### 方式一：Docker Compose 一键启动

```bash
docker compose up --build -d
```

启动后访问：

```text
http://localhost:8080
```

停止服务：

```bash
docker compose down
```

### 方式二：前后端开发联调

启动后端：

```bash
uv venv .venv
uv pip install --python .venv/bin/python -r backend/requirements.txt
.venv/bin/python backend/app.py
```

启动前端：

```bash
cd frontend
npm install
npm run dev -- --host
```

开发环境下，Vite 会把 `/api` 请求代理到 `http://127.0.0.1:5000`。

## 公网部署

生产部署推荐使用：

```bash
cp .env.production.example .env
```

修改 `.env` 中的生产变量：

```env
APP_PORT=80
MYSQL_DATABASE=campus_secondhand
MYSQL_ROOT_PASSWORD=一个长随机密码
DEMO_ACCESS_TOKEN=一个长随机令牌
```

启动生产服务：

```bash
docker compose -f docker-compose.prod.yml up --build -d
```

查看状态：

```bash
docker compose -f docker-compose.prod.yml ps
```

查看后端日志：

```bash
docker compose -f docker-compose.prod.yml logs -f backend
```

生产配置中 MySQL 不暴露到公网，只允许后端容器通过 Docker 内部网络访问数据库。

## 测试

后端测试：

```bash
.venv/bin/python -m pytest tests/test_api.py tests/test_sql_contract.py tests/test_purchase.py -v
```

前端测试：

```bash
cd frontend
npm run test
```

前端生产构建验证：

```bash
cd frontend
npm run build
```

## 环境变量

常用环境变量如下：

| 变量 | 说明 | 默认值 |
| --- | --- | --- |
| `APP_PORT` | Web 对外端口 | `8080` 或生产 `80` |
| `MYSQL_HOST` | MySQL 主机 | `db` |
| `MYSQL_PORT` | MySQL 端口 | `3306` |
| `MYSQL_DATABASE` | 数据库名 | `campus_secondhand` |
| `MYSQL_USER` | 数据库用户 | `root` |
| `MYSQL_PASSWORD` | 数据库密码 | `root` |
| `MYSQL_ROOT_PASSWORD` | MySQL root 密码 | `root` |
| `DEMO_ACCESS_TOKEN` | 后端写操作演示令牌 | `local-demo-token` |
| `VITE_DEMO_ACCESS_TOKEN` | 前端商家模式演示令牌 | `local-demo-token` |

不要把真实 `.env` 文件提交到 Git。

## 课程作业覆盖点

- 数据库建表和完整性约束。
- 初始化真实数据。
- 基本查询、连接查询、聚合与分组查询。
- 数据库视图。
- 新增、修改和删除数据。
- 购买事务。
- 重复购买拦截。
- 前后端联动展示数据库结果。
- Docker 本地运行和公网部署。

## 相关文档

- 项目报告：[docs/report.md](docs/report.md)
- 录屏提纲：[docs/video-outline.md](docs/video-outline.md)
- 公网部署说明：[docs/deploy-public.md](docs/deploy-public.md)
