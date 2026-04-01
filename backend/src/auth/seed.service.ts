import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly log = new Logger(SeedService.name);

  constructor(private readonly auth: AuthService) {}

  async onModuleInit(): Promise<void> {
    try {
      await this.auth.ensureDefaultAdmin();
    } catch (err) {
      this.log.warn(
        `Seed skipped or failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }
}
