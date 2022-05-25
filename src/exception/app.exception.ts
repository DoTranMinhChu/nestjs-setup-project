import { MessageResponse } from '@common/message-response';
import { StatusCode } from '@constant/status-code.enum';
import { HttpStatus } from '@nestjs/common';

export class AppException extends Error {
  appCode: StatusCode;
  httpCode: HttpStatus;

  constructor(appCode: StatusCode, httpCode: HttpStatus) {
    super(MessageResponse[appCode]);
    this.appCode = appCode;
    this.httpCode = httpCode;
  }
}
