import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import path from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { initDb, getDbPool } from "./db.js";

function loadDotEnv() {
  // Load .env from project root (non-production helper).
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
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

    // Support simple quoted values: KEY="value"
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadDotEnv();

const app = new Hono();

// For local development: allow the Vite dev server to call the API.
app.use(
  "/api/*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  })
);

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validateEmail(email) {
  // Simple RFC-ish email validation.
  const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return re.test(email);
}

function serializeFeedbackRow(r) {
  return {
    id: Number(r.id),
    name: r.name,
    email: r.email,
    content: r.content,
    createdAt: r.created_at instanceof Date ? r.created_at.toISOString() : r.created_at,
  };
}

app.post("/api/feedback", async (c) => {
  const pool = getDbPool();
  let body;
  try {
    body = await c.req.json();
  } catch {
    return c.json(
      { success: false, message: "Invalid JSON body." },
      400
    );
  }

  const name = body?.name;
  const email = body?.email;
  const content = body?.content;

  if (!isNonEmptyString(name)) {
    return c.json(
      { success: false, message: "Invalid name." },
      400
    );
  }
  if (!isNonEmptyString(email) || !validateEmail(email)) {
    return c.json(
      { success: false, message: "Invalid email." },
      400
    );
  }
  if (!isNonEmptyString(content)) {
    return c.json(
      { success: false, message: "Invalid content." },
      400
    );
  }

  // Soft length limits to avoid storing unbounded payloads.
  if (name.trim().length > 50) {
    return c.json(
      { success: false, message: "Name is too long." },
      400
    );
  }
  if (content.trim().length > 5000) {
    return c.json(
      { success: false, message: "Content is too long." },
      400
    );
  }

  try {
    const result = await pool.query(
      `
      INSERT INTO feedbacks (name, email, content)
      VALUES ($1, $2, $3)
      RETURNING id;
    `,
      [name.trim(), email.trim(), content.trim()]
    );

    return c.json({ success: true, id: Number(result.rows[0].id) }, 201);
  } catch (err) {
    console.error("POST /api/feedback error:", err);
    return c.json(
      { success: false, message: "Internal server error." },
      500
    );
  }
});

app.get("/api/feedback", async (c) => {
  const pool = getDbPool();
  try {
    const result = await pool.query(
      `
      SELECT id, name, email, content, created_at
      FROM feedbacks
      ORDER BY created_at DESC, id DESC;
    `
    );

    return c.json(
      { success: true, feedbacks: result.rows.map(serializeFeedbackRow) },
      200
    );
  } catch (err) {
    console.error("GET /api/feedback error:", err);
    return c.json(
      { success: false, message: "Internal server error." },
      500
    );
  }
});

app.get("/api/health", (c) => c.json({ ok: true }));

const port = Number(process.env.PORT || 3000);
await initDb();

serve({
  fetch: app.fetch,
  port,
});

console.log(`Server listening on http://localhost:${port}`);

