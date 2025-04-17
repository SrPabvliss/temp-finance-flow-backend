import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { IncomeTypeService } from './income-type.service';
import { CreateIncomeTypeDto } from './dto/create-income-type.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

/**
 * Controller for income type operations
 *
 * @class
 * @description Manages HTTP requests related to income types
 */
@ApiTags('Income Types')
@Controller('type/income')
export class IncomeTypeController {
  constructor(private readonly incomeTypeService: IncomeTypeService) {}

  /**
   * Create a new income type
   *
   * @param {CreateIncomeTypeDto} createIncomeTypeDto - Data for creating the income type
   * @returns {Promise<IncomeType>} The created income type
   * @example
   * // Example usage with Fetch API
   * fetch('/api/type/income', {
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: JSON.stringify({
   *     name: "Salary",
   *     isGlobal: false,
   *     userId: 1
   *   })
   * })
   */
  @Post()
  @ApiOperation({ summary: 'Create a new income type' })
  @ApiBody({ type: CreateIncomeTypeDto })
  @ApiResponse({
    status: 201,
    description: 'The income type has been successfully created',
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
  create(@Body() createIncomeTypeDto: CreateIncomeTypeDto) {
    return this.incomeTypeService.create(createIncomeTypeDto);
  }

  /**
   * Find all income types available to a user
   *
   * @param {string} id - User ID
   * @returns {Promise<IncomeType[]>} Array of income types
   * @example
   * // Example usage with Fetch API
   * fetch('/api/type/income/1')
   */
  @Get(':id')
  @ApiOperation({ summary: 'Find all income types available to a user' })
  @ApiParam({ name: 'id', description: 'User ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Returns array of income types',
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
    return this.incomeTypeService.findAll(+id);
  }
}
