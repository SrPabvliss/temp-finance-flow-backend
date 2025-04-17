import { Injectable } from '@nestjs/common';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * Service for managing incomes
 *
 * @class
 * @description Handles operations related to incomes like creation, retrieval, update and deletion
 */
@Injectable()
export class IncomesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new income
   *
   * @param {CreateIncomeDto} createIncomeDto - Data for creating a new income
   * @returns {Promise<Income>} The created income
   * @example
   * // Usage example
   * this.incomesService.create({
   *   description: "Monthly Salary",
   *   value: 3000,
   *   typeId: 1,
   *   status: true,
   *   date: new Date(),
   *   observation: "Salary for January 2023",
   *   userId: 1
   * })
   */
  create(createIncomeDto: CreateIncomeDto) {
    return this.prisma.income.create({
      data: createIncomeDto,
    });
  }

  /**
   * Get total incomes for a user in a specific month and year
   *
   * @param {number} year - Year of the incomes
   * @param {number} userId - ID of the user
   * @param {number} month - Month of the incomes (1-12)
   * @returns {Promise<{total: number}>} Total sum of incomes
   * @example
   * // Usage example
   * this.incomesService.getIncomeByUserId(2023, 1, 7) // Get July 2023 incomes for user 1
   */
  async getIncomeByUserId(year: number, userId: number, month: number) {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 1);
    const result = await this.prisma.income.aggregate({
      _sum: {
        value: true,
      },
      where: {
        userId,
        date: {
          gte: startOfMonth,
          lt: endOfMonth,
        },
        status: true,
      },
    });

    return {
      total: result._sum.value ?? 0,
    };
  }

  /**
   * Find all incomes for a specific user
   *
   * @param {number} userId - ID of the user
   * @returns {Promise<Income[]>} Array of incomes with their types
   * @example
   * // Usage example
   * this.incomesService.findAll(1)
   */
  async findAll(userId: number) {
    return await this.prisma.income.findMany({
      where: {
        userId,
      },
      include: {
        type: true,
      },
    });
  }

  /**
   * Find a specific income by ID
   *
   * @param {number} id - ID of the income
   * @returns {Promise<Income>} The income
   * @throws {Error} If income not found
   * @example
   * // Usage example
   * this.incomesService.findOne(123)
   */
  async findOne(id: number) {
    const income = await this.prisma.income.findUnique({
      where: { id },
    });

    if (!income) {
      throw new Error('Income not found');
    }
    return income;
  }

  /**
   * Update an existing income
   *
   * @param {number} id - ID of the income to update
   * @param {UpdateIncomeDto} updateIncomeDto - Data for updating the income
   * @returns {Promise<Income>} The updated income
   * @throws {Error} If income not found
   * @example
   * // Usage example
   * this.incomesService.update(123, { value: 3500 })
   */
  async update(id: number, updateIncomeDto: UpdateIncomeDto) {
    const income = await this.findOne(id);

    if (!income) {
      throw new Error('Income not found');
    }

    return await this.prisma.income.update({
      where: { id },
      data: updateIncomeDto,
    });
  }

  /**
   * Remove an income
   *
   * @param {number} id - ID of the income to remove
   * @returns {Promise<Income>} The removed income
   * @throws {Error} If income not found
   * @example
   * // Usage example
   * this.incomesService.remove(123)
   */
  async remove(id: number) {
    const income = await this.findOne(id);

    if (!income) {
      throw new Error('Income not found');
    }

    return await this.prisma.income.delete({
      where: { id },
    });
  }

  /**
   * Get income report grouped by category for a user in a specific month
   *
   * @param {number} year - Year of the incomes
   * @param {number} userId - ID of the user
   * @param {number} month - Month of the incomes (1-12)
   * @returns {Promise<Array<{type: IncomeType, total: number}>>} Incomes grouped by category
   * @example
   * // Usage example
   * this.incomesService.getReportByCtegory(2023, 1, 7) // Get July 2023 report for user 1
   */
  async getReportByCtegory(year: number, userId: number, month: number) {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 1);
    const result = await this.prisma.income.groupBy({
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
        status: true,
      },
    });

    const typesId = result.map((item) => item.typeId);
    const types = await this.prisma.incomeType.findMany({
      where: {
        id: {
          in: typesId,
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
