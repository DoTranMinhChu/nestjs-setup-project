import { Role } from '@constant/role.enum';
import { Gender } from '@constant/user-gender.enum';
import { UserEntity } from '@data/entity/user.entity';

export class UserResponse {
  id: string;

  name: string;

  dateOfBirth: string;

  gender: Gender;

  phone: string;

  email: string;

  roles: Role[];

  avatar: string;

  isDefaultPassword: boolean;

  static fromUserEntity(user: UserEntity): UserResponse {
    const userResponse = new UserResponse();
    userResponse.id = user.id;
    userResponse.name = user.name;
    userResponse.dateOfBirth = user.dob;
    userResponse.gender = user.gender;
    userResponse.phone = user.phone;
    userResponse.email = user.email;
    userResponse.roles = user.roles;
    userResponse.avatar = user.avatar;
    userResponse.isDefaultPassword = user.isDefaultPassword;

    return userResponse;
  }
}
