import { Pool } from "pg";

let pool;

function getConnectionString() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "Missing DATABASE_URL. Please set it to a valid PostgreSQL connection string (see .env)."
    );
  }
  // Validate early to catch common `.env` formatting mistakes (e.g. accidentally split into multiple lines).
  try {
    const url = new URL(connectionString);
    if (!["postgres:", "postgresql:"].includes(url.protocol)) {
      throw new Error("Invalid protocol");
    }
    if (!url.username || !url.hostname || !url.pathname) {
      throw new Error("Incomplete connection URL");
    }
  } catch {
    throw new Error(
      "Invalid DATABASE_URL format. Make sure it's a single line in .env, e.g. postgresql://user:pass@localhost:5433/dbname"
    );
  }
  return connectionString;
}

function getPool() {
  if (!pool) {
    const connectionString = getConnectionString();
    pool = new Pool({
      connectionString,
      // If you use a managed Postgres with self-signed certs, set DATABASE_SSL=true.
      ssl:
        process.env.DATABASE_SSL === "true"
          ? { rejectUnauthorized: false }
          : undefined,
    });
  }
  return pool;
}

export async function initDb() {
  const pool = getPool();
  // Create table for storing feedback submissions.
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

export function getDbPool() {
  return getPool();
}

