import { Module } from '@nestjs/common';
import { IncomeTypeService } from './income-type.service';
import { IncomeTypeController } from './income-type.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [IncomeTypeController],
  providers: [IncomeTypeService, PrismaService],
})
export class IncomeTypeModule {}
