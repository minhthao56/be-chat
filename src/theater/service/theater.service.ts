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
    private readonly theaterRepository: Repository<Theater>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createTheater(createTheaterDto: CreateTheaterDto): Promise<any> {
    const theater = new Theater();
    theater.userId = createTheaterDto.userId;
    theater.userId2 = createTheaterDto.userId2;

    return this.theaterRepository.save(theater);
  }

  async findAll(): Promise<any> {
    return this.theaterRepository.find();
  }

  async deletelOne(id: string): Promise<any> {
    return this.theaterRepository.delete(id);
  }

  async findOne(id: string): Promise<any> {
    const theaterInDB = await this.theaterRepository.findOne({
      where: { id: id },
    });
    const userInDB = await this.userRepository.findOne({
      where: { id: theaterInDB.userId },
    });
    const user2InBD = await this.userRepository.findOne({
      where: { id: theaterInDB.userId2 },
    });

    const dataTheater = {
      ...theaterInDB,
      user: userInDB,
      user2: user2InBD,
    };
    return dataTheater;
  }
}
