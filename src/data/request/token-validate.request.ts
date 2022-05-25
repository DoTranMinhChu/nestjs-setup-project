import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TokenValidationRequest {
  @ApiProperty()
  @IsNotEmpty()
  token: string;
}
