import { CreateMessageDto } from './../dto/create-message.dto';
import { MessagesEntity } from './../entity/message.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessagesEntity)
    private messageRepository: Repository<MessagesEntity>,
  ) {}

  async createMessage(createMessageDto: CreateMessageDto): Promise<any> {
    const message = new MessagesEntity();
    message.theaterId = createMessageDto.theaterId;
    message.userId = createMessageDto.userId;
    message.content = createMessageDto.content;

    return await this.messageRepository.save(message);
  }

  async findAllMessagesInThearter(
    theaterId: string,
    query: number,
  ): Promise<any> {
    const count: number = (
      await this.messageRepository.find({ where: { theaterId: theaterId } })
    ).length;

    if (count < query) {
      query = count;
      throw new HttpException("That's all messages", 404);
    }

    return await this.messageRepository.find({
      where: { theaterId: theaterId },
      relations: ['user'],
      order: { createAt: 'ASC' },
      skip: count - query,
      take: 20,
    });
  }

  async findAllMassages(): Promise<any> {
    return this.messageRepository.find({ relations: ['user', 'theater'] });
  }

  async findOneMessage(id: string): Promise<any> {
    return this.messageRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });
  }
}
