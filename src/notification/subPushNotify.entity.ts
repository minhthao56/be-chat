import { TimeStamp } from './../common/time.entity';
import { UserEntity } from 'src/users/entity/user.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class SubPushNotifyEntity extends TimeStamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  userSubId: string;

  @Column("json")
  meta: any


  @ManyToOne(
    () => UserEntity,
    user => user,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ referencedColumnName: 'id', name: 'userSubId' })
  user: UserEntity;

}
