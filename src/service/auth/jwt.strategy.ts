import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from '@config/jwt.config';
import { User } from '@common/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<JwtConfig>('jwt').secret,
    });
  }

  async validate(payload: any): Promise<User> {
    const user = new User();
    user.id = payload.id;
    user.email = payload.email;
    user.roles = payload.roles;
    user.name = payload.name;
    user.phone = payload.phone;
    user.gender = payload.gender;
    user.dob = payload.dob;
    return user;
  }
}
