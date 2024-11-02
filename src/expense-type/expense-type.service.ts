import { Injectable } from '@nestjs/common';
import { CreateExpenseTypeDto } from './dto/create-expense-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExpenseTypeService {
  constructor(private readonly prisma: PrismaService) {}

  create(createExpenseTypeDto: CreateExpenseTypeDto) {
    return this.prisma.expenseType.create({
      data: createExpenseTypeDto,
    });
  }

  async findAll(userId: number) {
    return await this.prisma.expenseType.findMany({
      where: {
        OR: [{ isGlobal: true }, { isGlobal: false, userId }],
      },
    });
  }
}
