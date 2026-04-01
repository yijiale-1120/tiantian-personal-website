# Nest.js 重构实施说明（功能增量与 Hono 对比）

## 项目背景

- **重构前**：根目录 `server/index.js` 使用 **Hono** 挂载在 Node 上，手写 SQL（`pg`），无用户表、无登录；`POST /api/feedback` 匿名即可提交；`GET /api/feedback` 拉取列表。
- **重构后**：`backend/` 目录为 **Nest.js** 应用，**TypeORM** 管理实体与数据库，**JWT + Passport** 做认证；全局路由前缀 **`/api`**，与原先前端路径习惯对齐。
- **前端**：React + Vite，增加登录态、`axios` 实例、受保护路由与反馈页「请先登录」交互；原 Hono 服务与根目录对 `hono`/`pg` 的依赖已移除，由 `pnpm dev:server` 启动 Nest 后端。

---

## 一、后端新增能力概览

| 能力 | 说明 |
|------|------|
| 模块化架构 | `AuthModule`、`FeedbackModule` 分离，依赖注入（`@Injectable`、构造函数注入）。 |
| 数据模型 | `User`、`Feedback` 实体；反馈保留 `name/email/content`，并增加可空 **`user_id`** 关联提交人。 |
| JWT 登录 | `POST /api/auth/login` 校验 bcrypt 密码，签发 JWT；`JwtStrategy` + `JwtAuthGuard` 保护写接口。 |
| 校验与 DTO | `class-validator` 校验请求体（如 `CreateFeedbackDto`、`LoginDto`）；全局 `ValidationPipe`。 |
| 种子用户 | `SeedService` 启动时若不存在配置中的管理员则创建（bcrypt 存 `password_hash`）。 |
| 健康检查增强 | `GET /api/health` 除 `ok` 外返回 **`instanceId`**（进程级 UUID），供前端 Demo 检测「后端是否重启」。 |
| 兼容旧库 | `fix-legacy-users-table.ts`、`load-env-files.ts` 等在 `main.ts` 中于 TypeORM 同步前执行，缓解历史表结构冲突（按需演进，非业务功能）。 |

---

## 二、典型代码示例（节选）

### 1. 反馈接口：读公开、写需登录

路由前缀在 `main.ts` 中为 `api`，控制器为 `feedback`，故对外路径仍为 **`/api/feedback`**。

```typescript
// backend/src/feedback/feedback.controller.ts（节选）
@Controller('feedback')
export class FeedbackController {
  @Get()
  findAll() {
    return this.feedback.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() dto: CreateFeedbackDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.feedback.create(dto, user.userId);
  }
}
```

**要点**：`GET` 保持公开（与早期计划一致）；`POST` 使用 **`JwtAuthGuard`**，并通过 **`@CurrentUser()`** 取当前用户 id 写入反馈。

### 2. 登录接口

```typescript
// backend/src/auth/auth.controller.ts
@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }
}
```

对外路径：**`POST /api/auth/login`**，返回体含 **`access_token`**（与前端 `AuthProvider` 中字段一致）。

### 3. 前端：后端重启后 Demo 重新登录（可选逻辑）

```typescript
// src/contexts/AuthProvider.tsx（节选）
const res = await fetch(apiUrl("/api/health"));
const data = (await res.json()) as { instanceId?: string };
const instanceId = data.instanceId;
const prev = localStorage.getItem(DEV_SERVER_INSTANCE_STORAGE_KEY);
if (prev != null && instanceId != null && prev !== instanceId) {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("username");
}
if (instanceId) {
  localStorage.setItem(DEV_SERVER_INSTANCE_STORAGE_KEY, instanceId);
}
```

**要点**：比较前后两次 **`/api/health`** 的 `instanceId`，判断 **Nest 进程是否重启**；变化则清除本地 token，便于演示时重复看到登录页（详细说明见 `src/lib/dev-server-session.ts` 注释）。

---

## 三、与 Hono 时期的主要不同

| 维度 | Hono（原 `server/index.js`） | Nest.js（现 `backend/`） |
|------|------------------------------|---------------------------|
| 框架形态 | 单文件链式路由，`app.post/get` | 模块 + 控制器 + 服务分层，装饰器路由 |
| 数据访问 | 手写 `pool.query` SQL | TypeORM `Repository` + 实体，开发环境可 `synchronize`（生产建议迁移） |
| 认证 | 无 | JWT + Passport，`Authorization: Bearer` |
| 反馈写入 | 匿名，仅校验 name/email/content | 需登录；服务端写入 **`user_id`**（与 JWT 主体一致） |
| 校验 | 手写 `if` 与长度判断 | `class-validator` + 全局管道 |
| 配置 | 自写 `loadDotEnv` | `@nestjs/config` + `load-env-files`（启动前）双轨 |
| 进程标识 | 无 | `health` 返回 **`instanceId`**，配合前端 Demo 清登录态 |

**路径约定**：二者在业务上均使用 **`/api`** 前缀（Nest 通过 `setGlobalPrefix('api')`），前端可用 Vite 代理或 `VITE_API_BASE_URL` 指向后端根地址。

---

## 四、前端侧配套变更（摘要）

- **`axios` 实例**（`src/lib/axios.ts`）：请求自动带 `Authorization`，`401` 时清 token 并跳转登录。
- **登录页** `Login.tsx`、`AuthProvider`、受保护的管理页路由（如 `ProtectedRoute` 包裹 `/admin/feedbacks`）。
- **反馈页**：未登录可进入页面，**弹窗「请先登录」**；登录后可提交；主页右上角按钮随登录态切换（如「已登录」灰显 +「反馈」链接）。
- **API 基址**：`src/lib/api.ts` 的 `apiUrl()`，开发环境常配合 Vite `proxy` 访问 `/api`。

---

## 五、风险与注意事项

1. **生产环境**：关闭或慎用 TypeORM **`synchronize`**，改为迁移脚本；**`JWT_SECRET`**、数据库密码必须强随机。
2. **`GET /api/feedback` 仍为公开**：若需仅管理员可见列表，需额外加守卫或独立管理接口（当前与最初计划「GET 公开」一致）。
3. **Chrome 密码提示**：使用 `admin`/`admin` 等弱口令会触发浏览器「密码泄露」类提示，与站点是否泄露无关；生产与演示应使用强密码并更新库中 **`password_hash`**。
4. **Demo 清登录态**：依赖 **后端重启** 后 `instanceId` 变化；仅重启 Vite 不会清除本地 token。

---

## 六、交付物对照（相对原《Nest.js 迁移计划》）

| 计划项 | 实施结果说明 |
|--------|----------------|
| User / Feedback 实体 | 已实现；反馈侧保留 **name、email、content**，并增加 **userId**，以兼容原表单与历史数据。 |
| JWT、登录、Guard | 已实现；`POST /api/feedback` 受保护。 |
| 前端 Auth、axios、登录页 | 已实现；交互上增加了反馈页弹窗与主页按钮策略。 |
| 种子管理员 | 已实现；密码来源 `.env` 与开发默认策略见 `AuthService.ensureDefaultAdmin`。 |

---

**文档版本**：与仓库当前实现同步，用于汇报与交接；若后续关闭 Demo 专用逻辑或调整 `GET /api/feedback` 权限，请同步更新本文档。
