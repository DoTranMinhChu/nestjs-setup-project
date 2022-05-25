import { StatusCode } from '@constant/status-code.enum';
import { AppException } from '@exception/app.exception';
import { HttpStatus } from '@nestjs/common';

export class OldPasswordIncorrectException extends AppException {
  constructor() {
    super(StatusCode.OLD_PASSWORD_INCORRECT, HttpStatus.BAD_REQUEST);
  }
}
