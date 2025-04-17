import { Module } from '@nestjs/common';
import { IncomeTypeService } from './income-type.service';
import { IncomeTypeController } from './income-type.controller';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * Income Type Module
 *
 * @module
 * @description Configures and integrates income type components
 */
@Module({
  controllers: [IncomeTypeController],
  providers: [IncomeTypeService, PrismaService],
})
export class IncomeTypeModule {}
