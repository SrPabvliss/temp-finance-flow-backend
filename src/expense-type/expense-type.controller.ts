import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ExpenseTypeService } from './expense-type.service';
import { CreateExpenseTypeDto } from './dto/create-expense-type.dto';

@Controller('type/expense')
export class ExpenseTypeController {
  constructor(private readonly expenseTypeService: ExpenseTypeService) {}

  @Post()
  create(@Body() createExpenseTypeDto: CreateExpenseTypeDto) {
    return this.expenseTypeService.create(createExpenseTypeDto);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.expenseTypeService.findAll(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseTypeService.findOne(+id);
  }
}
