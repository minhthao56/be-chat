import { UsersModule } from './../users/users.module';
import { NotificationGateway } from './notification.gateway';
import { NotificationController } from './notification.controller';
import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Module({
  imports: [UsersModule],
  controllers: [NotificationController],
  providers: [NotificationGateway, NotificationService],
})
export class NotificationModule {}
