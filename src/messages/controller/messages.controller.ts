import { CreateMessageDto } from './../dto/create-message.dto';
import { MessagesService } from './../service/messages.service';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  constructor(private messagesSerive: MessagesService) {}

  @Post()
  async createMessage(
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<any> {
    return await this.messagesSerive.createMessage(createMessageDto);
  }

  @Get()
  async findAllMessage(): Promise<any> {
    return await this.messagesSerive.findAllMassages();
  }

  @Get(':theaterId')
  async findAllMessageInTheater(
    @Param('theaterId') theaterId: string,
    @Query('q') q: string,
  ): Promise<any> {
    const query = Number(q)
    return await this.messagesSerive.findAllMessagesInThearter(theaterId, query);
  }

  @Get('message/:id')
  async findOneMessage(@Param('id') id: string): Promise<any> {
    return await this.messagesSerive.findOneMessage(id);
  }
}
