import { Injectable } from '@nestjs/common';
import { IncomesService } from 'src/incomes/incomes.service';
import { ExpensesService } from 'src/expenses/expenses.service';

@Injectable()
export class TotalService {
  constructor(
    private readonly incomeService: IncomesService,
    private readonly expenseService: ExpensesService,
  ) {}

  async getTotal(userId: number, year: number, month: number) {
    const income = await this.incomeService.getIncomeByUserId(
      year,
      userId,
      month,
    );
    const expenses = await this.expenseService.getExpenseByUserId(
      year,
      userId,
      month,
    );

    const totalIncome: number = income.total || 0;
    const totalExpense: number = expenses.total || 0;

    const total: number = totalIncome - totalExpense;

    return {
      total,
      month,
      year,
    };
  }
}
