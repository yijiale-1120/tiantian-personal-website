import * as bcrypt from 'bcrypt';
import { Client } from 'pg';

function hasColumn(
  rows: { column_name: string }[],
  name: string,
): boolean {
  return rows.some((r) => r.column_name === name);
}

/**
 * 在 TypeORM synchronize 之前处理 public.users：
 * 1) 若表存在但缺少 username / password_hash 列，先 ADD 再批量填值（避免 addColumn 后全表 NULL 无法 NOT NULL）
 * 2) 若列已有但存在 NULL，同样回填
 */
export async function fixLegacyUsersTableIfNeeded(): Promise<void> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.warn(
      '[fix-legacy-users] DATABASE_URL not set; skipping pre-sync fix.',
    );
    return;
  }

  const client = new Client({
    connectionString: url,
    ssl:
      process.env.DATABASE_SSL === 'true'
        ? { rejectUnauthorized: false }
        : undefined,
  });

  await client.connect();
  try {
    const { rows: existsRows } = await client.query<{ exists: boolean }>(`
      SELECT EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'users'
      ) AS exists;
    `);
    if (!existsRows[0]?.exists) return;

    const { rows: columns } = await client.query<{ column_name: string }>(`
      SELECT column_name FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'users';
    `);

    // username：无列则先加可空列，再写入，供后续 TypeORM 改为 NOT NULL / UNIQUE
    if (!hasColumn(columns, 'username')) {
      await client.query(
        `ALTER TABLE users ADD COLUMN username VARCHAR(100);`,
      );
    }
    await client.query(`
      UPDATE users
      SET username = 'user_' || id::text
      WHERE username IS NULL OR TRIM(COALESCE(username::text, '')) = '';
    `);

    // password_hash
    if (!hasColumn(columns, 'password_hash')) {
      await client.query(`ALTER TABLE users ADD COLUMN password_hash TEXT;`);
    }
    const placeholderHash = await bcrypt.hash('__legacy_row_reset__', 10);
    await client.query(
      `
      UPDATE users
      SET password_hash = $1
      WHERE password_hash IS NULL OR TRIM(COALESCE(password_hash::text, '')) = '';
    `,
      [placeholderHash],
    );
  } finally {
    await client.end();
  }
}
