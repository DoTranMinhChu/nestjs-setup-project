import { UtilService } from '@service/util/util.service';
import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '@decorator/public.decorator';

@Public()
@ApiTags('Utils')
@ApiBearerAuth()
@Controller('api/utils')
export class UtilController {
  constructor(private utilService: UtilService) { }

}
