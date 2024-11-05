import { Controller, Get, Param } from '@nestjs/common';
import { TotalService } from './total.service';

@Controller('total')
export class TotalController {
  constructor(private readonly totalService: TotalService) {}

  @Get(':userId/:year/:month')
  getTotal(
    @Param('userId') userId: string,
    @Param('year') year: string,
    @Param('month') month: string,
  ) {
    return this.totalService.getTotal(+userId, +year, +month);
  }
}
