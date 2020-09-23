import { CreateFriendDto, UpdateFriendDto } from './friends.dto';
import { FriendsService } from './friends.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @Post()
  async createFriend(@Body() createFriendDto: CreateFriendDto): Promise<any> {
    return await this.friendsService.createFriend(createFriendDto);
  }

  @Get(':userId')
  async frindAllFriendsOfUser(@Param('userId') userId: string): Promise<any> {
    return await this.friendsService.frindAllFriendsOfUser(userId);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<any> {
    return await this.friendsService.deleteOne(id);
  }

  @Put(':id')
  async updateStatusRequest(
    @Param('id') id: string,
    @Body() updateFriendDto: UpdateFriendDto,
  ): Promise<any> {
    return await this.friendsService.updateStatusOfRequest(id, updateFriendDto);
  }

  @Get()
  async findAll(): Promise<any> {
    return this.friendsService.findAll();
  }

  @Get('/request/:userId')
  async findRequestFriendOfUser(@Param('userId') userId: string): Promise<any> {
    return this.friendsService.findRequestFriendOfUser(userId);
  }

  @Get('/list/:userId')
  async findFriendCofirmed(@Param('userId') userId: string): Promise<any> {
    return this.friendsService.findFriendCofirmed(userId);
  }

  @Get('/sendrequest/:userId')
  async findFriendUserSendRequest(
    @Param('userId') userId: string,
  ): Promise<any> {
    return this.friendsService.findFriendUserSendRequest(userId);
  }
}
