import { StatusCode } from '@constant/status-code.enum';
import { AppException } from '@exception/app.exception';
import { HttpStatus } from '@nestjs/common';

export class EmailExistedException extends AppException {
  constructor() {
    super(StatusCode.EMAIL_EXISTED, HttpStatus.BAD_REQUEST);
  }
}
