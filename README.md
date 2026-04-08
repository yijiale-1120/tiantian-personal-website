# My Personal Website

这是一个基于 `Next.js App Router`、`React 19`、`TypeScript` 和 `Tailwind CSS v4` 的个人网站项目，包含：

- 个人主页
- 登录页
- 反馈提交页
- 管理端反馈列表页
- NestJS + PostgreSQL 后端接口

## 开发

```bash
pnpm install
pnpm dev
```

默认带 `basePath`，本地访问：

```text
http://localhost:3000/tiantian-personal-website
```

后端默认端口为 `3001`（避免与 Next.js 的 `3000` 冲突），请在 `.env` 中配置：

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_BASE_PATH=/tiantian-personal-website
```

## 构建

```bash
pnpm build
```

当前已配置为静态导出，输出目录为 `out/`，可用于 GitHub Pages、宝塔静态站点或其他静态托管平台。
