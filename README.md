# 校园二手交易平台数据库作业

基于 `Vue 3 + Vite + Element Plus + Flask + MySQL 8` 的课程作业项目。系统围绕数据库定义、真实数据展示、原生 SQL 查询、视图和购买事务来组织功能，适合直接用于本地验收、截图和录屏。

## 技术栈

- 前端：Vue 3、Vite、Vue Router、Axios、Element Plus
- 后端：Flask、PyMySQL、Gunicorn
- 数据库：MySQL 8
- 测试：Pytest
- 部署：Docker Compose、Nginx（公网配置已提供）

## 目录结构

```text
backend/               Flask 应用、路由、仓储层
frontend/              Vue 前端页面、路由和 API 封装
sql/                   建表、初始化、视图、查询归档和事务示例
tests/                 API、SQL 契约和购买事务测试
deploy/                Gunicorn 与 Nginx 配置
docs/report.md         项目说明文档
docs/video-outline.md  录屏脚本
```

## 快速开始

### 方式一：Docker Compose 一键启动

```bash
docker compose up --build -d
```

启动完成后，访问 `http://localhost:8080`。

### 方式二：前后端开发联调

后端：

```bash
uv venv .venv
uv pip install --python .venv/bin/python -r backend/requirements.txt
.venv/bin/python backend/app.py
```

前端：

```bash
cd frontend
npm install
npm run dev -- --host
```

开发环境下，Vite 会把 `/api` 请求代理到 `http://127.0.0.1:5000`。

## 环境变量

可选配置见 `.env.example`。本地默认值已经能直接配合 `docker-compose.yml` 运行，常用变量如下：

- `APP_PORT`：Web 对外端口，默认 `8080`
- `MYSQL_DATABASE`：数据库名，默认 `campus_secondhand`
- `MYSQL_ROOT_PASSWORD`：MySQL root 密码，默认 `root`
- `DEMO_ACCESS_TOKEN`：写操作演示令牌，默认 `local-demo-token`

## 已覆盖的作业要求

- 首页、商品列表页、用户列表页、订单列表页、查询统计页、购买演示页。
- 展示真实数据库数据，不使用静态假数据。
- 新增商品、修改价格、删除未售商品。
- 基本查询、连接查询、聚合与分组、数据库视图展示。
- 购买事务与重复购买拦截。
- 安全性、并发与恢复说明文档。

## 测试与验证

项目提供以下测试文件：

- `tests/test_api.py`
- `tests/test_sql_contract.py`
- `tests/test_purchase.py`

推荐在 MySQL 服务可用后执行：

```bash
.venv/bin/python -m pytest tests/test_api.py tests/test_sql_contract.py tests/test_purchase.py -v
```

前端构建验证：

```bash
cd frontend
npm run build
```

## 部署说明

- `Dockerfile` 使用多阶段构建，先打包 Vue，再将构建产物复制到 Flask 运行镜像。
- `docker-compose.yml` 提供 MySQL 与后端应用编排。
- `deploy/nginx.conf` 提供公网反向代理参考配置。
- `deploy/gunicorn.conf.py` 提供 Gunicorn 运行参数。

## 文档

- 详细项目说明见 `docs/report.md`
- 录屏脚本见 `docs/video-outline.md`
