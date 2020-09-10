import { CreateMessageDto } from './../dto/create-message.dto';
import { MessagesService } from './../service/messages.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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

  @Get(':id')
  async findAllMessageInTheater(@Param('id') id: string): Promise<any> {
    return await this.messagesSerive.findAllMessagesInThearter(id);
  }
}
