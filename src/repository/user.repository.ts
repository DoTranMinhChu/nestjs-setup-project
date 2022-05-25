import { EntityRepository, In, Like, Repository } from 'typeorm';
import { UserEntity } from '@data/entity/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findByEmail(email: string): Promise<UserEntity> {
    return await this.findOne({ email });
  }

  async findAllByEmails(email: string[]): Promise<UserEntity[]> {
    return await this.find({
      where: {
        email: In(email),
      },
    });
  }
}
