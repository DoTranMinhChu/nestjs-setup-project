import { Role } from '@constant/role.enum';
import { Gender } from '@constant/user-gender.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { TokenEntity } from '@data/entity/token.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'date', nullable: true })
  dob: string;

  @Column('enum', { enum: Gender, nullable: true })
  gender: Gender;

  @Column({ nullable: true })
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'simple-array' })
  roles: Role[];

  @Column({ nullable: true })
  avatar: string;

  @OneToMany(() => TokenEntity, (token) => token.user)
  tokens: Promise<TokenEntity[]>;

  @Column({ default: false })
  isDelete: boolean;

  @Column({ nullable: true, default: false })
  isDefaultPassword: boolean;


  @Column({ default: false })
  isPremium: boolean;
}
