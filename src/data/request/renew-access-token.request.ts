import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class RenewAccessTokenRequest {
  @ApiProperty()
  @IsUUID()
  refreshToken: string;

  constructor(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
}
