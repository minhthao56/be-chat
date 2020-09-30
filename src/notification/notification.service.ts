import { Injectable } from '@nestjs/common';
import webpush, {SendResult} from 'web-push';
const publicVapidKey =
  'BOo3F7CV18dk-hxAIk0Q59qRkVu0o_4MQNoLP7pLgDPXaUloBfOqnSqXBsEFCmW2H059TJABMbviIR7vkh6hORw';
const privateVapidKey = '-8IiA_pZ2qQzGRTOfTtKNIeQbxm6AhO5wEqoWfv2zVw';
@Injectable()
export class NotificationService {
  async handleSendNotification(): Promise<any> {
    webpush.setVapidDetails(
        'mailto:test@test.com',
        publicVapidKey,
        privateVapidKey,
      );
  }
}
