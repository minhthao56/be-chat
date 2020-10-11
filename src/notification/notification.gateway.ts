import { UpdateUserDto } from './../users/dto/update-user.dto';
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
  checkUserSocketNotify,
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
  async handleInjoinNoti(client: Socket): Promise<any> {
    const userId = client.handshake.headers.authorization;
    if (userId) {
      client.join(userId);
      const user = {
        userId: userId,
        socketId: client.id,
      };
      joinNotify(user);
    } else {
      client.disconnect();
    }
    const updateUser = new UpdateUserDto();
    updateUser.status = true;
    await this.usersService.updateOne(userId, updateUser);
  }

  async handleNotifyMessage(payload: CreateNotificationDto): Promise<any> {
    //Send NotifiMess
    const userSender = await this.usersService.findOne(payload.userIdSender);
    const ojbUserSender = { userSender: userSender };
    const ojbNotify = Object.assign(payload, ojbUserSender);
    this.server.to(payload.userIdRevice).emit('messNotify', ojbNotify);

    //Send notify Offline
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

  async handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected Notification`);

    const updateUser = new UpdateUserDto();
    updateUser.status = false;

    const user = checkUserSocketNotify(client.id);
    await this.usersService.updateOne(user.userId, updateUser);

    const a = deleteUserDisconnect(client.id);
    console.log(a);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected Notification`);
  }
}
