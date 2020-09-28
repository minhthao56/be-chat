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
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('joinNoti')
  handleInjoinNoti(client: any, payload: { userId: string }): void {
    console.log(payload.userId);

    client.join(payload.userId);
  }

  @SubscribeMessage('messageNotify')
  handleNotifyMessage(payload: CreateNotificationDto): void {
    console.log(payload);
    this.server
      .to(payload.userIdRevice)
      .emit('messNotify', { content: payload.content });
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
