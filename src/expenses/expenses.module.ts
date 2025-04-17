import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * Expenses Module
 *
 * @module
 * @description Configures and integrates expense components
 */
@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService, PrismaService],
  exports: [ExpensesService],
})
export class ExpensesModule {}
