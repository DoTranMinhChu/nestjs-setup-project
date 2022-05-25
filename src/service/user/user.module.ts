import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@repository/user.repository';
import { UserService } from '@service/user/user.service';
import { AuthModule } from '@service/auth/auth.module';
import { CryptStrategy } from '@service/auth/crypt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), AuthModule],
  providers: [CryptStrategy, UserService],
  exports: [UserService],
})
export class UserModule {}
