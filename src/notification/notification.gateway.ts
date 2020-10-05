import { WsGuard } from './../common/wsGuard';
import { NotificationService } from './notification.service';

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
import { Logger, UseGuards } from '@nestjs/common';

@WebSocketGateway({ namespace: '/notification' })
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('NotificationGateway');

  constructor(
    private usersService: UsersService,
    private notificationService: NotificationService,
  ) {}
  @UseGuards(WsGuard)
  @SubscribeMessage('joinNoti')
  handleInjoinNoti(client: Socket): void {
    const userId = client.handshake.headers.authorization;
    if (userId) {
      client.join(userId);
    } else {
      client.disconnect();
    }
  }

  async handleNotifyMessage(payload: CreateNotificationDto): Promise<any> {
    const userSender = await this.usersService.findOne(payload.userIdSender);
    const ojbUserSender = { userSender: userSender };
    const ojbNotify = Object.assign(payload, ojbUserSender);
    this.server.to(payload.userIdRevice).emit('messNotify', ojbNotify);
    const pushSubscription = await this.notificationService.handlFindOneSubPushNotify(
      payload.userIdRevice,
    );
    const notification = {
      title: `${userSender.name}`,
      body: `${ojbNotify.content}`,
      icon: 'https://zalo-chat-static.zadn.vn/v1/favicon-96x96.png',
    };
    if (pushSubscription) {
      this.notificationService.handleSendNotification(
        pushSubscription.meta,
        notification,
      );
    }
  }

  @SubscribeMessage('disconnect')
  handleDisconnet(client: any, payload: any): void {
    console.log(payload);
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
