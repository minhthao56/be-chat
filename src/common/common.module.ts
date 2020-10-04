import { UsersModule } from './../users/users.module';
import { WsGuard } from './wsGuard';
import { AuthModule } from './../auth/auth.module';
import { TokenMiddleware } from './token.middleware';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule, UsersModule],
  providers: [TokenMiddleware, WsGuard],
})
export class CommonModule {}
