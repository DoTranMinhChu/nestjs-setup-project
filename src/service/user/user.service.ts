import { CryptStrategy } from '@service/auth/crypt.strategy';
import { Injectable } from '@nestjs/common';
import { RegisterRequest } from '@data/request/register.request';
import { UserEntity } from '@data/entity/user.entity';
import { UserRepository } from '@repository/user.repository';
import { Role } from '@constant/role.enum';
import { UpdateInfoRequest } from '@data/request/update-info.request';
import { UpdatePassRequest } from '@data/request/update-pass.request';
import { EmailExistedException } from '@exception/user/email-existed.exception';
import { OldPasswordIncorrectException } from '@exception/user/old-password-not-correct.exception';
import { UserNotExistedException } from '@exception/user/user-not-existed.exception';

const MAX_RECOMMEND_USER = 15;

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private cryptStrategy: CryptStrategy,
  ) {}

  async createUser(
    request: RegisterRequest,
    isDefaultPassword: boolean,
  ): Promise<UserEntity> {
    const existedUser = await this.userRepository.findByEmail(request.email);

    if (existedUser) {
      throw new EmailExistedException();
    }

    const userEntity: UserEntity = new UserEntity();
    userEntity.name = request.name;
    userEntity.dob = request.dob;
    userEntity.gender = request.gender;
    userEntity.phone = request.phone;
    userEntity.email = request.email;
    userEntity.roles = [Role.User];
    userEntity.avatar = request.avatar;
    userEntity.password = await this.cryptStrategy.encrypt(request.password);
    userEntity.isDefaultPassword = isDefaultPassword;

    return await this.userRepository.save(userEntity);
  }

  async getUserByUserId(userId: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ id: userId });
  }

  async getUsersByEmails(email: string[]): Promise<UserEntity[]> {
    return await this.userRepository.findAllByEmails(email);
  }

  async updateInfo(
    userId: string,
    newInfo: UpdateInfoRequest,
  ): Promise<UserEntity> {
    return this.userRepository
      .createQueryBuilder()
      .update()
      .set({ ...newInfo })
      .where('id = :userId', { userId })
      .returning('*')
      .execute()
      .then((res) => res.raw[0]);
  }

  async updatePassword(
    userId: string,
    request: UpdatePassRequest,
  ): Promise<any> {
    const user = await this.userRepository.findOne({id: userId});

    if (!user.isDefaultPassword)
      if (
        !(await this.cryptStrategy.check(
          request.currentPassword,
          user.password,
        ))
      ) {
        throw new OldPasswordIncorrectException();
      }

    const hashPassword = await this.cryptStrategy.encrypt(request.newPassword);
    return await this.userRepository.update(
      { id: userId },
      { password: hashPassword, isDefaultPassword: false },
    );
  }

  async getUserIdByEmail(email: string): Promise<string> {
    const existedUser = await this.userRepository.findByEmail(email);
    if (!existedUser) {
      throw new UserNotExistedException();
    }
    return existedUser.id;
  }
}
