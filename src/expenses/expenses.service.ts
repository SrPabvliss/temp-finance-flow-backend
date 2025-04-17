import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppError } from 'src/shared/app.error';
import { Errors } from 'src/shared/errors';

/**
 * Service for managing expenses
 *
 * @class
 * @description Handles operations related to expenses like creation, retrieval, update and deletion
 */
@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new expense
   *
   * @param {CreateExpenseDto} createExpenseDto - Data for creating a new expense
   * @returns {Promise<Expense>} The created expense
   * @example
   * // Usage example
   * this.expensesService.create({
   *   description: "Groceries",
   *   value: 100.50,
   *   typeId: 1,
   *   status: true,
   *   date: new Date(),
   *   observation: "Weekly shopping",
   *   userId: 1
   * })
   */
  create(createExpenseDto: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: createExpenseDto,
    });
  }

  /**
   * Find all expenses for a specific user
   *
   * @param {number} userId - ID of the user
   * @returns {Promise<Expense[]>} Array of expenses with their types
   * @example
   * // Usage example
   * this.expensesService.findAll(1)
   */
  async findAll(userId: number) {
    const expenses = await this.prisma.expense.findMany({
      where: {
        userId,
      },
      include: {
        type: true,
      },
    });

    return expenses;
  }

  /**
   * Get total expenses for a user in a specific month and year
   *
   * @param {number} year - Year of the expenses
   * @param {number} userId - ID of the user
   * @param {number} month - Month of the expenses (1-12)
   * @returns {Promise<{total: number}>} Total sum of expenses
   * @example
   * // Usage example
   * this.expensesService.getExpenseByUserId(2023, 1, 7) // Get July 2023 expenses for user 1
   */
  async getExpenseByUserId(year: number, userId: number, month: number) {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 1);
    const result = await this.prisma.expense.aggregate({
      _sum: {
        value: true,
      },
      where: {
        userId,
        date: {
          gte: startOfMonth,
          lt: endOfMonth,
        },
      },
    });

    return {
      total: result._sum.value ?? 0,
    };
  }

  /**
   * Find a specific expense by ID
   *
   * @param {number} id - ID of the expense
   * @returns {Promise<Expense>} The expense
   * @throws {AppError} If expense not found
   * @example
   * // Usage example
   * this.expensesService.findOne(123)
   */
  async findOne(id: number) {
    const expense = await this.prisma.expense.findUnique({
      where: { id },
    });

    if (!expense) {
      throw new AppError('Expense not found', Errors.NOT_FOUND);
    }

    return expense;
  }

  /**
   * Update an existing expense
   *
   * @param {number} id - ID of the expense to update
   * @param {UpdateExpenseDto} updateExpenseDto - Data for updating the expense
   * @returns {Promise<Expense>} The updated expense
   * @throws {AppError} If expense not found
   * @example
   * // Usage example
   * this.expensesService.update(123, { value: 150.75 })
   */
  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    await this.findOne(id);

    return await this.prisma.expense.update({
      where: { id },
      data: updateExpenseDto,
    });
  }

  /**
   * Remove an expense
   *
   * @param {number} id - ID of the expense to remove
   * @returns {Promise<Expense>} The deleted expense
   * @throws {AppError} If expense not found
   * @example
   * // Usage example
   * this.expensesService.remove(123)
   */
  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.expense.delete({
      where: { id },
    });
  }

  /**
   * Get expense report grouped by category for a user in a specific month
   *
   * @param {number} year - Year of the expenses
   * @param {number} userId - ID of the user
   * @param {number} month - Month of the expenses (1-12)
   * @returns {Promise<Array<{type: ExpenseType, total: number}>>} Expenses grouped by category
   * @example
   * // Usage example
   * this.expensesService.getReportByCategory(2023, 1, 7) // Get July 2023 report for user 1
   */
  async getReportByCategory(year: number, userId: number, month: number) {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 1);
    const result = await this.prisma.expense.groupBy({
      by: ['typeId'],
      _sum: {
        value: true,
      },
      where: {
        userId,
        date: {
          gte: startOfMonth,
          lt: endOfMonth,
        },
      },
    });

    const typesIds = result.map((item) => item.typeId);
    const types = await this.prisma.expenseType.findMany({
      where: {
        id: {
          in: typesIds,
        },
      },
    });

    return result.map((item) => {
      const type = types.find((t) => t.id === item.typeId);
      return {
        type,
        total: item._sum.value ?? 0,
      };
    });
  }
}
