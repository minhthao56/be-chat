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
  async findOfUser(id: string): Promise<any> {
    const allTheaterOfUser = await this.theaterRepository.find({
      where: [{ userId: id }, { userId2: id }],
      relations: ['user'],
    });

    const users2 = [];

    for await (const user of allTheaterOfUser) {
      const user2 = await this.userRepository.findOne({
        where: { id: user.userId2 },
      });
      users2.push(user2);
    }

    for await (const user of allTheaterOfUser) {
      for await (const user2 of users2) {
        if (user.userId2 === user2.id) {
          const userCreate = { user2: user2 };
          Object.assign(user, userCreate);
        }
      }
    }

    return allTheaterOfUser;
  }
}
