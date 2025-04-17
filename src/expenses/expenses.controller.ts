import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Expenses')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new expense' })
  @ApiBody({ type: CreateExpenseDto })
  @ApiResponse({
    status: 201,
    description: 'The expense has been successfully created',
    schema: {
      properties: {
        id: { type: 'number' },
        description: { type: 'string' },
        value: { type: 'number' },
        typeId: { type: 'number' },
        status: { type: 'boolean' },
        date: { type: 'string', format: 'date-time' },
        observation: { type: 'string', nullable: true },
        userId: { type: 'number' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Find all expenses for a user' })
  @ApiParam({ name: 'userId', description: 'User ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Returns array of expenses with their types',
    schema: {
      type: 'array',
      items: {
        properties: {
          id: { type: 'number' },
          description: { type: 'string' },
          value: { type: 'number' },
          typeId: { type: 'number' },
          status: { type: 'boolean' },
          date: { type: 'string', format: 'date-time' },
          observation: { type: 'string', nullable: true },
          userId: { type: 'number' },
          type: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              isGlobal: { type: 'boolean' },
              userId: { type: 'number', nullable: true },
            },
          },
        },
      },
    },
  })
  findAll(@Param('userId') userId: string) {
    return this.expensesService.findAll(+userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find an expense by ID' })
  @ApiParam({ name: 'id', description: 'Expense ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Returns the expense',
    schema: {
      properties: {
        id: { type: 'number' },
        description: { type: 'string' },
        value: { type: 'number' },
        typeId: { type: 'number' },
        status: { type: 'boolean' },
        date: { type: 'string', format: 'date-time' },
        observation: { type: 'string', nullable: true },
        userId: { type: 'number' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Expense not found' })
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(+id);
  }

  @Get(':userId/:year/:month')
  @ApiOperation({
    summary: 'Get total expenses for a user in a specific month and year',
  })
  @ApiParam({ name: 'userId', description: 'User ID', type: 'number' })
  @ApiParam({ name: 'year', description: 'Year', type: 'number' })
  @ApiParam({ name: 'month', description: 'Month (1-12)', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Returns total expenses',
    schema: {
      properties: {
        total: { type: 'number' },
      },
    },
  })
  getExpenseByUserId(
    @Param('year') year: string,
    @Param('userId') userId: string,
    @Param('month') month: string,
  ) {
    return this.expensesService.getExpenseByUserId(+year, +userId, +month);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an expense' })
  @ApiParam({ name: 'id', description: 'Expense ID', type: 'number' })
  @ApiBody({ type: UpdateExpenseDto })
  @ApiResponse({
    status: 200,
    description: 'The expense has been successfully updated',
    schema: {
      properties: {
        id: { type: 'number' },
        description: { type: 'string' },
        value: { type: 'number' },
        typeId: { type: 'number' },
        status: { type: 'boolean' },
        date: { type: 'string', format: 'date-time' },
        observation: { type: 'string', nullable: true },
        userId: { type: 'number' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Expense not found' })
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(+id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove an expense' })
  @ApiParam({ name: 'id', description: 'Expense ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The expense has been successfully deleted',
    schema: {
      properties: {
        id: { type: 'number' },
        description: { type: 'string' },
        value: { type: 'number' },
        typeId: { type: 'number' },
        status: { type: 'boolean' },
        date: { type: 'string', format: 'date-time' },
        observation: { type: 'string', nullable: true },
        userId: { type: 'number' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Expense not found' })
  remove(@Param('id') id: string) {
    return this.expensesService.remove(+id);
  }

  @Get('report/:userId/:year/:month')
  @ApiOperation({ summary: 'Get expense report by category' })
  @ApiParam({ name: 'userId', description: 'User ID', type: 'number' })
  @ApiParam({ name: 'year', description: 'Year', type: 'number' })
  @ApiParam({ name: 'month', description: 'Month (1-12)', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Returns expenses grouped by category',
    schema: {
      type: 'array',
      items: {
        properties: {
          type: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              isGlobal: { type: 'boolean' },
              userId: { type: 'number', nullable: true },
            },
          },
          total: { type: 'number' },
        },
      },
    },
  })
  getReportByCategory(
    @Param('year') year: string,
    @Param('userId') userId: string,
    @Param('month') month: string,
  ) {
    return this.expensesService.getReportByCategory(+year, +userId, +month);
  }
}
