import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ExpenseTypeService } from './expense-type.service';
import { CreateExpenseTypeDto } from './dto/create-expense-type.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Expense Types')
@Controller('type/expense')
export class ExpenseTypeController {
  constructor(private readonly expenseTypeService: ExpenseTypeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new expense type' })
  @ApiBody({ type: CreateExpenseTypeDto })
  @ApiResponse({
    status: 201,
    description: 'The expense type has been successfully created',
    schema: {
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        isGlobal: { type: 'boolean' },
        userId: { type: 'number' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createExpenseTypeDto: CreateExpenseTypeDto) {
    return this.expenseTypeService.create(createExpenseTypeDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find all expense types available to a user' })
  @ApiParam({ name: 'id', description: 'User ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Returns array of expense types',
    schema: {
      type: 'array',
      items: {
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          isGlobal: { type: 'boolean' },
          userId: { type: 'number', nullable: true },
        },
      },
    },
  })
  findAll(@Param('id') id: string) {
    return this.expenseTypeService.findAll(+id);
  }
}
