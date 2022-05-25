import { ApiProperty } from '@nestjs/swagger';

export class RenewAccessTokenResponse {
  @ApiProperty()
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}
