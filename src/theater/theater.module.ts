import { MessagesEntity } from './../messages/entity/message.entity';
import { UserEntity } from './../users/entity/user.entity';
import { TheaterEntity } from './entity/theater.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TheaterController } from './controller/theater.controller';
import { TheaterService } from './service/theater.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TheaterEntity, UserEntity, MessagesEntity]),
  ],
  controllers: [TheaterController],
  providers: [TheaterService],
  exports: [TheaterService],
})
export class TheaterModule {}
