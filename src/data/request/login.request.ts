import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty({ format: 'email' })
  email: string;

  @ApiProperty()
  password: string;
}
