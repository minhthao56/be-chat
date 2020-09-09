import { IsNotEmpty } from 'class-validator';

export class CreateTheaterDto {
  @IsNotEmpty()
  userId: string;

}
