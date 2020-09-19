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
export class FriendEntity extends TimeStamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  userIdRequest: string;

  @Column({ default: 1 })
  status: number;

  @Column({ nullable: true })
  content: string;

  @ManyToOne(
    () => UserEntity,
    user => user,
  )
  @JoinColumn({ referencedColumnName: 'id', name: 'userId' })
  user: UserEntity;

  @ManyToOne(
    () => UserEntity,
    user => user,
  )
  @JoinColumn({ referencedColumnName: 'id', name: 'userIdRequest' })
  userRequest: UserEntity;
}
