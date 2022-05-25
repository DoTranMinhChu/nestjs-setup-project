import { StatusCode } from '@constant/status-code.enum';
import { AppException } from '@exception/app.exception';
import { HttpStatus } from '@nestjs/common';

export class UnexpectedException extends AppException {
  constructor() {
    super(StatusCode.UNEXPECTED, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

