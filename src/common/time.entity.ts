import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity()
export class TimeStamp {
  @CreateDateColumn({ type: 'timestamptz' })
  public createAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updateAt: Date;
}
