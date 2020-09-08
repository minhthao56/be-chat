import { InjectRepository } from '@nestjs/typeorm';
import { CreateTheaterDto } from './../dto/create-theater';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Theater } from '../entity/theater.entity';

@Injectable()
export class TheaterService {
  constructor(
    @InjectRepository(Theater)
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
}
