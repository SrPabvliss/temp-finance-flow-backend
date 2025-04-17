import { Injectable } from '@nestjs/common';
import { CreateSavingsGoalDto } from './dto/create-savings-goal.dto';
import { UpdateSavingsGoalDto } from './dto/update-savings-goal.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppError } from 'src/shared/app.error';
import { Errors } from 'src/shared/errors';

/**
 * Service for managing savings goals
 *
 * @class
 * @description Handles operations related to savings goals like creation, retrieval, update and deletion
 */
@Injectable()
export class SavingsGoalsService {
  constructor(private prismaService: PrismaService) {}

  /**
   * Create a new savings goal
   *
   * @param {CreateSavingsGoalDto} createSavingsGoalDto - Data for creating a new savings goal
   * @returns {Promise<SavingGoal>} The created savings goal
   * @throws {AppError} If a goal already exists for the same month or if date is invalid
   * @example
   * // Usage example
   * this.savingsGoalsService.create({
   *   value: 1000,
   *   percentaje: 20,
   *   status: false,
   *   date: new Date(),
   *   userId: 1
   * })
   */
  async create(createSavingsGoalDto: CreateSavingsGoalDto) {
    try {
      const targetDate = new Date(createSavingsGoalDto.date);

      if (isNaN(targetDate.getTime())) {
        throw new AppError('Fecha inválida', Errors.BAD_REQUEST);
      }

      const startOfMonth = new Date(
        targetDate.getFullYear(),
        targetDate.getMonth(),
        1,
      );

      const endOfMonth = new Date(
        targetDate.getFullYear(),
        targetDate.getMonth() + 1,
        1,
      );

      const existGoalMonth = await this.prismaService.savingGoal.findFirst({
        where: {
          AND: [
            {
              userId: createSavingsGoalDto.userId,
            },
            {
              date: {
                gte: startOfMonth,
                lt: endOfMonth,
              },
            },
          ],
        },
      });

      if (existGoalMonth) {
        throw new AppError(
          'Ya existe un objetivo de ahorro para este mes',
          Errors.BAD_REQUEST,
        );
      }

      return await this.prismaService.savingGoal.create({
        data: {
          ...createSavingsGoalDto,
          date: targetDate,
        },
      });
    } catch (error) {
      if (error.message === 'Ya existe un objetivo de ahorro para este mes') {
        throw error;
      }
      throw new AppError(
        `Error al crear el objetivo de ahorro: ${error.message}`,
        Errors.BAD_REQUEST,
      );
    }
  }

  /**
   * Find all savings goals for a specific user
   *
   * @param {number} userId - ID of the user
   * @returns {Promise<SavingGoal[]>} Array of savings goals
   * @example
   * // Usage example
   * this.savingsGoalsService.findAll(1)
   */
  async findAll(userId: number) {
    return await this.prismaService.savingGoal.findMany({
      where: {
        userId: userId,
      },
    });
  }

  /**
   * Find a specific savings goal by ID
   *
   * @param {number} id - ID of the savings goal
   * @returns {Promise<SavingGoal>} The savings goal
   * @throws {AppError} If savings goal is not found
   * @example
   * // Usage example
   * this.savingsGoalsService.findOne(123)
   */
  async findOne(id: number) {
    const savingGoal = await this.prismaService.savingGoal.findUnique({
      where: {
        id: id,
      },
    });

    if (!savingGoal) {
      throw new AppError(
        'No se encontró el objetivo de ahorro',
        Errors.NOT_FOUND,
      );
    }

    return savingGoal;
  }

  /**
   * Update an existing savings goal
   *
   * @param {number} id - ID of the savings goal to update
   * @param {UpdateSavingsGoalDto} updateSavingsGoalDto - Data for updating the savings goal
   * @returns {Promise<SavingGoal>} The updated savings goal
   * @throws {AppError} If savings goal is not found
   * @example
   * // Usage example
   * this.savingsGoalsService.update(123, { value: 1500 })
   */
  async update(id: number, updateSavingsGoalDto: UpdateSavingsGoalDto) {
    await this.findOne(id);

    return await this.prismaService.savingGoal.update({
      where: {
        id: id,
      },
      data: updateSavingsGoalDto,
    });
  }

  /**
   * Remove a savings goal
   *
   * @param {number} id - ID of the savings goal to remove
   * @returns {Promise<SavingGoal>} The removed savings goal
   * @throws {AppError} If savings goal is not found
   * @example
   * // Usage example
   * this.savingsGoalsService.remove(123)
   */
  async remove(id: number) {
    await this.findOne(id);

    return await this.prismaService.savingGoal.delete({
      where: {
        id: id,
      },
    });
  }
}
