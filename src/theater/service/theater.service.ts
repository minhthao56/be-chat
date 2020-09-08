import { Theater } from './../entity/theater.entity';
import { User } from './../../users/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTheaterDto } from './../dto/create-theater';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TheaterService {
  constructor(
    @InjectRepository(Theater)
    @InjectRepository(User)
    private readonly repository: Repository<Theater>,
  ) {}

  async createTheater(createTheaterDto: CreateTheaterDto): Promise<any> {
    const theater = new Theater();
    theater.idUser1 = createTheaterDto.idUser1;
    theater.idUser2 = createTheaterDto.idUser2;
    return await this.repository.save(theater);
  }

  async findAll(): Promise<any> {
    return this.repository.find();
  }

  async deletelOne(id: string): Promise<any> {
    return this.repository.delete(id);
  }

  async findOne(id: string): Promise<any> {
    const r = await this.repository.findOne(id, {
      join: {
        alias: 'user',
        innerJoin: {
          user: 'user.id',
        },
      },
    });
    return r;
  }
}
