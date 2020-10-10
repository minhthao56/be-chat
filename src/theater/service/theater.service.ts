import { MessagesEntity } from './../../messages/entity/message.entity';
import { TheaterEntity } from './../entity/theater.entity';
// import { UserEntity } from './../../users/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTheaterDto } from '../dto/create-theater.dto';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TheaterService {
  constructor(
    @InjectRepository(TheaterEntity)
    private readonly theaterRepository: Repository<TheaterEntity>,
    @InjectRepository(MessagesEntity)
    private readonly messagesRepository: Repository<MessagesEntity>,
  ) {}

  async createTheater(createTheaterDto: CreateTheaterDto): Promise<any> {
    const theaterInDB = await this.theaterRepository.findOne({
      where: [
        { userId: createTheaterDto.userId, userId2: createTheaterDto.userId2 },
        { userId: createTheaterDto.userId2, userId2: createTheaterDto.userId },
      ],
    });

    if (theaterInDB) {
      return theaterInDB;
    } else {
      const theater = new TheaterEntity();
      theater.userId = createTheaterDto.userId;
      theater.userId2 = createTheaterDto.userId2;
      return this.theaterRepository.save(theater);
    }
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
      relations: ['user', 'user2'],
    });
    return theaterInDB;
  }

  async findTheaterOfUser(id: string): Promise<any> {
    const allTheaterOfUser = await this.theaterRepository.find({
      where: [{ userId: id }, { userId2: id }],
      relations: ['user', 'user2', 'message'],
    });

    allTheaterOfUser.map(info => {
      const length = info.message.length;
      info.message.splice(0, length - 1);
    });

    return allTheaterOfUser;
  }
}
