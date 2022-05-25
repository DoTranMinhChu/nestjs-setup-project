import { PASSWORD_REGEX } from '@constant/user.regex';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class UpdatePassRequest {
  @ApiProperty()
  currentPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(PASSWORD_REGEX.regex, { message: PASSWORD_REGEX.msg })
  newPassword: string;
}
