import { User } from './../../users/entity/user.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateTheaterDto {
    
  @IsNotEmpty()
  idUser1: User;

  @IsNotEmpty()
  idUser2: User;
}
