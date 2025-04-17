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

/**
 * Controller for expense type operations
 *
 * @class
 * @description Manages HTTP requests related to expense types
 */
@ApiTags('Expense Types')
@Controller('type/expense')
export class ExpenseTypeController {
  constructor(private readonly expenseTypeService: ExpenseTypeService) {}

  /**
   * Create a new expense type
   *
   * @param {CreateExpenseTypeDto} createExpenseTypeDto - Data for creating the expense type
   * @returns {Promise<ExpenseType>} The created expense type
   * @example
   * // Example usage with Fetch API
   * fetch('/api/type/expense', {
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: JSON.stringify({
   *     name: "Groceries",
   *     isGlobal: false,
   *     userId: 1
   *   })
   * })
   */
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

  /**
   * Find all expense types available to a user
   *
   * @param {string} id - User ID
   * @returns {Promise<ExpenseType[]>} Array of expense types
   * @example
   * // Example usage with Fetch API
   * fetch('/api/type/expense/1')
   */
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
