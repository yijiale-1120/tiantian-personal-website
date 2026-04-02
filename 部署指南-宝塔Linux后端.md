# 宝塔 Linux 部署后端（NestJS + PostgreSQL）行动指南

面向本仓库 `backend/`（Nest 全局前缀 `/api`）。按顺序做即可；路径、域名请换成你自己的。

---

## 0. 你需要提前准备

- 一台已安装 **宝塔面板** 的 Linux 云服务器（建议：**Ubuntu 22.04** 或 **Debian 12**，64 位）。
- 服务器已绑定**域名**（可选但推荐，便于 HTTPS 与 CORS）。
- 本地能 **SSH** 登录服务器（宝塔「终端」或本机 `ssh`）。
- 本机已能成功跑通后端（`pnpm --dir backend run start:dev`）并连上数据库，减少「代码问题」和「部署问题」混在一起。

---

## 1. 宝塔里安装运行环境

### 1.1 安装 Nginx

- 宝塔 → **软件商店** → 搜索 **Nginx** → 安装（用于反向代理与 HTTPS，不直接对公网暴露 Node 端口）。

### 1.2 安装 PostgreSQL

- **软件商店** → 搜索 **PostgreSQL** → 安装（版本选 **14+** 即可）。
- 安装完成后打开 **PostgreSQL** 管理：
  - 新建**数据库**，例如：`my_personal_website`。
  - 新建**用户**并授权该库（或记下 postgres 用户密码，按你面板里实际为准）。
- 记下连接信息：**主机**一般是 `127.0.0.1` 或 `localhost`，**端口**默认 `5432`（以面板显示为准）。

### 1.3 安装 Node.js

- **软件商店** → **运行环境** → **Node 版本管理器**（或「Node.js」一键安装）。
- 安装 **Node 20 LTS**（与当前项目兼容即可，不要用太旧的版本）。
- 确认终端里执行：

```bash
node -v
npm -v
```

### 1.4 安装 PM2（进程守护）

- 宝塔 → **软件商店** → 搜索 **PM2 管理器** → 安装；  
  或在 SSH 里全局安装：`npm i -g pm2`（二选一即可，别重复装乱套）。

---

## 2. 把代码放到服务器上

任选一种方式。

### 方式 A：Git 克隆（推荐，方便更新）

```bash
cd /www/wwwroot
git clone <你的仓库地址> my-personal-website
cd my-personal-website/backend
```

### 方式 B：本机打包上传

在本机项目根目录打包 `backend` 文件夹（不要上传 `node_modules`），用宝塔 **文件** 上传到例如：`/www/wwwroot/my-personal-website/backend`。

---

## 3. 配置环境变量 `backend/.env`

在服务器上编辑 **`/www/wwwroot/my-personal-website/backend/.env`**（路径按你实际目录）。

参考 `backend/.env.example`，**生产环境至少包含**：

| 变量 | 说明 |
|------|------|
| `DATABASE_URL` | PostgreSQL 连接串，例如：`postgresql://用户名:密码@127.0.0.1:5432/my_personal_website` |
| `PORT` | 本机监听端口，例如 `3000`（只给 Nginx 反代，不对外开放） |
| `NODE_ENV` | 生产写 **`production`**（见下文「首次建表」例外） |
| `JWT_SECRET` | **必填**：长随机字符串；生产环境未配置会启动失败（见 `jwt-secret.util.ts`） |
| `DATABASE_SSL` | 本机 PostgreSQL 一般 **`false`**；若用云厂商「带 SSL 的连接串」再按需 `true` |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | 首次启动会尝试创建管理员（bcrypt）；`ADMIN_PASSWORD` 为空则跳过种子 |
| `FRONTEND_ORIGIN` | **建议配置**：你的前端页面来源，逗号分隔。例如 `https://你的用户名.github.io` 或 `https://www.你的域名.com`。不配则 CORS 较宽松（`main.ts` 里 `origin: true`） |

示例（请把密码、域名改成真实值）：

```env
DATABASE_URL=postgresql://dbuser:你的强密码@127.0.0.1:5432/my_personal_website
PORT=3000
NODE_ENV=production
DATABASE_SSL=false
JWT_SECRET=请换成至少32位的随机字符串
ADMIN_USERNAME=admin
ADMIN_PASSWORD=你的管理员初始密码
FRONTEND_ORIGIN=https://你的前端域名
```

**安全：** `.env` 不要提交到 Git；宝塔文件权限不要给 777。

---

## 4. 首次部署：数据库表怎么来？（重要）

当前项目在 **`NODE_ENV=production`** 时，TypeORM **`synchronize` 为 `false`**，**不会自动建表**。你有两种常见做法：

### 做法 A：首次用「非 production」建表，再改回 production（适合个人项目）

1. 第一次启动前，把 `backend/.env` 里 **`NODE_ENV` 改成 `development`**（仅第一次）。
2. 安装依赖并构建、启动（见第 5 节），确认日志无报错，且数据库里已有表。
3. **停掉进程**，把 `NODE_ENV` 改回 **`production`**，再用 PM2 启动。

之后长期保持 `production`。

### 做法 B：在本地/CI 导出表结构，到服务器 `psql` 导入

适合更严谨的团队（需要你自己维护 SQL 或迁移）。本指南从略。

---

## 5. 安装依赖、构建

在服务器 SSH 中（路径按你的实际目录）：

```bash
cd /www/wwwroot/my-personal-website/backend
npm install
npm run build
```

成功后应存在文件：`backend/dist/main.js`（或 `dist/main`，以 `ls dist` 为准）。

若构建报缺包，多半是未在 `backend` 目录执行；确保当前目录下有 `package.json`。

---

## 6. 用 PM2 启动后端

**工作目录必须是 `backend`**，且能读到同目录下的 `.env`（项目里 `loadEnvFiles()` 从 `process.cwd()` 读 `.env`）。

```bash
cd /www/wwwroot/my-personal-website/backend
pm2 start dist/main.js --name nest-api
pm2 save
pm2 startup
```

- `pm2 save`：保存进程列表。  
- `pm2 startup`：按提示执行它打印的一条命令，实现**开机自启**。

查看日志：

```bash
pm2 logs nest-api
```

本机测试（在服务器上执行）：

```bash
curl -s http://127.0.0.1:3000/api/health
```

应返回包含 `ok`、`instanceId` 的 JSON。

---

## 7. Nginx 反向代理（推荐：用子域名或同域 `/api`）

**不要**把 `3000` 端口直接暴露到公网；只开 **80 / 443**，由 Nginx 转发到 `127.0.0.1:3000`。

### 7.1 若使用独立 API 子域名（例如 `api.example.com`）

1. 宝塔 → **网站** → **添加站点** → 域名填 `api.example.com`。
2. 该站点 → **设置** → **配置文件**，在 `server { ... }` 里增加一段（注意分号与缩进）：

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

3. **SSL** 里申请 Let's Encrypt 证书并开启强制 HTTPS。

此时对外 API 根地址为：`https://api.example.com/api/...`（因为 Nest 已设置全局前缀 `api`）。

### 7.2 若前端与后端同域（例如同一域名下 `/` 静态、`/api` 走后端）

在同一站点的 Nginx 配置里，只把 `/api` 转发到 Node：

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

前端生产环境若同域，`.env` / 构建参数里 **`VITE_API_BASE_URL` 可留空**，请求会走相对路径 `/api`。

---

## 8. 防火墙与安全组

- **云厂商安全组**：放行 **80、443**；**不要**对全网放行 `3000`。
- **宝塔防火墙**：同样只放行 HTTP/HTTPS。

---

## 9. 与 GitHub Pages / 静态前端的对接

前端构建时设置（GitHub Actions 或本机）：

```env
VITE_API_BASE_URL=https://你的API域名
```

例如 API 子域名为 `api.example.com`，则：

```env
VITE_API_BASE_URL=https://api.example.com
```

同时后端 `.env` 里 **`FRONTEND_ORIGIN`** 要包含 GitHub Pages 的 origin，例如：

`https://xxx.github.io`（注意是否带仓库路径，以浏览器地址栏为准）。

---

## 10. 更新后端版本时的操作

```bash
cd /www/wwwroot/my-personal-website
git pull
cd backend
npm install
npm run build
pm2 restart nest-api
```

若实体有变更且生产未开 `synchronize`，需自行处理迁移或手动改表（与第 4 节一致）。

---

## 11. 常见问题排查

| 现象 | 可能原因 |
|------|----------|
| 启动报 `JWT_SECRET is required in production` | 生产环境未设置 `JWT_SECRET` |
| 数据库连不上 | `DATABASE_URL` 用户名/密码/库名/端口错误；PostgreSQL 未监听 `127.0.0.1` |
| 502 Bad Gateway | PM2 未启动或端口不是 `3000`；Nginx `proxy_pass` 地址错 |
| 浏览器跨域失败 | `FRONTEND_ORIGIN` 未包含前端完整 origin；或应用未走 HTTPS 混用 |
| 能登录但马上 401 | 前后端域名不一致、或 `JWT_SECRET` 改过导致旧 token 失效，清浏览器本地存储重登 |

---

## 12. 检查清单（部署完自查）

- [ ] `curl https://你的域名/api/health` 返回 JSON 正常  
- [ ] `POST /api/auth/login` 能返回 `access_token`（账号密码正确）  
- [ ] 前端 `VITE_API_BASE_URL` 指向该 API 根地址，且 `FRONTEND_ORIGIN` 已配置  
- [ ] PM2 状态 `online`，且已 `pm2 save` + `startup`  
- [ ] 仅 80/443 对外，**3000 不暴露公网**

---

## 13. GitHub Actions 自动部署（push 即发布）

推送 `main` 分支时可由 GitHub Actions 自动构建前后端并同步到宝塔、重启 PM2，无需每次手动 SSH。一次性配置 SSH 密钥与仓库 Secrets 后生效。

**详见仓库根目录《GitHub Actions 部署宝塔说明.md》。**

---

*文档与仓库 `backend/src/main.ts`、`app.module.ts`、`.env.example` 行为一致；若你后续改为 Docker 或迁移脚本，请同步更新本节。*
