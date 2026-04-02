# GitHub Actions 自动部署到宝塔

推送（`push`）到 **`main`** 分支时，工作流 **`.github/workflows/deploy-baota.yml`** 会：

1. 在 GitHub 云端安装依赖并 **构建前端**（`pnpm run build`）与 **后端**（`pnpm --dir backend run build`）。
2. 通过 **SSH + rsync** 把前端 `dist/` 同步到服务器网站目录，把后端 `dist/`、`package.json`、`pnpm-lock.yaml` 同步到服务器上的后端目录。
3. SSH 登录服务器，在 **后端目录**执行 `pnpm install --frozen-lockfile --prod`，并 **`pm2 restart nest-api`**（若进程不存在则 `pm2 start`）。

**无需每次手动 SSH**，但第一次需要在服务器上准备好目录、`.env`、SSH 公钥（见下文）。

---

## 一、仓库里要配置的 Secrets

打开：**GitHub 仓库 → Settings → Secrets and variables → Actions → New repository secret**。

| Secret 名称 | 是否必填 | 说明 |
|-------------|----------|------|
| `DEPLOY_HOST` | 必填 | 服务器公网 IP 或域名，如 `118.x.x.x` |
| `DEPLOY_USER` | 必填 | SSH 登录用户名，常用 `root` 或你创建的部署用户 |
| `DEPLOY_SSH_KEY` | 必填 | **私钥**全文（`-----BEGIN ... PRIVATE KEY-----` 到 `-----END...`），用于 GitHub 连接服务器 |
| `DEPLOY_WEB_ROOT` | 必填 | 前端静态文件在服务器上的目录，**必须以 `/` 结尾或配合 rsync 习惯**：例如 `/www/wwwroot/你的站点/`（表示把 `dist/` 里的文件同步进该目录） |
| `DEPLOY_BACKEND_DIR` | 必填 | 后端在服务器上的目录，**无末尾斜杠**，例如 `/www/wwwroot/my-personal-website/backend` |
| `VITE_API_BASE_URL` | 建议填 | 浏览器能访问的 **API 根地址**，如 `https://api.你的域名.com`（**不要**末尾 `/`）。若前端与 API **同域**且靠 Nginx 反代 `/api`，可设为 **空**（需在构建环境里允许空字符串；不配置该 Secret 时变量为空，请确认 `src/lib/api.ts` 行为符合预期） |
| `DEPLOY_SSH_PORT` | 可选 | SSH 端口，默认 `22`；若改为如 `2222` 再填 |

说明：

- **`DEPLOY_WEB_ROOT`**：请与宝塔里该站点「网站目录」一致；同步的是 **Vite 构建结果**（`index.html`、`assets/` 等），一般会 **覆盖**该目录下已有同名文件（`rsync --delete`）。
- **`DEPLOY_BACKEND_DIR`**：服务器上应已存在该路径，且其中有一份 **`backend/.env`**（**不要**提交到 Git，也不会被 rsync 覆盖），内含 `DATABASE_URL`、`JWT_SECRET`、`NODE_ENV=production` 等，与《部署指南-宝塔Linux后端.md》一致。

---

## 二、服务器一次性准备（SSH 密钥）

GitHub Actions 需要用 **私钥**登录你的服务器，请使用 **专门的一对密钥**（不要用你个人笔记本的默认私钥上传仓库）。

### 1. 在本机生成密钥（示例）

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ./github_actions_deploy -N ""
```

得到 `github_actions_deploy`（私钥）和 `github_actions_deploy.pub`（公钥）。

### 2. 把公钥放到服务器

把 **`github_actions_deploy.pub`** 的内容追加到服务器上的：

`/root/.ssh/authorized_keys`（若 `DEPLOY_USER` 为 root）

或对应用户的 `~/.ssh/authorized_keys`，并保证权限正确（如 `chmod 600 authorized_keys`）。

可用宝塔终端执行：

```bash
mkdir -p /root/.ssh
echo '这里粘贴 .pub 文件一整行' >> /root/.ssh/authorized_keys
chmod 700 /root/.ssh
chmod 600 /root/.ssh/authorized_keys
```

### 3. 把私钥放进 GitHub Secret

复制 **`github_actions_deploy`** 私钥**全文**（含首尾行），粘贴到 Secret **`DEPLOY_SSH_KEY`**。

**不要**把私钥提交到仓库。

### 4. 验证（本机）

```bash
ssh -i ./github_actions_deploy root@你的服务器IP
```

能登录即说明密钥侧配置正确；再在 Actions 里跑一遍工作流。

---

## 三、服务器目录与首次后端运行

1. 在宝塔创建网站，`DEPLOY_WEB_ROOT` 指向该站点根目录（例如 `.../public` 或站点根，按你 Nginx 配置）。
2. 在服务器上创建 **`DEPLOY_BACKEND_DIR`**（例如 `git clone` 一次仓库到 `/www/wwwroot/xxx`，或手动建 `backend` 文件夹），并把 **`backend/.env`** 配好；**首次**可按《部署指南-宝塔Linux后端.md》用 PM2 手动启动过一次，确认 `curl 127.0.0.1:3000/api/health` 正常。
3. 确保已安装 **Node、PM2**；工作流会在需要时执行 `npm install -g pnpm@10`。

之后每次 push，工作流会更新 `dist` 与依赖并重启 PM2。

---

## 四、与 GitHub Pages 的关系

- 原先「每次 push 自动发布 GitHub Pages」已改为 **仅手动**：工作流 **`deploy-github-pages.yml`**，在 Actions 里选 **Run workflow** 才会执行。
- 若网站 **完全托管在宝塔**，一般只需 **`deploy-baota.yml`**；不必再跑 Pages。

---

## 五、常见问题

| 现象 | 处理 |
|------|------|
| `Permission denied (publickey)` | 检查公钥是否在 `authorized_keys`；私钥是否完整粘贴到 `DEPLOY_SSH_KEY`；用户是否和 Secret 一致 |
| 前端页面空白或资源 404 | 检查 `vite.config.ts` 的 `base` 与网站是否同路径；`DEPLOY_WEB_ROOT` 是否为 Nginx 实际根目录 |
| 接口连不上 | 检查 **`VITE_API_BASE_URL`** 是否为浏览器可访问的 HTTPS 地址；后端 CORS **`FRONTEND_ORIGIN`** 是否包含前端页面 origin |
| `pnpm: command not found` | 工作流会尝试 `npm install -g pnpm@10`；若失败，在服务器上手动装一次 pnpm |
| PM2 重启后仍旧代码 | 看 Actions 日志里 rsync、SSH 是否成功；确认 `DEPLOY_BACKEND_DIR` 与手动部署路径一致 |

---

## 六、`VITE_API_BASE_URL` 与 Secret 为空

构建步骤使用：

```yaml
VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
```

若 **不创建** 该 Secret，值为空字符串，构建时与本地未设置该变量行为一致（走相对路径 `/api`，适合 **前后端同域** 部署）。若前端在 `https://xxx.github.io`、API 在另一域名，**必须**配置该 Secret 为完整 API 根 URL。
