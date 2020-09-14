import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway {
  @SubscribeMessage('message')
  handleMessage(client: Socket, text: string): string {
    return 'Hello world!';
  }
}
