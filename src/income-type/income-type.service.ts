import { Injectable } from '@nestjs/common';
import { CreateIncomeTypeDto } from './dto/create-income-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IncomeTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createIncomeTypeDto: CreateIncomeTypeDto) {
    return this.prisma.incomeType.create({
      data: createIncomeTypeDto,
    });
  }

  async findAll(userId: number) {
    return await this.prisma.incomeType.findMany({
      where: {
        OR: [{ isGlobal: true }, { isGlobal: false, userId }],
      },
    });
  }
}
