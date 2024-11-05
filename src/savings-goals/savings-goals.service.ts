import { Injectable } from '@nestjs/common';
import { CreateSavingsGoalDto } from './dto/create-savings-goal.dto';
import { UpdateSavingsGoalDto } from './dto/update-savings-goal.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SavingsGoalsService {
  constructor(private prismaService: PrismaService) {}

  async create(createSavingsGoalDto: CreateSavingsGoalDto) {
    try {
      // Convertir la fecha string a objeto Date
      const targetDate = new Date(createSavingsGoalDto.date);

      // Verificar si la fecha es válida
      if (isNaN(targetDate.getTime())) {
        throw new Error('Fecha inválida');
      }

      // Obtener el primer día del mes
      const startOfMonth = new Date(
        targetDate.getFullYear(),
        targetDate.getMonth(),
        1,
      );

      // Obtener el primer día del siguiente mes
      const endOfMonth = new Date(
        targetDate.getFullYear(),
        targetDate.getMonth() + 1,
        1,
      );

      // Buscar si existe un objetivo en el mismo mes
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
        throw new Error('Ya existe un objetivo de ahorro para este mes');
      }

      // Crear el nuevo objetivo
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
      throw new Error(`Error al crear el objetivo de ahorro: ${error.message}`);
    }
  }

  findAll(userId: number) {
    return this.prismaService.savingGoal.findMany({
      where: {
        userId: userId,
      },
    });
  }

  findOne(id: number) {
    const savingGoal = this.prismaService.savingGoal.findUnique({
      where: {
        id: id,
      },
    });

    if (!savingGoal) {
      throw new Error('No se encontró el objetivo de ahorro');
    }

    return savingGoal;
  }

  update(id: number, updateSavingsGoalDto: UpdateSavingsGoalDto) {
    const savingGoal = this.prismaService.savingGoal.findUnique({
      where: {
        id: id,
      },
    });

    if (!savingGoal) {
      throw new Error('No se encontró el objetivo de ahorro');
    }
    return this.prismaService.savingGoal.update({
      where: {
        id: id,
      },
      data: updateSavingsGoalDto,
    });
  }

  remove(id: number) {
    const savingGoal = this.prismaService.savingGoal.findUnique({
      where: {
        id: id,
      },
    });

    if (!savingGoal) {
      throw new Error('No se encontró el objetivo de ahorro');
    }

    return this.prismaService.savingGoal.delete({
      where: {
        id: id,
      },
    });
  }
}
