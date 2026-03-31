# 个人网站代码学习指南

## 项目概述

这是一个基于 React + Hono + PostgreSQL 的全栈个人网站项目，包含前端展示页面、反馈表单功能和后端 API 服务。

**技术栈：**
- **前端**：React 19 + TypeScript 5.9 + Vite 8 + Tailwind CSS 4
- **后端**：Hono 4 (Node.js 框架)
- **数据库**：PostgreSQL
- **包管理器**：pnpm

---

## 一、项目目录结构

```
my-personal-website/
├── src/                    # 前端源代码
│   ├── components/         # 可复用的 UI 组件
│   │   ├── GlobalFooter.tsx
│   │   └── GlobalNav.tsx
│   ├── pages/              # 页面组件
│   │   ├── Home.tsx        # 首页（个人介绍）
│   │   ├── Feedback.tsx    # 反馈表单页
│   │   └── adminFeedbacks.tsx  # 反馈列表页
│   ├── App.tsx             # 路由配置
│   ├── main.tsx            # 应用入口
│   └── index.css           # 全局样式
├── server/                 # 后端代码
│   ├── index.js            # 服务器主文件
│   └── db.js               # 数据库连接
├── public/                 # 静态资源
├── dist/                   # 构建输出
├── package.json            # 项目配置
└── vite.config.ts          # Vite 配置
```

**通俗理解**：
- `src/` 是餐厅的大堂，负责展示和接待客人
- `server/` 是厨房，负责处理订单和存取数据
- `public/` 是餐厅的招牌和装饰

---

## 二、前端部分详解

### 1. 入口文件 `src/main.tsx`

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

**代码解析**：
- `createRoot`：创建 React 应用的根节点，就像把餐厅开在哪个地址
- `StrictMode`：React 的严格模式，帮助发现潜在问题
- `document.getElementById("root")`：在 HTML 中找到 id 为 "root" 的元素，把应用渲染进去

---

### 2. 路由配置 `src/App.tsx`

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Feedback from "./pages/Feedback";
import AdminFeedbacks from "./pages/adminFeedbacks";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/admin/feedbacks" element={<AdminFeedbacks />} />
      </Routes>
    </div>
  );
}

export default function Root() {
  return (
    <BrowserRouter basename="/tiantian-personal-website/">
      <App />
    </BrowserRouter>
  );
}
```

**代码解析**：

| 组件 | 作用 | 类比 |
|------|------|------|
| `BrowserRouter` | 提供路由功能，让网址能切换页面 | 餐厅的总控系统 |
| `basename` | 网站部署在子目录下，所有路径前加这个前缀 | 餐厅在商场3楼，地址都要写"3楼" |
| `Routes` | 路由的容器 | 交通指挥台 |
| `Route` | 定义一条规则：什么网址对应什么页面 | 指示牌 |

**路由匹配流程**：
1. 用户访问 `/` → 显示 `Home` 组件
2. 用户访问 `/feedback` → 显示 `Feedback` 组件
3. 用户访问 `/admin/feedbacks` → 显示 `AdminFeedbacks` 组件

---

### 3. 首页 `src/pages/Home.tsx`

#### 数据定义部分

```tsx
const DATA = {
  profile: {
    name: "易家乐",
    role: "Frontend Developer",
    bio: "从土木工程蓝图到数字世界架构...",
    tags: ["25岁", "湖北工程学院", "土木转行", "自学成才"],
  },
  projects: [
    { id: "weather", title: "Weather Pulse", ... },
    { id: "ai-chat", title: "DeepChat Mini", ... },
  ],
  skills: ["React", "TypeScript", "Tailwind CSS", ...],
  timeline: [
    { year: "2021", event: "开始自学前端..." },
    { year: "2022", event: "学习 React..." },
  ],
};
```

**设计思想**：
- 数据和展示分离，改内容只需要改这里
- 类比：餐厅先准备好所有食材（数据），然后再烹饪（渲染）

#### 状态管理

```tsx
const [activeTab, setActiveTab] = useState("works");
```

**代码解析**：
- `useState` 是 React 的"记忆功能"
- `"works"` 是默认值，页面刚打开时显示"项目作品"
- 调用 `setActiveTab("roadmap")` 切换标签

#### 标签切换逻辑

```tsx
<button onClick={() => setActiveTab("works")} className={...}>
  项目作品
</button>
<button onClick={() => setActiveTab("roadmap")} className={...}>
  技术路线
</button>

{activeTab === "works" ? (
  <div>{/* 项目作品内容 */}</div>
) : (
  <div>{/* 技术路线内容 */}</div>
)}
```

**代码解析**：
- `? :` 是三元运算符，相当于 `if-else`
- 根据 `activeTab` 的值决定显示哪个内容

---

### 4. 反馈表单 `src/pages/Feedback.tsx`

#### 表单状态管理

```tsx
const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
} = useForm<FormData>();

const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
```

**react-hook-form 的作用**：
- `register`：把输入框"注册"到表单系统
- `handleSubmit`：处理提交，先验证再执行
- `errors`：验证失败的错误信息
- `reset`：提交成功后清空表单

#### 表单验证

```tsx
<input
  type="text"
  {...register("name", { required: "请输入姓名" })}
/>
{errors.name && <p className="text-red-500">{errors.name.message}</p>}

<input
  type="email"
  {...register("email", {
    required: "请输入邮箱",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "邮箱格式不正确",
    },
  })}
/>
```

**代码解析**：
- `required`：必填验证
- `pattern`：正则表达式验证
- `errors.name &&`：有条件地渲染错误提示

#### 提交函数

```tsx
const onSubmit = async (data: FormData) => {
  setSubmitStatus("loading");
  
  try {
    const res = await fetch("http://localhost:3000/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const payload = await res.json();

    if (!res.ok || payload?.success !== true) {
      throw new Error(payload?.message || "请求失败");
    }

    setSubmitStatus("success");
    reset();
  } catch (err) {
    setSubmitStatus("error");
  }
};
```

**代码执行流程**：

| 步骤 | 代码 | 作用 |
|------|------|------|
| 1 | `setSubmitStatus("loading")` | 显示"提交中"，防止重复点击 |
| 2 | `fetch("...", { method: "POST" })` | 向后端发送 POST 请求 |
| 3 | `headers: { "Content-Type": "application/json" }` | 告诉后端发送的是 JSON |
| 4 | `body: JSON.stringify(data)` | 把 JS 对象转成 JSON 字符串 |
| 5 | `res.json()` | 解析后端返回的 JSON |
| 6 | `reset()` | 清空表单 |

---

### 5. 反馈列表页 `src/pages/adminFeedbacks.tsx`

#### 数据获取

```tsx
useEffect(() => {
  let mounted = true;

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/feedback");
      const payload = await res.json();
      if (!res.ok || payload?.success !== true) {
        throw new Error(payload?.message);
      }
      if (mounted) setFeedbacks(payload.feedbacks ?? []);
    } catch (err) {
      if (mounted) setErrorMsg("加载失败");
    }
  };

  fetchFeedbacks();
  const timer = window.setInterval(fetchFeedbacks, 3000); // 每3秒刷新

  return () => {
    mounted = false;
    window.clearInterval(timer);
  };
}, []);
```

**代码解析**：

| 概念 | 说明 |
|------|------|
| `useEffect` | React 的副作用钩子，用于执行数据获取等操作 |
| `mounted` | 防止组件卸载后还更新状态 |
| `setInterval` | 定时轮询，实现"实时更新"效果 |
| `return () => {...}` | 清理函数，组件卸载时执行 |

---

## 三、后端部分详解

### 1. 服务器主文件 `server/index.js`

#### 环境变量加载

```javascript
function loadDotEnv() {
  const envPath = path.resolve(__dirname, "..", ".env");
  if (!existsSync(envPath)) return;

  const raw = readFileSync(envPath, "utf8");
  const lines = raw.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;

    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}
```

**作用**：读取 `.env` 文件中的配置（如数据库密码），设置到环境变量中

#### 跨域配置

```javascript
app.use("/api/*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "OPTIONS"],
  allowHeaders: ["Content-Type"],
}));
```

**什么是 CORS？**
- 浏览器安全机制：前端在 `localhost:5173`，后端在 `localhost:3000`，默认不能通信
- `cors()` 告诉后端"允许所有来源访问"

#### 提交反馈接口

```javascript
app.post("/api/feedback", async (c) => {
  const pool = getDbPool();
  
  // 1. 获取请求体
  const body = await c.req.json();
  
  // 2. 验证数据
  const { name, email, content } = body;
  if (!isNonEmptyString(name)) {
    return c.json({ success: false, message: "Invalid name." }, 400);
  }
  
  // 3. 存入数据库
  const result = await pool.query(
    `INSERT INTO feedbacks (name, email, content) VALUES ($1, $2, $3) RETURNING id;`,
    [name.trim(), email.trim(), content.trim()]
  );

  // 4. 返回成功
  return c.json({ success: true, id: Number(result.rows[0].id) }, 201);
});
```

**代码解析**：

| 步骤 | 代码 | HTTP 状态码 | 说明 |
|------|------|-------------|------|
| 获取数据 | `c.req.json()` | - | 读取前端发来的 JSON |
| 验证失败 | `return ... 400` | 400 Bad Request | 数据格式错误 |
| 插入数据 | `pool.query("INSERT...")` | - | 执行 SQL |
| 成功返回 | `return ... 201` | 201 Created | 创建成功 |

#### SQL 参数化查询（防注入）

```javascript
// 危险写法（直接拼接）
`INSERT INTO feedbacks VALUES ('${name}')`  // 容易被 SQL 注入攻击

// 安全写法（参数化查询）
`INSERT INTO feedbacks VALUES ($1, $2, $3)`, [name, email, content]
// 数据库会把参数当作纯文本处理，不会执行恶意代码
```

---

### 2. 数据库文件 `server/db.js`

#### 连接池

```javascript
function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === "true" 
        ? { rejectUnauthorized: false } 
        : undefined,
    });
  }
  return pool;
}
```

**什么是连接池？**
- 数据库连接很耗时，连接池会预先建立好几个连接，复用它们
- 类比：餐厅有5个服务员待命，客人来了直接服务

#### 初始化数据库

```javascript
export async function initDb() {
  const pool = getPool();
  
  await pool.query(`
    CREATE TABLE IF NOT EXISTS feedbacks (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS feedbacks_created_at_idx
    ON feedbacks (created_at DESC, id DESC);
  `);
}
```

**数据类型说明**：

| 类型 | 含义 |
|------|------|
| `BIGSERIAL` | 64位自增整数，自动编号 |
| `PRIMARY KEY` | 主键，唯一标识每条记录 |
| `TEXT` | 可变长度文本 |
| `NOT NULL` | 不能为空 |
| `TIMESTAMPTZ` | 带时区的时间戳 |
| `DEFAULT NOW()` | 默认值为当前时间 |

**索引的作用**：
- 没有索引：查10000条记录要逐个看，慢
- 有索引：像书的目录，直接定位，快

---

## 四、前后端数据流转

```
用户填写表单（Feedback.tsx）
    ↓
点击提交 → handleSubmit → onSubmit
    ↓
fetch("http://localhost:3000/api/feedback", { 
  method: "POST", 
  body: JSON.stringify(data) 
})
    ↓
网络请求到达后端（server/index.js）
    ↓
app.post("/api/feedback") 匹配成功
    ↓
验证数据（name, email, content）
    ↓
pool.query("INSERT INTO feedbacks...") → db.js
    ↓
PostgreSQL 执行 SQL，插入数据
    ↓
返回 { success: true, id: 123 }
    ↓
前端收到响应，显示"提交成功"
```

---

## 五、关键配置文件

### `package.json`

```json
{
  "scripts": {
    "dev": "vite",              // 启动前端开发服务器
    "dev:server": "node server/index.js",  // 启动后端服务器
    "build": "tsc -b && vite build",       // 构建生产版本
    "lint": "eslint ."          // 代码检查
  }
}
```

### `vite.config.ts`

```typescript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/tiantian-personal-website/",  // 部署路径
});
```

---

## 六、开发流程

### 启动开发环境

```bash
# 终端1：启动前端
cd /Users/apple/Desktop/my-personal-website
pnpm run dev

# 终端2：启动后端
cd /Users/apple/Desktop/my-personal-website
pnpm run dev:server
```

### 构建生产版本

```bash
pnpm run build
```

构建后的文件在 `dist/` 目录中。

---

## 七、阅读代码的建议顺序

如果你是初学者，建议按这个顺序阅读：

1. **`src/pages/Home.tsx`** → 了解首页长什么样，数据如何组织
2. **`src/App.tsx`** → 了解页面如何切换
3. **`src/pages/Feedback.tsx`** → 了解表单如何提交
4. **`server/index.js`** → 了解后端如何处理请求
5. **`server/db.js`** → 了解数据如何存储

---

## 八、常见问题速查

| 我想找... | 应该看哪个文件 |
|-----------|---------------|
| 页面长什么样 | `src/pages/*.tsx` |
| 页面如何跳转 | `src/App.tsx` |
| 表单提交后去哪了 | `server/index.js` 的 `app.post("/api/feedback")` |
| 数据存在哪 | `server/db.js` |
| 样式在哪写 | 直接写在 `.tsx` 文件里的 `className`（Tailwind CSS） |
| 怎么启动项目 | `package.json` 的 `scripts` 部分 |

---

## 九、扩展学习方向

1. **React**：学习 useState、useEffect、组件通信
2. **TypeScript**：学习类型定义、接口
3. **Tailwind CSS**：学习实用类名写法
4. **Hono**：学习更多中间件、路由功能
5. **PostgreSQL**：学习更多 SQL 语句
6. **JWT 认证**：学习用户登录系统（可选扩展）
