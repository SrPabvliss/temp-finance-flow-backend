import { Injectable } from '@nestjs/common';
import { CreateExpenseTypeDto } from './dto/create-expense-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * Service for managing expense types
 *
 * @class
 * @description Handles operations related to expense types like creation and retrieval
 */
@Injectable()
export class ExpenseTypeService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new expense type
   *
   * @param {CreateExpenseTypeDto} createExpenseTypeDto - Data for creating a new expense type
   * @returns {Promise<ExpenseType>} The created expense type
   * @example
   * // Usage example
   * this.expenseTypeService.create({
   *   name: "Groceries",
   *   isGlobal: false,
   *   userId: 1
   * })
   */
  create(createExpenseTypeDto: CreateExpenseTypeDto) {
    return this.prisma.expenseType.create({
      data: createExpenseTypeDto,
    });
  }

  /**
   * Find all expense types available to a user
   *
   * @param {number} userId - ID of the user
   * @returns {Promise<ExpenseType[]>} Array of expense types available to the user
   * @description Returns global expense types and user-specific expense types
   * @example
   * // Usage example
   * this.expenseTypeService.findAll(1)
   */
  async findAll(userId: number) {
    return await this.prisma.expenseType.findMany({
      where: {
        OR: [{ isGlobal: true }, { isGlobal: false, userId }],
      },
    });
  }
}
