import { User } from './../../users/entity/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Theater {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    type => User,
    user => user.id,
  )
  @JoinColumn()
  idUser1: User;

  @ManyToOne(
    type => User,
    user => user.id,
  )
  @JoinColumn()
  idUser2: User;
}
