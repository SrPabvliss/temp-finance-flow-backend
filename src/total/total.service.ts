import { Injectable } from '@nestjs/common';
import { IncomesService } from 'src/incomes/incomes.service';
import { ExpensesService } from 'src/expenses/expenses.service';

/**
 * Service for calculating financial totals and balances
 *
 * @class
 * @description Handles operations related to calculating financial balance (income - expenses)
 */
@Injectable()
export class TotalService {
  constructor(
    private readonly incomeService: IncomesService,
    private readonly expenseService: ExpensesService,
  ) {}

  /**
   * Calculate the total financial balance for a user in a specific month and year
   *
   * @param {number} userId - ID of the user
   * @param {number} year - Year to calculate balance for
   * @param {number} month - Month to calculate balance for (1-12)
   * @returns {Promise<{total: number, month: number, year: number}>} The balance information
   * @example
   * // Usage example
   * this.totalService.getTotal(1, 2023, 7) // Get July 2023 balance for user 1
   */
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
