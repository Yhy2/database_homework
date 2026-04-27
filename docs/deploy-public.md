# 公网部署说明

目标：把校园二手交易平台部署到云服务器，使本机电脑关机后仍可通过公网访问。

## 必须准备

- 一台云服务器/VPS，带公网 IPv4。
- 推荐系统：Ubuntu 22.04 LTS 或 Ubuntu 24.04 LTS。
- 推荐配置：1 vCPU / 1 GB 内存可运行，2 GB 内存更稳。
- 安全组或防火墙开放入站端口：`80`。如果配置 HTTPS，再开放 `443`。
- 服务器上安装 Docker Engine 和 Docker Compose 插件。
- 可选：域名。如果没有域名，可以先用 `http://服务器公网IP` 访问。

参考官方文档：

- Docker Ubuntu 安装：https://docs.docker.com/engine/install/ubuntu/
- Docker Compose 构建参数：https://docs.docker.com/compose/compose-file/build/
- Docker Compose 环境变量：https://docs.docker.com/compose/environment-variables/

## 当前项目生产部署文件

- `docker-compose.prod.yml`：生产部署用 Compose 文件。
- `.env.production.example`：生产环境变量模板。

生产配置与本地开发配置的关键区别：

- 不暴露 MySQL `3306` 到公网。
- 只把 Web 服务暴露到 `APP_PORT`，默认 `80`。
- 强制要求设置 `MYSQL_ROOT_PASSWORD` 和 `DEMO_ACCESS_TOKEN`。
- `DEMO_ACCESS_TOKEN` 会同时注入前端构建和后端运行环境；修改后必须重新构建镜像。

## 首次部署步骤

### 1. 登录云服务器

```bash
ssh root@你的服务器公网IP
```

### 2. 安装 Docker

按 Docker 官方 Ubuntu 文档安装 Docker Engine 和 Compose 插件。

安装完成后验证：

```bash
docker --version
docker compose version
```

### 3. 拉取项目代码

```bash
git clone git@github.com:Yhy2/database_homework.git
cd database_homework
```

如果服务器没有配置 GitHub SSH key，也可以用 HTTPS：

```bash
git clone https://github.com/Yhy2/database_homework.git
cd database_homework
```

### 4. 创建生产环境变量

```bash
cp .env.production.example .env
nano .env
```

至少修改：

```env
MYSQL_ROOT_PASSWORD=一个长随机密码
DEMO_ACCESS_TOKEN=一个长随机令牌
```

### 5. 启动服务

```bash
docker compose -f docker-compose.prod.yml up --build -d
```

### 6. 验证服务

```bash
docker compose -f docker-compose.prod.yml ps
curl http://127.0.0.1/api/health
```

浏览器访问：

```text
http://你的服务器公网IP
```

## 更新部署

```bash
cd database_homework
git pull
docker compose -f docker-compose.prod.yml up --build -d
```

如果只修改了 `.env` 中的 `DEMO_ACCESS_TOKEN`，也要保留 `--build`，否则前端登录页仍会使用旧令牌。

## 如果要绑定域名

1. 在域名 DNS 中添加 A 记录，指向服务器公网 IP。
2. 等 DNS 生效后，把访问地址改成 `http://你的域名`。
3. 如需 HTTPS，再配置 Nginx/Caddy/Certbot 申请证书。

## 注意事项

- 不要把 `.env` 提交到 Git。
- 不要开放 MySQL `3306` 到公网。
- 云服务器关机后网站也会停止；但你的个人电脑关机不影响云服务器。
- 如果使用国内大陆服务器和正式域名，通常还需要按云厂商要求完成备案。
