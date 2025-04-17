import { Injectable } from '@nestjs/common';
import { CreateSavingsGoalDto } from './dto/create-savings-goal.dto';
import { UpdateSavingsGoalDto } from './dto/update-savings-goal.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppError } from 'src/shared/app.error';
import { Errors } from 'src/shared/errors';

@Injectable()
export class SavingsGoalsService {
  constructor(private prismaService: PrismaService) {}

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

  async findAll(userId: number) {
    return await this.prismaService.savingGoal.findMany({
      where: {
        userId: userId,
      },
    });
  }

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

  async update(id: number, updateSavingsGoalDto: UpdateSavingsGoalDto) {
    await this.findOne(id);

    return await this.prismaService.savingGoal.update({
      where: {
        id: id,
      },
      data: updateSavingsGoalDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.prismaService.savingGoal.delete({
      where: {
        id: id,
      },
    });
  }
}
