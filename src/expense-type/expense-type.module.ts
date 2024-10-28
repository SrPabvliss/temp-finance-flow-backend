import { Module } from '@nestjs/common';
import { ExpenseTypeService } from './expense-type.service';
import { ExpenseTypeController } from './expense-type.controller';

@Module({
  controllers: [ExpenseTypeController],
  providers: [ExpenseTypeService],
})
export class ExpenseTypeModule {}
