import { CreateFriendDto, UpdateFriendDto } from './friends.dto';

import { FriendEntity } from './friends.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(FriendEntity)
    private friendRepository: Repository<FriendEntity>,
  ) {}

  async createFriend(createFriendDto: CreateFriendDto): Promise<any> {
    const friend = new FriendEntity();
    friend.userId = createFriendDto.userId;
    friend.userIdRequest = createFriendDto.userIdRequest;
    friend.content = createFriendDto.content;

    return await this.friendRepository.save(friend);
  }

  async frindAllFriendsOfUser(userId: string): Promise<any> {
    return await this.friendRepository.find({
      where: [{ userId: userId }, { userIdRequest: userId }],
      relations: ['user', 'userRequest'],
    });
  }

  async deleteOne(id: string): Promise<any> {
    return await this.friendRepository.delete(id);
  }

  async updateStatusOfRequest(
    id: string,
    updateFriendDto: UpdateFriendDto,
  ): Promise<any> {
    return this.friendRepository.update(id, updateFriendDto);
  }

  async findAll(): Promise<any> {
    return this.friendRepository.find();
  }

  async findRequestFriendOfUser(userId: string): Promise<any> {
    return this.friendRepository.find({
      where: { userId: userId, status: 1 },
      relations: ['userRequest'],
    });
  }

  async findFriendCofirmed(userId: string): Promise<any> {
    return this.friendRepository.find({
      where: [
        { userId: userId, status: 2 },
        { userIdRequest: userId, status: 2 },
      ],
      relations: ['user', 'userRequest'],
    });
  }

  async findFriendUserSendRequest(userId: string): Promise<any> {
    return this.friendRepository.find({
      where: { userIdRequest: userId, status: 1 },
      relations: ['user'],
    });
  }
}
