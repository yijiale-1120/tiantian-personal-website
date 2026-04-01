import { randomUUID } from 'crypto';
import { Controller, Get } from '@nestjs/common';

/** 每个 Node 进程一个 id，用于前端检测「后端是否重启过」（Demo 演示重新登录用） */
const backendInstanceId = randomUUID();

@Controller()
export class AppController {
  @Get('health')
  health() {
    return { ok: true, instanceId: backendInstanceId };
  }
}
