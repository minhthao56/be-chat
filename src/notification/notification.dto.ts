export class CreateNotificationDto {
  userIdRevice: string;

  content: string;

  userIdSender: string;
}

export class CreateSubscriptionPushNotifyDto{
  userSubId: string;
  
  meta: any

}
