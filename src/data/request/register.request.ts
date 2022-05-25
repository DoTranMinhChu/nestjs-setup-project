import { Gender } from '@constant/user-gender.enum';
import { PASSWORD_REGEX, PHONE_REGEX } from '@constant/user.regex';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  Matches,
} from 'class-validator';

export class RegisterRequest {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ format: 'date' })
  @IsNotEmpty()
  @IsDateString()
  dob: string;

  @ApiProperty({ enum: Gender })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @Matches(PHONE_REGEX.regex, { message: PHONE_REGEX.msg })
  phone: string;

  @ApiProperty({ format: 'email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(PASSWORD_REGEX.regex, { message: PASSWORD_REGEX.msg })
  password: string;

  @ApiProperty()
  avatar: string;

  ggRefreshToken?: string;
}
