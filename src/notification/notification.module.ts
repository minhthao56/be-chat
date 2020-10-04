import { AuthModule } from './../auth/auth.module';
import { SubPushNotifyEntity } from './subPushNotify.entity';
import { NoticationsEntity } from './notification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './../users/users.module';
import { NotificationGateway } from './notification.gateway';
import { NotificationController } from './notification.controller';
import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forFeature([NoticationsEntity, SubPushNotifyEntity]),
  ],
  controllers: [NotificationController],
  providers: [NotificationGateway, NotificationService],
})
export class NotificationModule {}
