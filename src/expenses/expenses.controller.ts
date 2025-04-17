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

/**
 * Controller for expense operations
 *
 * @class
 * @description Manages HTTP requests related to expenses
 */
@ApiTags('Expenses')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  /**
   * Create a new expense
   *
   * @param {CreateExpenseDto} createExpenseDto - Data for creating the expense
   * @returns {Promise<Expense>} The created expense
   * @example
   * // Example usage with Fetch API
   * fetch('/api/expenses', {
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: JSON.stringify({
   *     description: "Groceries",
   *     value: 100.50,
   *     typeId: 1,
   *     status: true,
   *     date: "2023-07-15T00:00:00.000Z",
   *     observation: "Weekly shopping",
   *     userId: 1
   *   })
   * })
   */
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

  /**
   * Find all expenses for a user
   *
   * @param {string} userId - User ID
   * @returns {Promise<Expense[]>} Array of expenses with their types
   * @example
   * // Example usage with Fetch API
   * fetch('/api/expenses/1')
   */
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

  /**
   * Find an expense by ID
   *
   * @param {string} id - Expense ID
   * @returns {Promise<Expense>} The expense
   * @example
   * // Example usage with Fetch API
   * fetch('/api/expenses/123')
   */
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

  /**
   * Get total expenses for a user in a specific month and year
   *
   * @param {string} year - Year
   * @param {string} userId - User ID
   * @param {string} month - Month (1-12)
   * @returns {Promise<{total: number}>} Total sum of expenses
   * @example
   * // Example usage with Fetch API
   * fetch('/api/expenses/1/2023/7') // Get July 2023 expenses for user 1
   */
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

  /**
   * Update an expense
   *
   * @param {string} id - Expense ID
   * @param {UpdateExpenseDto} updateExpenseDto - Data for updating the expense
   * @returns {Promise<Expense>} The updated expense
   * @example
   * // Example usage with Fetch API
   * fetch('/api/expenses/123', {
   *   method: 'PATCH',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: JSON.stringify({ value: 150.75 })
   * })
   */
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

  /**
   * Remove an expense
   *
   * @param {string} id - Expense ID
   * @returns {Promise<Expense>} The deleted expense
   * @example
   * // Example usage with Fetch API
   * fetch('/api/expenses/123', {
   *   method: 'DELETE'
   * })
   */
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

  /**
   * Get expense report grouped by category
   *
   * @param {string} year - Year
   * @param {string} userId - User ID
   * @param {string} month - Month (1-12)
   * @returns {Promise<Array<{type: ExpenseType, total: number}>>} Expenses grouped by category
   * @example
   * // Example usage with Fetch API
   * fetch('/api/expenses/report/1/2023/7') // Get July 2023 report for user 1
   */
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
