import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { format } from 'date-fns';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createExpenseDto: CreateExpenseDto) {
    const { date, ...rest } = createExpenseDto;

    const expenseData = {
      ...rest,
      date: new Date(date),
    };

    return this.prisma.expense.create({
      data: expenseData,
    });
  }

  async findAll(userId: number) {
    const expenses = await this.prisma.expense.findMany({
      where: {
        userId,
      },
      include: {
        type: true
      }
    });

    return expenses.map((expense) => ({
      ...expense,
      date: format(expense.date, 'yyyy-MM-dd'),
    }));
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

  findOne(id: number) {
    return this.prisma.expense.findUnique({
      where: { id },
    });
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return this.prisma.expense.update({
      where: { id },
      data: updateExpenseDto,
    });
  }

  remove(id: number) {
    const expense = this.prisma.expense.findUnique({
      where: { id },
    });

    if (!expense) {
      throw new Error('Expense not found');
    }
    return this.prisma.expense.delete({
      where: { id },
    });
  }
}
