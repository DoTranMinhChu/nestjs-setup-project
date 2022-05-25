import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class LogoutRequest {
  @ApiProperty()
  @IsUUID()
  refreshToken: string;

  @ApiProperty()
  notificationToken: string;
}
