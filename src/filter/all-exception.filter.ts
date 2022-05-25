import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException,
  Logger,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { HttpResponse } from '@common/http.response';
import { AppException } from '@exception/app.exception';
import { MessageResponse } from '@common/message-response';
import { StatusCode } from '@constant/status-code.enum';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    console.log('error', exception)
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    try {
      this.logger.error(JSON.stringify(exception));
    } catch (e) {
      this.logger.error(exception);
    }

    if (exception instanceof AppException) {
      return response
        .status(exception.httpCode)
        .json(
          HttpResponse.build<string>()
            .withStatusCode(exception.appCode)
            .withMessage(MessageResponse[exception.appCode])
            .build(),
        );
    }

    // Override unauthorize exception
    if (exception instanceof UnauthorizedException) {
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .json(
          HttpResponse.build<string>()
            .withStatusCode(StatusCode.INVALID_CREDENTIALS)
            .withMessage(MessageResponse[StatusCode.INVALID_CREDENTIALS])
            .build(),
        );
    }

    if (exception instanceof BadRequestException) {
      const payload: any = exception.getResponse();

      return response
        .status(HttpStatus.BAD_REQUEST)
        .json(
          HttpResponse.build<any>()
            .withStatusCode(StatusCode.BAD_REQUEST)
            .withMessage(MessageResponse[StatusCode.BAD_REQUEST])
            .withData(payload?.message)
            .build(),
        );
    }

    response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(
        HttpResponse.build<string>()
          .withStatusCode(StatusCode.UNEXPECTED)
          .withMessage(MessageResponse[StatusCode.UNEXPECTED])
          .build(),
      );
  }
}
