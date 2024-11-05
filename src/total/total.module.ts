import { Module } from '@nestjs/common';
import { TotalService } from './total.service';
import { TotalController } from './total.controller';
import { IncomesModule } from 'src/incomes/incomes.module';
import { ExpensesModule } from 'src/expenses/expenses.module';

@Module({
  imports: [IncomesModule, ExpensesModule],
  controllers: [TotalController],
  providers: [TotalService],
})
export class TotalModule {}
