import { Module } from '@nestjs/common';
import { ExpenseTypeService } from './expense-type.service';
import { ExpenseTypeController } from './expense-type.controller';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * Expense Type Module
 *
 * @module
 * @description Configures and integrates expense type components
 */
@Module({
  controllers: [ExpenseTypeController],
  providers: [ExpenseTypeService, PrismaService],
})
export class ExpenseTypeModule {}
