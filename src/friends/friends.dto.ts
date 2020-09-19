import { IsNotEmpty } from 'class-validator';

export class CreateFriendDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  userIdRequest: string;

  @IsNotEmpty()
  content: string;
}

export class UpdateFriendDto {
  userId: string;

  userIdRequest: string;

  @IsNotEmpty()
  status: number;

  content: string;
}
