/** API 根路径：生产与开发均可通过 NEXT_PUBLIC_API_BASE_URL 显式指定后端完整地址 */
export function apiUrl(path: string): string {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL;
  const base = typeof raw === "string" ? raw.replace(/\/$/, "") : "";
  const p = path.startsWith("/") ? path : `/${path}`;
  if (base) return `${base}${p}`;
  return p;
}
