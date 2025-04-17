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

@ApiTags('Savings Goals')
@Controller('goals')
export class SavingsGoalsController {
  constructor(private readonly savingsGoalsService: SavingsGoalsService) {}

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
