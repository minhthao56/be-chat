import { AuthService } from './../auth/service/auth.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/service/users.service';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean | any> {
    const client = context.switchToWs().getClient();
    const token: string = client.handshake.headers.authorization.split(' ')[1];
    const verify = await this.authService.verifyJWT(token);
    if (verify.id) {
      const user = await this.usersService.findOne(verify.id);
      return (client.handshake.headers.authorization = user.id);
    } else {
      return false;
    }
  }
}
