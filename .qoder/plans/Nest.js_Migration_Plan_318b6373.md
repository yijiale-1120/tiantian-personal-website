# Nest.js 后端重构与 JWT 认证实施计划

## 项目背景
- **当前技术栈**：Hono + PostgreSQL + React
- **目标技术栈**：Nest.js + TypeORM + PostgreSQL + JWT + React
- **核心需求**：登录认证、反馈功能保护、前后端适配

---

## 第一阶段：后端基础设施搭建

### 任务 1.1：初始化 Nest.js 项目
**操作步骤**：
1. 创建新的 Nest.js 项目目录
2. 使用 Nest CLI 初始化项目结构
3. 安装核心依赖：@nestjs/common、@nestjs/core、@nestjs/platform-express
4. 安装开发依赖：@nestjs/cli、typescript、ts-node

**交付物**：
- 可运行的 Nest.js 基础项目
- 项目目录结构符合 Nest.js 规范

---

### 任务 1.2：配置 TypeORM 与数据库连接
**操作步骤**：
1. 安装 TypeORM 相关依赖：@nestjs/typeorm、typeorm、pg
2. 安装配置管理：@nestjs/config
3. 创建数据库配置文件
4. 编写 TypeORM 配置模块
5. 测试数据库连接

**交付物**：
- ormconfig.ts 或 database.module.ts
- .env 环境变量配置模板
- 数据库连接测试通过

---

### 任务 1.3：创建数据库实体
**操作步骤**：
1. 创建 User 实体（id、username、password、createdAt）
2. 创建 Feedback 实体（id、content、userId、createdAt）
3. 定义实体关系（Feedback 多对一 User）
4. 配置实体同步策略

**交付物**：
- user.entity.ts
- feedback.entity.ts
- 数据库表结构自动创建

---

## 第二阶段：认证模块开发

### 任务 2.1：安装认证相关依赖
**操作步骤**：
1. 安装 JWT 依赖：@nestjs/jwt、@nestjs/passport、passport、passport-jwt
2. 安装密码加密：bcrypt
3. 安装类型定义：@types/bcrypt、@types/passport-jwt

**交付物**：
- package.json 更新完成
- 依赖安装无报错

---

### 任务 2.2：实现 AuthModule
**操作步骤**：
1. 创建 AuthModule 模块结构
2. 实现 AuthService（登录验证、Token 生成）
3. 实现 AuthController（/auth/login 接口）
4. 配置 JWT 策略（JwtStrategy）
5. 实现 JWT Guard（AuthGuard）

**交付物**：
- auth.module.ts
- auth.service.ts
- auth.controller.ts
- jwt.strategy.ts
- jwt-auth.guard.ts

---

### 任务 2.3：创建默认管理员账号
**操作步骤**：
1. 编写数据库种子脚本
2. 创建默认用户（admin / 密码）
3. 在应用启动时执行种子脚本

**交付物**：
- seeds/admin.seed.ts
- 可登录的默认账号

---

## 第三阶段：反馈模块重构

### 任务 3.1：实现 FeedbackModule
**操作步骤**：
1. 创建 FeedbackModule 模块结构
2. 实现 FeedbackService（业务逻辑）
3. 实现 FeedbackController（路由处理）

**交付物**：
- feedback.module.ts
- feedback.service.ts
- feedback.controller.ts

---

### 任务 3.2：配置路由保护
**操作步骤**：
1. GET /feedback 保持公开访问
2. POST /feedback 添加 @UseGuards(JwtAuthGuard)
3. 在控制器中获取当前用户（@CurrentUser 装饰器）
4. 保存反馈时关联当前用户 ID

**交付物**：
- 受保护的路由配置
- current-user.decorator.ts

---

## 第四阶段：前端适配

### 任务 4.1：安装前端依赖
**操作步骤**：
1. 安装 axios（HTTP 客户端）
2. 确认 react-router-dom 已安装

**交付物**：
- 前端依赖更新完成

---

### 任务 4.2：创建认证上下文
**操作步骤**：
1. 创建 AuthContext（登录状态管理）
2. 实现登录、登出、Token 存储功能
3. 提供全局认证状态

**交付物**：
- contexts/AuthContext.tsx

---

### 任务 4.3：配置 Axios 拦截器
**操作步骤**：
1. 创建 axios 实例配置
2. 添加请求拦截器（自动附加 Authorization 头）
3. 添加响应拦截器（处理 401 错误）

**交付物**：
- lib/axios.ts

---

### 任务 4.4：创建登录页面
**操作步骤**：
1. 创建 Login.tsx 组件
2. 实现表单（用户名、密码）
3. 调用后端 /auth/login 接口
4. 登录成功后存储 Token 并跳转

**交付物**：
- pages/Login.tsx

---

### 任务 4.5：创建路由保护组件
**操作步骤**：
1. 创建 ProtectedRoute 组件
2. 检查登录状态
3. 未登录时重定向到 /login
4. 记录来源路径用于登录后跳转

**交付物**：
- components/ProtectedRoute.tsx

---

### 任务 4.6：修改反馈页面
**操作步骤**：
1. 修改 Feedback.tsx，添加登录检查
2. 未登录时显示"请先登录"提示
3. 登录后显示反馈表单和列表

**交付物**：
- 更新后的 pages/Feedback.tsx

---

### 任务 4.7：更新路由配置
**操作步骤**：
1. 在 App.tsx 中添加 /login 路由
2. 为 /feedback 添加 ProtectedRoute 包装
3. 更新导航栏登录按钮链接

**交付物**：
- 更新后的 App.tsx
- 更新后的导航组件

---

## 第五阶段：测试与部署

### 任务 5.1：后端 API 测试
**操作步骤**：
1. 测试 /auth/login 接口
2. 测试 GET /feedback（公开）
3. 测试 POST /feedback（需认证）
4. 验证 Token 过期处理

**交付物**：
- API 测试通过记录

---

### 任务 5.2：前端集成测试
**操作步骤**：
1. 测试登录流程
2. 测试未登录时访问反馈页
3. 测试登录后提交反馈
4. 测试 Token 持久化

**交付物**：
- 功能测试通过记录

---

### 任务 5.3：部署配置
**操作步骤**：
1. 配置生产环境环境变量
2. 配置 CORS（跨域）
3. 配置数据库连接（生产环境）

**交付物**：
- .env.production 模板
- 部署文档

---

## 实施时间表

| 阶段 | 预计时间 | 关键里程碑 |
|------|----------|-----------|
| 第一阶段 | 2-3 小时 | Nest.js 项目可运行，数据库连接成功 |
| 第二阶段 | 3-4 小时 | /auth/login 接口可用，Token 生成正常 |
| 第三阶段 | 2-3 小时 | 反馈模块重构完成，路由保护生效 |
| 第四阶段 | 3-4 小时 | 前端登录功能完整，路由保护生效 |
| 第五阶段 | 2 小时 | 全功能测试通过，可部署 |

**总计：12-16 小时**

---

## 风险与注意事项

1. **数据库迁移**：现有 feedbacks 表数据需要迁移，注意备份
2. **API 路径变化**：前端请求的 URL 可能需要调整
3. **CORS 配置**：开发环境和生产环境的跨域配置不同
4. **Token 安全**：JWT_SECRET 必须使用强密码，生产环境定期更换
5. **密码加密**：用户密码必须使用 bcrypt 加密，禁止明文存储
