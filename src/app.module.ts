import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from '@app/app.service';
import configuration from '@config/configuration';
import { AuthModule } from '@service/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@guard/auth.guard';
import { RolesGuard } from '@guard/role.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig, DB_PATH_CONFIG } from '@config/database.config';
import { UserModule } from '@service/user/user.module';
import { AuthController } from '@api/auth.controller';
import { UserController } from '@api/user.controller';
import { UtilController } from '@api/util.controller';
import { UtilModule } from '@service/util/util.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    CacheModule.register({
      ttl: 0,
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return configService.get<DatabaseConfig>(DB_PATH_CONFIG);
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    UtilModule,
  ],
  controllers: [
    AuthController,
    UserController,
    UtilController,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule { }
