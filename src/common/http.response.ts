import { MessageResponse } from '@common/message-response';
import { StatusCode } from '@constant/status-code.enum';
import { ApiProperty } from '@nestjs/swagger';

export class HttpResponse<T> {
  @ApiProperty()
  statusCode: StatusCode;

  @ApiProperty()
  message: string;

  data: T;

  static build<T>(): HttpResponseBuilder<T> {
    return new HttpResponseBuilder<T>();
  }

  static success<T>(data?: T): HttpResponse<T> {
    return this.build<T>()
      .withStatusCode(StatusCode.OK)
      .withMessage(MessageResponse[StatusCode.OK])
      .withData(data)
      .build();
  }
}

export class HttpResponseBuilder<T> {
  private statusCode: StatusCode;
  private message: string;
  private data: T;

  withStatusCode(statusCode: StatusCode): HttpResponseBuilder<T> {
    this.statusCode = statusCode;
    return this;
  }

  withMessage(message: string): HttpResponseBuilder<T> {
    this.message = message;
    return this;
  }

  withData(data: T): HttpResponseBuilder<T> {
    this.data = data;
    return this;
  }



  build(): HttpResponse<T> {
    const httpResponse = new HttpResponse<T>();
    httpResponse.statusCode = this.statusCode;
    httpResponse.message = this.message;
    httpResponse.data = this.data;
    return httpResponse;
  }
}
