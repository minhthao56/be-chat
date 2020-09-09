import { IsNotEmpty } from 'class-validator';

export class CreateTheaterDto {
  @IsNotEmpty()
  userId1: string;

  @IsNotEmpty()
  userId2: string;
}
