import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity()
export class TimeStamp {
  @CreateDateColumn({ type: 'timestamp' })
  public createAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updateAt: Date;
}
