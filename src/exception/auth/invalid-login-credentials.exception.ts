import { StatusCode } from '@constant/status-code.enum';
import { AppException } from '@exception/app.exception';
import { HttpStatus } from '@nestjs/common';

export class InvalidLoginCredentialsException extends AppException {
  constructor() {
    super(StatusCode.INVALID_LOGIN_CREDENTIALS, HttpStatus.UNAUTHORIZED);
  }
}
