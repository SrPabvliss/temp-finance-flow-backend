import { Module } from '@nestjs/common';
import { TotalController } from './total.controller';
import { TotalService } from './total.service';
import { IncomesModule } from 'src/incomes/incomes.module';
import { ExpensesModule } from 'src/expenses/expenses.module';

/**
 * Total Module
 *
 * @module
 * @description Configures and integrates components for financial balance calculations
 */
@Module({
  imports: [IncomesModule, ExpensesModule],
  controllers: [TotalController],
  providers: [TotalService],
  exports: [TotalService],
})
export class TotalModule {}
