import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Headers,
  HttpCode,
  Redirect,
  Get,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger';
import { AuthService } from '@service/auth/auth.service';
import { Public } from '@decorator/public.decorator';
import { LoginRequest } from '@data/request/login.request';
import { HttpResponse } from '@common/http.response';
import { LoginResponse } from '@data/response/login.response';
import { LogoutRequest } from '@data/request/logout.request';
import { User } from '@common/user';
import { CurrentUser } from '@decorator/current-user.decorator';
import { RenewAccessTokenRequest } from '@data/request/renew-access-token.request';
import { RenewAccessTokenResponse } from '@data/response/renew-access-token.response';
import { TokenValidationRequest } from '@data/request/token-validate.request';
import { ValidateResponse } from '@data/response/validate.response';
import { LoginWithGoogleRequest } from '@data/request/login-with-google.request';

@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() request: LoginRequest,
    @Headers('User-Agent') agent: string,
  ): Promise<HttpResponse<LoginResponse>> {
    console.log('req : ', request)
    const result = await this.authService.login(request, agent);

    return HttpResponse.success(result);
  }

  @Public()
  @Post('token')
  @HttpCode(HttpStatus.OK)
  async issueNewAccessToken(
    @Body() request: RenewAccessTokenRequest,
  ): Promise<HttpResponse<RenewAccessTokenResponse>> {
    const result = await this.authService.renewAccessToken(
      request.refreshToken,
    );

    return HttpResponse.success(result);
  }

  @Public()
  @Post('google')
  @HttpCode(HttpStatus.OK)
  async loginWithGoogleV1(
    @Body() request: LoginWithGoogleRequest,
    @Headers('User-Agent') agent: string,
  ): Promise<HttpResponse<any>> {
    return HttpResponse.success(
      await this.authService.loginWithGoogle(request, agent),
    );
  }

  @ApiBearerAuth()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @CurrentUser() user: User,
    @Body() request: LogoutRequest,
  ): Promise<HttpResponse<void>> {
    await this.authService.logout(user.id, request);
    return HttpResponse.success();
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('validate')
  async validate(@Body() body: TokenValidationRequest): Promise<any> {
    try {
      const result = await this.authService.validate(body.token);
      return HttpResponse.success(new ValidateResponse(true, result));
    } catch (error) {
      return HttpResponse.success(new ValidateResponse(false));
    }
  }
}
