/**
 * Demo / 汇报用：用「后端进程重启」作为重新登录的触发条件。
 *
 * 后端每次启动会在 /api/health 返回新的 instanceId；前端把上一次见到的 id 存在
 * localStorage，若本次请求到的 id 与上次不同，则视为后端已重启，清除 JWT，让演示时
 * 每次重启 `pnpm dev:server` 后都会回到未登录状态，方便老板看到登录页。
 *
 * 说明：仅重启 Vite（pnpm dev）而本机后端未重启时，instanceId 不变，登录态会保留。
 * 将来若不再需要「演示必登登录页」，可删除 AuthProvider 中的这段比对逻辑，改回只依赖 JWT 过期等。
 */
export const DEV_SERVER_INSTANCE_STORAGE_KEY =
  "my_site_dev_backend_instance_id";
