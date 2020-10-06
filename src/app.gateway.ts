import { MessagesService } from './messages/service/messages.service';
import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
// import { jonRomChat } from './common/UserInRoom';

@WebSocketGateway({ namespace: '/chat' })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly messagesService: MessagesService) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('join')
  handleMessage(client: Socket, payload: { id: string }): void {
    client.join(payload.id);
  }

  @SubscribeMessage('sendMess')
  async handleSendMess(
    client: Socket,
    payload: { userId: string; content: string; theaterId: string },
  ): Promise<any> {
    const mess = await this.messagesService.createMessage(payload);
    const detailMess = await this.messagesService.findOneMessage(mess.id);
    this.server.to(payload.theaterId).emit('mess', detailMess);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected`);
  }
}
