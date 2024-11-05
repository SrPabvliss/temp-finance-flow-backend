import { Injectable } from '@nestjs/common';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IncomesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createIncomeDto: CreateIncomeDto) {
    return this.prisma.income.create({
      data: createIncomeDto,
    });
  }

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

  findAll(userId: number) {
    return this.prisma.income.findMany({
      where: {
        userId,
      },
      include: {
        type: true,
      },
    });
  }

  findOne(id: number) {
    const income = this.prisma.income.findUnique({
      where: { id },
    });

    if (!income) {
      throw new Error('Income not found');
    }
    return this.prisma.income.findUnique({
      where: { id },
    });
  }

  update(id: number, updateIncomeDto: UpdateIncomeDto) {
    const income = this.prisma.income.findUnique({
      where: { id },
    });

    if (!income) {
      throw new Error('Income not found');
    }

    return this.prisma.income.update({
      where: { id },
      data: updateIncomeDto,
    });
  }

  remove(id: number) {
    const income = this.prisma.income.findUnique({
      where: { id },
    });

    if (!income) {
      throw new Error('Income not found');
    }

    return this.prisma.income.delete({
      where: { id },
    });
  }

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
