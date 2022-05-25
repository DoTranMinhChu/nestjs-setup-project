import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponse {
  @ApiProperty()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
