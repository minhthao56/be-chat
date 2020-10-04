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
    // const bearerToken = context.args[0].handshake.headers.authorization.split(
    //   ' ',
    // )[1];

    // try {
    //   const verify = await this.authService.verifyJWT(bearerToken);
    //   return new Promise((resolve, reject) => {
    //     return this.usersService.findOne(verify.id).then(user => {
    //       console.log(user);
    //       if (user) {
    //         resolve(user);
    //       } else {
    //         reject(false);
    //       }
    //     });
    //   });
    // } catch (err) {
    //   console.log(err);
    //   return false;
    // }

    const client = context.switchToWs().getClient();
    const token: string = client.handshake.headers.authorization.split(' ')[1];
    const verify = await this.authService.verifyJWT(token);
    const user = await this.usersService.findOne(verify.id);
    return (client.handshake.headers.authorization = user.id);
  }
}
