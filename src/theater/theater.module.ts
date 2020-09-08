import { Module } from '@nestjs/common';
import { TheaterController } from './controller/theater.controller';
import { TheaterService } from './service/theater.service';

@Module({
  controllers: [TheaterController],
  providers: [TheaterService],
})
export class TheaterModule {}
