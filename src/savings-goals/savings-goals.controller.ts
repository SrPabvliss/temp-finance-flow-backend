import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SavingsGoalsService } from './savings-goals.service';
import { CreateSavingsGoalDto } from './dto/create-savings-goal.dto';
import { UpdateSavingsGoalDto } from './dto/update-savings-goal.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

/**
 * Controller for savings goal operations
 *
 * @class
 * @description Manages HTTP requests related to savings goals
 */
@ApiTags('Savings Goals')
@Controller('goals')
export class SavingsGoalsController {
  constructor(private readonly savingsGoalsService: SavingsGoalsService) {}

  /**
   * Create a new savings goal
   *
   * @param {CreateSavingsGoalDto} createSavingsGoalDto - Data for creating the savings goal
   * @returns {Promise<SavingGoal>} The created savings goal
   * @example
   * // Example usage with Fetch API
   * fetch('/api/goals', {
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: JSON.stringify({
   *     value: 1000,
   *     percentaje: 20,
   *     status: false,
   *     date: "2023-01-15T00:00:00.000Z",
   *     userId: 1
   *   })
   * })
   */
  @Post()
  @ApiOperation({ summary: 'Create a new savings goal' })
  @ApiBody({ type: CreateSavingsGoalDto })
  @ApiResponse({
    status: 201,
    description: 'The savings goal has been successfully created',
    schema: {
      properties: {
        id: { type: 'number' },
        value: { type: 'number' },
        percentaje: { type: 'number' },
        status: { type: 'boolean' },
        date: { type: 'string', format: 'date-time' },
        userId: { type: 'number' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({
    status: 409,
    description: 'Conflict - A goal already exists for the same month',
  })
  create(@Body() createSavingsGoalDto: CreateSavingsGoalDto) {
    return this.savingsGoalsService.create(createSavingsGoalDto);
  }

  /**
   * Find all savings goals for a user
   *
   * @param {string} id - User ID
   * @returns {Promise<SavingGoal[]>} Array of savings goals
   * @example
   * // Example usage with Fetch API
   * fetch('/api/goals/1')
   */
  @Get(':id')
  @ApiOperation({ summary: 'Find all savings goals for a user' })
  @ApiParam({ name: 'id', description: 'User ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Returns array of savings goals',
    schema: {
      type: 'array',
      items: {
        properties: {
          id: { type: 'number' },
          value: { type: 'number' },
          percentaje: { type: 'number' },
          status: { type: 'boolean' },
          date: { type: 'string', format: 'date-time' },
          userId: { type: 'number' },
        },
      },
    },
  })
  findAll(@Param('id') id: string) {
    return this.savingsGoalsService.findAll(+id);
  }

  /**
   * Find a savings goal by ID
   *
   * @param {string} id - Savings Goal ID
   * @returns {Promise<SavingGoal>} The savings goal
   * @example
   * // Example usage with Fetch API
   * fetch('/api/goals/one/123')
   */
  @Get('one/:id')
  @ApiOperation({ summary: 'Find a savings goal by ID' })
  @ApiParam({ name: 'id', description: 'Savings Goal ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Returns the savings goal',
    schema: {
      properties: {
        id: { type: 'number' },
        value: { type: 'number' },
        percentaje: { type: 'number' },
        status: { type: 'boolean' },
        date: { type: 'string', format: 'date-time' },
        userId: { type: 'number' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Savings goal not found' })
  findOne(@Param('id') id: string) {
    return this.savingsGoalsService.findOne(+id);
  }

  /**
   * Update a savings goal
   *
   * @param {string} id - Savings Goal ID
   * @param {UpdateSavingsGoalDto} updateSavingsGoalDto - Data for updating the savings goal
   * @returns {Promise<SavingGoal>} The updated savings goal
   * @example
   * // Example usage with Fetch API
   * fetch('/api/goals/123', {
   *   method: 'PATCH',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: JSON.stringify({ value: 1500 })
   * })
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update a savings goal' })
  @ApiParam({ name: 'id', description: 'Savings Goal ID', type: 'number' })
  @ApiBody({ type: UpdateSavingsGoalDto })
  @ApiResponse({
    status: 200,
    description: 'The savings goal has been successfully updated',
    schema: {
      properties: {
        id: { type: 'number' },
        value: { type: 'number' },
        percentaje: { type: 'number' },
        status: { type: 'boolean' },
        date: { type: 'string', format: 'date-time' },
        userId: { type: 'number' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Savings goal not found' })
  update(
    @Param('id') id: string,
    @Body() updateSavingsGoalDto: UpdateSavingsGoalDto,
  ) {
    return this.savingsGoalsService.update(+id, updateSavingsGoalDto);
  }

  /**
   * Remove a savings goal
   *
   * @param {string} id - Savings Goal ID
   * @returns {Promise<SavingGoal>} The removed savings goal
   * @example
   * // Example usage with Fetch API
   * fetch('/api/goals/123', { method: 'DELETE' })
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Remove a savings goal' })
  @ApiParam({ name: 'id', description: 'Savings Goal ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The savings goal has been successfully deleted',
    schema: {
      properties: {
        id: { type: 'number' },
        value: { type: 'number' },
        percentaje: { type: 'number' },
        status: { type: 'boolean' },
        date: { type: 'string', format: 'date-time' },
        userId: { type: 'number' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Savings goal not found' })
  remove(@Param('id') id: string) {
    return this.savingsGoalsService.remove(+id);
  }
}
