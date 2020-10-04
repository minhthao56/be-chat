import { NotificationService } from './notification.service';
import {
  CreateNotificationDto,
  CreateSubscriptionPushNotifyDto,
} from './notification.dto';
import { NotificationGateway } from './notification.gateway';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('notification')
export class NotificationController {
  constructor(
    private notificationGateway: NotificationGateway,
    private notificationService: NotificationService,
  ) {}

  @Post()
  async handleNotifyMess(
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<any> {
    this.notificationGateway.handleNotifyMessage(createNotificationDto);
    return createNotificationDto;
  }

  @Post('subscription')
  async handSaveSubPushNotify(
    @Req() req: Request,
    @Body() createSubscriptionPushNotifyDto: CreateSubscriptionPushNotifyDto,
  ): Promise<any> {
    const sunPushNotify = new CreateSubscriptionPushNotifyDto();
    sunPushNotify.userSubId = req.headers.authorization;
    sunPushNotify.meta = createSubscriptionPushNotifyDto;
    return await this.notificationService.handleSaveSubPushNotify(
      sunPushNotify,
    );
  }

  @Get('subscription')
  async handleGetAllSubPushNotify(): Promise<any> {
    return await this.notificationService.handleGetAllSubPushNotify();
  }

  @Get('subscription/:id')
  async handlFindOneSubPushNotify(@Param('id') id: string): Promise<any> {
    return this.notificationService.handlFindOneSubPushNotify(id);
  }

  @Delete('subscription/:id')
  async handleDeteleOneSubPushNotify(@Param('id') id: string): Promise<any> {
    return this.notificationService.handleDeteleOneSubPushNotify(id);
  }
}
