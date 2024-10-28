import { Injectable } from '@nestjs/common';
import { CreateIncomeTypeDto } from './dto/create-income-type.dto';
import { UpdateIncomeTypeDto } from './dto/update-income-type.dto';

@Injectable()
export class IncomeTypeService {
  create(createIncomeTypeDto: CreateIncomeTypeDto) {
    return 'This action adds a new incomeType';
  }

  async findAll(userId:number) {
    return `This action returns all incomeType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} incomeType`;
  }

  update(id: number, updateIncomeTypeDto: UpdateIncomeTypeDto) {
    return `This action updates a #${id} incomeType`;
  }

  remove(id: number) {
    return `This action removes a #${id} incomeType`;
  }
}
