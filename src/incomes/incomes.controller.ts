import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IncomesService } from './incomes.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Incomes')
@Controller('incomes')
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new income' })
  @ApiBody({ type: CreateIncomeDto })
  @ApiResponse({
    status: 201,
    description: 'The income has been successfully created',
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
  create(@Body() createIncomeDto: CreateIncomeDto) {
    return this.incomesService.create(createIncomeDto);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Find all incomes for a user' })
  @ApiParam({ name: 'userId', description: 'User ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Returns array of incomes with their types',
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
    return this.incomesService.findAll(+userId);
  }

  @Get(':userId/:year/:month')
  @ApiOperation({
    summary: 'Get total incomes for a user in a specific month and year',
  })
  @ApiParam({ name: 'userId', description: 'User ID', type: 'number' })
  @ApiParam({ name: 'year', description: 'Year', type: 'number' })
  @ApiParam({ name: 'month', description: 'Month (1-12)', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Returns total incomes',
    schema: {
      properties: {
        total: { type: 'number' },
      },
    },
  })
  getIncomeByUserId(
    @Param('year') year: string,
    @Param('userId') userId: string,
    @Param('month') month: string,
  ) {
    return this.incomesService.getIncomeByUserId(+year, +userId, +month);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find an income by ID' })
  @ApiParam({ name: 'id', description: 'Income ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Returns the income',
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
  @ApiResponse({ status: 404, description: 'Income not found' })
  findOne(@Param('id') id: string) {
    return this.incomesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an income' })
  @ApiParam({ name: 'id', description: 'Income ID', type: 'number' })
  @ApiBody({ type: UpdateIncomeDto })
  @ApiResponse({
    status: 200,
    description: 'The income has been successfully updated',
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
  @ApiResponse({ status: 404, description: 'Income not found' })
  update(@Param('id') id: string, @Body() updateIncomeDto: UpdateIncomeDto) {
    return this.incomesService.update(+id, updateIncomeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove an income' })
  @ApiParam({ name: 'id', description: 'Income ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The income has been successfully deleted',
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
  @ApiResponse({ status: 404, description: 'Income not found' })
  remove(@Param('id') id: string) {
    return this.incomesService.remove(+id);
  }

  @Get('report/:userId/:year/:month')
  @ApiOperation({ summary: 'Get income report by category' })
  @ApiParam({ name: 'userId', description: 'User ID', type: 'number' })
  @ApiParam({ name: 'year', description: 'Year', type: 'number' })
  @ApiParam({ name: 'month', description: 'Month (1-12)', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Returns incomes grouped by category',
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
    return this.incomesService.getReportByCtegory(+year, +userId, +month);
  }
}
