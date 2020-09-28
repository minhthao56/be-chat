import { CreateNotificationDto } from './notification.dto';
import { NotificationGateway } from './notification.gateway';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('notification')
export class NotificationController {
     constructor (private notificationGateway: NotificationGateway){}

     @Post()
     async handleNotifyMess(@Body() createNotificationDto: CreateNotificationDto): Promise<any>{
         this.notificationGateway.handleNotifyMessage(createNotificationDto)
         return createNotificationDto
     }
}
