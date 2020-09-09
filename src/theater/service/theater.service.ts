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
    private readonly theaterRepository: Repository<Theater>,
  ) {}

  async createTheater(createTheaterDto: CreateTheaterDto): Promise<any> {
    const theater = new Theater();
    theater.userId1 = createTheaterDto.userId1;
    theater.userId2 = createTheaterDto.userId2
    return this.theaterRepository.save(theater);
  }

  async findAll(): Promise<any> {
    return this.theaterRepository.find();
  }

  async deletelOne(id: string): Promise<any> {
    return this.theaterRepository.delete(id);
  }

  async findOne(id: string): Promise<any> {
    const r = await this.theaterRepository.findOne({
      where: { id: id },
      relations: ['user1', 'user2'],
    });
    return r;
  }
}
