import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.users.findOne({
      where: { username: dto.username.trim() },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const access_token = await this.jwt.signAsync({
      sub: user.id,
      username: user.username,
    });
    return { success: true as const, access_token, token_type: 'Bearer' as const };
  }

  async ensureDefaultAdmin(): Promise<void> {
    const username = (
      this.config.get<string>('ADMIN_USERNAME') ?? 'admin'
    ).trim();
    const fromEnv = this.config.get<string>('ADMIN_PASSWORD');
    const password =
      fromEnv && fromEnv.length > 0
        ? fromEnv
        : process.env.NODE_ENV !== 'production'
          ? 'admin'
          : '';
    if (!password || password.length === 0) {
      return;
    }

    const existing = await this.users.findOne({ where: { username } });
    if (existing) {
      return;
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    await this.users.save(
      this.users.create({
        username,
        passwordHash,
        role: 'admin',
      }),
    );
  }
}
