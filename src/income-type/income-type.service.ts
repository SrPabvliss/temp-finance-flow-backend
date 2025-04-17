import { Injectable } from '@nestjs/common';
import { CreateIncomeTypeDto } from './dto/create-income-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * Service for managing income types
 *
 * @class
 * @description Handles operations related to income types like creation and retrieval
 */
@Injectable()
export class IncomeTypeService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new income type
   *
   * @param {CreateIncomeTypeDto} createIncomeTypeDto - Data for creating a new income type
   * @returns {Promise<IncomeType>} The created income type
   * @example
   * // Usage example
   * this.incomeTypeService.create({
   *   name: "Salary",
   *   isGlobal: false,
   *   userId: 1
   * })
   */
  async create(createIncomeTypeDto: CreateIncomeTypeDto) {
    return this.prisma.incomeType.create({
      data: createIncomeTypeDto,
    });
  }

  /**
   * Find all income types available to a user
   *
   * @param {number} userId - ID of the user
   * @returns {Promise<IncomeType[]>} Array of income types available to the user
   * @description Returns global income types and user-specific income types
   * @example
   * // Usage example
   * this.incomeTypeService.findAll(1)
   */
  async findAll(userId: number) {
    return await this.prisma.incomeType.findMany({
      where: {
        OR: [{ isGlobal: true }, { isGlobal: false, userId }],
      },
    });
  }
}
