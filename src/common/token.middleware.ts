import { AuthService } from './../auth/service/auth.service';

import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization.split(' ')[1];
    const verify = await this.authService.verifyJWT(token);
    if (verify.id) {
      req.headers.authorization = verify.id;
      next();
    } else {
      throw new HttpException(verify, HttpStatus.UNAUTHORIZED);
    }
  }
}
