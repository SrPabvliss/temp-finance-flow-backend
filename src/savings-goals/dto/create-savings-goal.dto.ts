import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSavingsGoalDto {
  @ApiProperty({
    description: 'Goal amount to save',
    example: 1000,
  })
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @ApiProperty({
    description: 'Percentage of income to save',
    example: 20,
  })
  @IsNotEmpty()
  @IsNumber()
  percentaje: number;

  @ApiProperty({
    description: 'Status of the goal (achieved or pending)',
    example: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @ApiProperty({
    description: 'Date associated with the goal (typically the month)',
    example: '2023-01-15T00:00:00.000Z',
  })
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  @ApiProperty({
    description: 'ID of the user who created this goal',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
