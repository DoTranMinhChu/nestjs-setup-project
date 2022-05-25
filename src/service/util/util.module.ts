import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilService } from '@service/util/util.service';

@Module({
  imports: [],
  providers: [UtilService],
  exports: [UtilService],
})
export class UtilModule {}
