import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty()
  token: string;

  @ApiProperty()
  refreshToken: string;

  constructor(token: string, refreshToken: string) {
    this.token = token;
    this.refreshToken = refreshToken;
  }
}
