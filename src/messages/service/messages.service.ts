import { CreateMessageDto } from './../dto/create-message.dto';
import { MessagesEntity } from './../entity/message.entity';
import { Injectable } from '@nestjs/common';
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

  async findAllMessagesInThearter(id: string): Promise<any> {
    return this.messageRepository.find({
      where: { theaterId: id },
      relations: ['user', 'theater'],
      order: { createAt: 'ASC' },
    });
  }

  async findAllMassages(): Promise<any> {
    return this.messageRepository.find({ relations: ['user', 'theater'] });
  }

  async findOneMessage(id: string): Promise<any> {
    return this.messageRepository.findOne({
      where: { id: id },
      relations: ['user', 'theater'],
    });
  }
}
