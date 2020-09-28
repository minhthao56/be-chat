import { NotificationGateway } from './notification.gateway';
import { NotificationController } from './notification.controller';
import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Module({
  controllers: [NotificationController],
  providers: [NotificationGateway, NotificationService],
})
export class NotificationModule {}
