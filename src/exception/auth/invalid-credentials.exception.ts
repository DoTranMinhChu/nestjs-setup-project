import { StatusCode } from '@constant/status-code.enum';
import { AppException } from '@exception/app.exception';
import { HttpStatus } from '@nestjs/common';

export class InvalidCredentialsException extends AppException {
  constructor() {
    super(StatusCode.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
  }
}
