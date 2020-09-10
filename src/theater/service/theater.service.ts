import { TheaterEntity } from './../entity/theater.entity';
import { UserEntity } from './../../users/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTheaterDto } from '../dto/create-theater.dto';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TheaterService {
  constructor(
    @InjectRepository(TheaterEntity)
    private readonly theaterRepository: Repository<TheaterEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createTheater(createTheaterDto: CreateTheaterDto): Promise<any> {
    const theater = new TheaterEntity();
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
