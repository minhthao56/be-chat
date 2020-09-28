import { TokenMiddleware } from './common/token.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// server and module
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppGateway } from './app.gateway';
import { TheaterModule } from './theater/theater.module';
import { MessagesModule } from './messages/messages.module';
import { FriendsModule } from './friends/friends.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url:
        'postgres://bnhuckxq:UhagbgGI3I6CSWLibdwksM36uqw6Qhch@arjuna.db.elephantsql.com:5432/bnhuckxq',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    TheaterModule,
    MessagesModule,
    FriendsModule,
    CloudinaryModule,
    NotificationModule,
  ],
  controllers: [AppController ],
  providers: [AppService, AppGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes('users');
  }
}
