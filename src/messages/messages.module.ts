import { MessagesEntity } from './entity/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MessagesService } from './service/messages.service';
import { MessagesController } from './controller/messages.controller';
// import { UserEntity } from 'src/users/entity/user.entity';
import { TheaterEntity } from 'src/theater/entity/theater.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessagesEntity, TheaterEntity]),
  ],
  providers: [MessagesService],
  controllers: [MessagesController],
})
export class MessagesModule {}
