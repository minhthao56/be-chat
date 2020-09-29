import { UsersService } from './../users/service/users.service';
import { CreateNotificationDto } from './notification.dto';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ namespace: '/notification' })
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('NotificationGateway');

  constructor (private usersService: UsersService){}

  @SubscribeMessage('joinNoti')
  handleInjoinNoti(client: any, payload: { userId: string }): void {
    client.join(payload.userId);
  }

  async handleNotifyMessage(payload: CreateNotificationDto): Promise<any> {
   const userSender =  await this.usersService.findOne(payload.userIdSender)
   const ojbUserSender = {userSender: userSender}
   const ojbNotify = Object.assign(payload,ojbUserSender)
    this.server
      .to(payload.userIdRevice)
      .emit('messNotify', ojbNotify);
  }

  afterInit(server: Server) {
    this.logger.log('Init Nofication');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected Notification`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected Notification`);
  }
}
