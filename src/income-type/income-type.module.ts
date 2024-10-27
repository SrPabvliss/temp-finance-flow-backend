import { Module } from '@nestjs/common';
import { IncomeTypeService } from './income-type.service';
import { IncomeTypeController } from './income-type.controller';

@Module({
  controllers: [IncomeTypeController],
  providers: [IncomeTypeService],
})
export class IncomeTypeModule {}
