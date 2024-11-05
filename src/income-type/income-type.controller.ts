import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { IncomeTypeService } from './income-type.service';
import { CreateIncomeTypeDto } from './dto/create-income-type.dto';

@Controller('type/income')
export class IncomeTypeController {
  constructor(private readonly incomeTypeService: IncomeTypeService) {}

  @Post()
  create(@Body() createIncomeTypeDto: CreateIncomeTypeDto) {
    return this.incomeTypeService.create(createIncomeTypeDto);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.incomeTypeService.findAll(+id);
  }
}
