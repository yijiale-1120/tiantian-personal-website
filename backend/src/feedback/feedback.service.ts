import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

function serializeRow(f: Feedback) {
  return {
    id: Number(f.id),
    name: f.name,
    email: f.email,
    content: f.content,
    createdAt:
      f.createdAt instanceof Date ? f.createdAt.toISOString() : f.createdAt,
  };
}

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly repo: Repository<Feedback>,
  ) {}

  async findAll() {
    const rows = await this.repo.find({
      order: { createdAt: 'DESC', id: 'DESC' },
    });
    return { success: true as const, feedbacks: rows.map(serializeRow) };
  }

  async create(dto: CreateFeedbackDto, userId: string) {
    const row = this.repo.create({
      name: dto.name.trim(),
      email: dto.email.trim(),
      content: dto.content.trim(),
      userId,
    });
    const saved = await this.repo.save(row);
    return { success: true as const, id: Number(saved.id) };
  }
}
