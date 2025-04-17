import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for creating savings goals
 *
 * @class
 * @description Defines the data structure for creating a new savings goal
 */
export class CreateSavingsGoalDto {
  /**
   * Target amount to save
   * @example 1000
   */
  @ApiProperty({
    description: 'Goal amount to save',
    example: 1000,
  })
  @IsNotEmpty()
  @IsNumber()
  value: number;

  /**
   * Percentage of income to save
   * @example 20
   */
  @ApiProperty({
    description: 'Percentage of income to save',
    example: 20,
  })
  @IsNotEmpty()
  @IsNumber()
  percentaje: number;

  /**
   * Status of the goal (achieved or pending)
   * @example false
   */
  @ApiProperty({
    description: 'Status of the goal (achieved or pending)',
    example: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  /**
   * Date associated with the goal
   * @example "2023-01-15T00:00:00.000Z"
   */
  @ApiProperty({
    description: 'Date associated with the goal (typically the month)',
    example: '2023-01-15T00:00:00.000Z',
  })
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  /**
   * ID of the user who created this goal
   * @example 1
   */
  @ApiProperty({
    description: 'ID of the user who created this goal',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
