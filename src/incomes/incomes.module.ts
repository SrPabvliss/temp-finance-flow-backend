import { Module } from '@nestjs/common';
import { IncomesService } from './incomes.service';
import { IncomesController } from './incomes.controller';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * Incomes Module
 *
 * @module
 * @description Configures and integrates income components
 */
@Module({
  controllers: [IncomesController],
  providers: [IncomesService, PrismaService],
  exports: [IncomesService],
})
export class IncomesModule {}
