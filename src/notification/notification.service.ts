import { CreateSubscriptionPushNotifyDto } from './notification.dto';
import { SubPushNotifyEntity } from './subPushNotify.entity';
import { NoticationsEntity } from './notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import * as webpush from 'web-push';
import { Repository } from 'typeorm';

const publicVapidKey =
  'BOo3F7CV18dk-hxAIk0Q59qRkVu0o_4MQNoLP7pLgDPXaUloBfOqnSqXBsEFCmW2H059TJABMbviIR7vkh6hORw';
const privateVapidKey = '-8IiA_pZ2qQzGRTOfTtKNIeQbxm6AhO5wEqoWfv2zVw';
@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NoticationsEntity)
    private noticationsEntity: Repository<NoticationsEntity>,
    @InjectRepository(SubPushNotifyEntity)
    private SubPushNotifyEntity: Repository<SubPushNotifyEntity>,
  ) {}

  async handleSendNotification(
    pushSubscription: any,
    notification: any,
  ): Promise<any> {
    webpush.setVapidDetails(
      'mailto:test@test.com',
      publicVapidKey,
      privateVapidKey,
    );
   

    return await webpush.sendNotification(
      pushSubscription,
      JSON.stringify(notification),
    );
  }

  async handleSaveSubPushNotify(
    createSubscriptionPushNotifyDto: CreateSubscriptionPushNotifyDto,
  ): Promise<any> {
    const onePushNotify = await this.handlFindOneSubPushNotify(
      createSubscriptionPushNotifyDto.userSubId,
    );
    if (onePushNotify) {
      return await this.SubPushNotifyEntity.update(
        onePushNotify.id,
        createSubscriptionPushNotifyDto,
      );
    } else {
      return await this.SubPushNotifyEntity.save(
        createSubscriptionPushNotifyDto,
      );
    }
  }

  async handleDeteleOneSubPushNotify(id: string): Promise<any> {
    return await this.SubPushNotifyEntity.delete(id);
  }

  async handleGetAllSubPushNotify(): Promise<any> {
    return await this.SubPushNotifyEntity.find();
  }

  async handlFindOneSubPushNotify(userSubId: string): Promise<any> {
    return await this.SubPushNotifyEntity.findOne({
      where: { userSubId: userSubId },
    });
  }
}
