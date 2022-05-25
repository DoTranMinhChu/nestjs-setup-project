import { StatusCode } from '@constant/status-code.enum';
import { AppException } from '@exception/app.exception';
import { HttpStatus } from '@nestjs/common';

export class UserNotExistedException extends AppException {
  constructor() {
    super(StatusCode.USER_NOT_EXISTED, HttpStatus.BAD_REQUEST);
  }
}
