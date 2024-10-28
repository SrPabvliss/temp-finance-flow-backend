import { Injectable } from '@nestjs/common';
import { CreateExpenseTypeDto } from './dto/create-expense-type.dto';
import { UpdateExpenseTypeDto } from './dto/update-expense-type.dto';

@Injectable()
export class ExpenseTypeService {
  create(createExpenseTypeDto: CreateExpenseTypeDto) {
    return 'This action adds a new expenseType';
  }

  findAll() {
    return `This action returns all expenseType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expenseType`;
  }

  update(id: number, updateExpenseTypeDto: UpdateExpenseTypeDto) {
    return `This action updates a #${id} expenseType`;
  }

  remove(id: number) {
    return `This action removes a #${id} expenseType`;
  }
}
