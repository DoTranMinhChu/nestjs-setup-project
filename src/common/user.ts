import { Gender } from '@constant/user-gender.enum';
import { Role } from '@constant/role.enum';

export class User {
  id: string;
  email: string;
  roles: Role[];
  name: string;
  phone: string;
  gender: Gender;
  dob: string;
}
