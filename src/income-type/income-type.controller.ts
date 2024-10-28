import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IncomeTypeService } from './income-type.service';
import { CreateIncomeTypeDto } from './dto/create-income-type.dto';
import { UpdateIncomeTypeDto } from './dto/update-income-type.dto';

@Controller('income-type')
export class IncomeTypeController {
  constructor(private readonly incomeTypeService: IncomeTypeService) {}

  // @Post()
  // create(@Body() createIncomeTypeDto: CreateIncomeTypeDto) {
  //   return this.incomeTypeService.create(createIncomeTypeDto);
  // }

  // @Get()
  // findAll() {
  //   return this.incomeTypeService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.incomeTypeService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateIncomeTypeDto: UpdateIncomeTypeDto) {
  //   return this.incomeTypeService.update(+id, updateIncomeTypeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.incomeTypeService.remove(+id);
  // }
}
