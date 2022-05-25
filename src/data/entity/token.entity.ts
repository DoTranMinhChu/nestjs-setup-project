import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '@data/entity/user.entity';

@Entity('tokens')
export class TokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.tokens)
  @JoinColumn({ name: 'userId' })
  user: Promise<UserEntity>;

  @Column()
  userId: string;

  @Column({ nullable: true })
  agent: string;

  @Column({ type: 'bigint' })
  validUntil: number;
}
