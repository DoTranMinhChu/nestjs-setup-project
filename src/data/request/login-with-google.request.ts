import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginWithGoogleRequest {
  @ApiProperty()
  @IsNotEmpty()
  credential: string;
}
