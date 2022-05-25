import { Gender } from '@constant/user-gender.enum';
import { PHONE_REGEX } from '@constant/user.regex';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, Matches } from 'class-validator';

export class UpdateInfoRequest {
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
}
