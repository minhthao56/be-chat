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
import {
  joinNotify,
  checkUserInRoomNotify,
  deleteUserDisconnect,
} from '../helpers/UserInRoom';

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
      const user = {
        userId: userId,
        socketId: client.id,
      };
      joinNotify(user);
      this.server.emit()
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

    const userOnline = checkUserInRoomNotify(payload.userIdRevice);
    const notification = {
      title: `${userSender.name}`,
      body: `${ojbNotify.content}`,
    };
    if (pushSubscription && !userOnline) {
      this.notificationService.handleSendNotification(
        pushSubscription.meta,
        notification,
      );
    }
  }

  afterInit(server: Server) {
    this.logger.log('Init Nofication');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected Notification`);
    const a = deleteUserDisconnect(client.id);
    console.log(a);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected Notification`);
  }
}
