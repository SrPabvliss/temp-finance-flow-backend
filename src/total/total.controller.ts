import { Controller, Get, Param } from '@nestjs/common';
import { TotalService } from './total.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

/**
 * Controller for financial balance operations
 *
 * @class
 * @description Manages HTTP requests related to financial balance calculations
 */
@ApiTags('Totals')
@Controller('total')
export class TotalController {
  constructor(private readonly totalService: TotalService) {}

  /**
   * Get the financial balance for a user in a specific month and year
   *
   * @param {string} userId - User ID
   * @param {string} year - Year
   * @param {string} month - Month (1-12)
   * @returns {Promise<{total: number, month: number, year: number}>} The balance information
   * @example
   * // Example usage with Fetch API
   * fetch('/api/total/1/2023/7') // Get July 2023 balance for user 1
   */
  @Get(':userId/:year/:month')
  @ApiOperation({
    summary: 'Get financial balance for a user in a specific month',
  })
  @ApiParam({ name: 'userId', description: 'User ID', type: 'number' })
  @ApiParam({ name: 'year', description: 'Year', type: 'number' })
  @ApiParam({ name: 'month', description: 'Month (1-12)', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Returns the total financial balance (income - expenses)',
    schema: {
      properties: {
        total: {
          type: 'number',
          description:
            'Balance amount (positive for savings, negative for deficit)',
        },
        month: { type: 'number', description: 'Month queried (1-12)' },
        year: { type: 'number', description: 'Year queried' },
      },
    },
  })
  getTotal(
    @Param('userId') userId: string,
    @Param('year') year: string,
    @Param('month') month: string,
  ) {
    return this.totalService.getTotal(+userId, +year, +month);
  }
}
