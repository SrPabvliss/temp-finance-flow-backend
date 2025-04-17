import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * DTO for creating incomes
 *
 * @class
 * @description Defines the data structure for creating a new income
 */
export class CreateIncomeDto {
  /**
   * Description of the income
   * @example "Monthly Salary"
   */
  @ApiProperty({
    description: 'Description of the income',
    example: 'Monthly Salary',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  /**
   * Monetary value of the income
   * @example 3000
   */
  @ApiProperty({
    description: 'Amount of the income',
    example: 3000,
  })
  @IsNotEmpty()
  @IsNumber()
  value: number;

  /**
   * ID of the income type category
   * @example 1
   */
  @ApiProperty({
    description: 'ID of the income type',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  typeId: number;

  /**
   * Payment status of the income (true = received, false = pending)
   * @example true
   */
  @ApiProperty({
    description: 'Status of the income (received or pending)',
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  /**
   * Date when the income was received
   * @example "2023-01-15T00:00:00.000Z"
   */
  @ApiProperty({
    description: 'Date of the income',
    example: '2023-01-15T00:00:00.000Z',
  })
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  /**
   * Optional additional notes about the income
   * @example "Salary for January 2023"
   */
  @ApiProperty({
    description: 'Additional notes or comments about the income',
    required: false,
    example: 'Salary for January 2023',
  })
  @IsOptional()
  observation?: string;

  /**
   * ID of the user who created the income
   * @example 1
   */
  @ApiProperty({
    description: 'ID of the user who created the income',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
