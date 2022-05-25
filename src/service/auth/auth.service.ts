import { UserRepository } from '@repository/user.repository';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptStrategy } from '@service/auth/crypt.strategy';
import { LoginRequest } from '@data/request/login.request';
import { LoginResponse } from '@data/response/login.response';
import { TokenRepository } from '@repository/token.repository';
import { ConfigService } from '@nestjs/config';
import {
  REFRESH_TOKEN_CONFIG,
  RefreshTokenConfig,
} from '@config/refresh-token.config';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import * as crypto from 'crypto';
import { UserEntity } from '@data/entity/user.entity';
import { RenewAccessTokenResponse } from '@data/response/renew-access-token.response';
import { MoreThanOrEqual } from 'typeorm';
import { InvalidLoginCredentialsException } from '@exception/auth/invalid-login-credentials.exception';
import { InvalidCredentialsException } from '@exception/auth/invalid-credentials.exception';
import { GOOGLE_CONFIG, GoogleConfig } from '@config/google.config';
import { UserService } from '@service/user/user.service';
import { RegisterRequest } from '@data/request/register.request';
import { LogoutRequest } from '@data/request/logout.request';
import { UtilService } from '@service/util/util.service';
import axios from 'axios';
import { google } from 'googleapis';
import { LoginWithGoogleRequest } from '@data/request/login-with-google.request';
const { OAuth2 } = google.auth;

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;
  private googleConfig: GoogleConfig;

  constructor(
    private jwtService: JwtService,
    private cryptStrategy: CryptStrategy,
    private userService: UserService,
    private userRepository: UserRepository,
    private tokenRepository: TokenRepository,
    private configService: ConfigService,
    private utilService: UtilService,
  ) {
    this.googleConfig = configService.get<GoogleConfig>(GOOGLE_CONFIG);
    this.googleClient = new OAuth2Client(
      this.googleConfig.id,
      this.googleConfig.secret,
      this.googleConfig.redirectURI,
    );
  }

  async login(request: LoginRequest, agent: string): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(request.email);

    if (!user) {
      throw new InvalidLoginCredentialsException();
    }

    if (!(await this.cryptStrategy.check(request.password, user.password))) {
      throw new InvalidLoginCredentialsException();
    }

    return await this.issueTokens(user, agent);
  }

  async logout(userId: string, request: LogoutRequest) {
    const token = await this.tokenRepository.findTokenByIdAndUserId(
      userId,
      request.refreshToken,
    );

    if (!token) {
      throw new InvalidCredentialsException();
    }

    await this.tokenRepository.revokeToken(userId, request.refreshToken);
  }

  async renewAccessToken(
    refreshToken: string,
  ): Promise<RenewAccessTokenResponse> {
    const refreshTokenEntity = await this.tokenRepository.findOne({
      where: {
        id: refreshToken,
        validUntil: MoreThanOrEqual(new Date().getTime()),
      },
    });

    if (!refreshTokenEntity) {
      throw new InvalidCredentialsException();
    }

    const user = await refreshTokenEntity.user;

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      roles: user.roles,
      name: user.name,
      phone: user.phone,
      gender: user.gender,
      dob: user.dob,
      isPremium : user.isPremium
    });

    return new RenewAccessTokenResponse(token);
  }

  private async issueRefreshToken(user: UserEntity, agent: string) {
    const refreshTokenConfig =
      this.configService.get<RefreshTokenConfig>(REFRESH_TOKEN_CONFIG);

    const refreshToken = await this.tokenRepository.issueToken(
      user.id,
      refreshTokenConfig.expiresInMs,
      agent,
    );

    return refreshToken.id;
  }

  async validate(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(token);
  }

  async loginWithGoogle(
    request: LoginWithGoogleRequest,
    agent: string,
  ): Promise<LoginResponse> {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: request.credential,
      });
      const payload: TokenPayload = ticket.getPayload();

      const user: UserEntity = await this.userRepository.findByEmail(
        payload.email,
      );

      if (user) {
        return await this.issueTokens(user, agent);
      }

      const newUser = await this.userService.createUser(
        this.payload2RegisterRequest(payload),
        true,
      );

      return await this.issueTokens(newUser, agent);
    } catch (error) {
      throw new InvalidCredentialsException();
    }
  }

  private async issueTokens(user: UserEntity, agent: string) {
    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      roles: user.roles,
      name: user.name,
      phone: user.phone,
      gender: user.gender,
      dob: user.dob,
      isPremium : user.isPremium
    });

    const refreshToken = await this.issueRefreshToken(user, agent);
    return new LoginResponse(token, refreshToken);
  }

  payload2RegisterRequest(payload: any): RegisterRequest {
    const request = new RegisterRequest();
    request.email = payload.email;
    request.name = payload.given_name + ' ' + payload.family_name;
    request.password = crypto.randomBytes(20).toString('hex');
    request.avatar = payload?.picture?.replace('=s96', '=s500');
    request.ggRefreshToken = payload?.ggRefreshToken || null;
    return request;
  }
}
