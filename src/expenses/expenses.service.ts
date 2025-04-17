import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppError } from 'src/shared/app.error';
import { Errors } from 'src/shared/errors';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createExpenseDto: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: createExpenseDto,
    });
  }

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

  async findOne(id: number) {
    const expense = await this.prisma.expense.findUnique({
      where: { id },
    });

    if (!expense) {
      throw new AppError('Expense not found', Errors.NOT_FOUND);
    }

    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    await this.findOne(id);

    return await this.prisma.expense.update({
      where: { id },
      data: updateExpenseDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.expense.delete({
      where: { id },
    });
  }

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
