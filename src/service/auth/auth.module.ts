import { Module } from '@nestjs/common';
import { AuthService } from '@service/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfig, JWT_PATH_CONFIG } from '@config/jwt.config';
import { JwtStrategy } from '@service/auth/jwt.strategy';
import { CryptStrategy } from '@service/auth/crypt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@repository/user.repository';
import { TokenRepository } from '@repository/token.repository';
import { UserService } from '@service/user/user.service';
import { UtilService } from '@service/util/util.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get<JwtConfig>(JWT_PATH_CONFIG),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserRepository, TokenRepository]),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    ConfigService,
    CryptStrategy,
    UserService,
    UtilService,
  ],
  exports: [AuthService, CryptStrategy],
})
export class AuthModule {}
