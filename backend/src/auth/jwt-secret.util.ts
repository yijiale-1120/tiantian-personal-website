import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const log = new Logger('JwtSecret');

/**
 * 未设置 JWT_SECRET 时：开发环境使用固定默认值（便于本地启动）；生产环境必须显式配置。
 */
export function resolveJwtSecret(config: ConfigService): string {
  const fromEnv = config.get<string>('JWT_SECRET')?.trim();
  if (fromEnv) {
    return fromEnv;
  }
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'JWT_SECRET is required in production. Add it to your environment or .env (see .env.example).',
    );
  }
  log.warn(
    'JWT_SECRET is not set; using a development default. Add JWT_SECRET to .env (see .env.example) for stable tokens.',
  );
  return 'dev-only-insecure-jwt-secret-not-for-production';
}
