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
 * DTO for creating expenses
 *
 * @class
 * @description Defines the data structure for creating a new expense
 */
export class CreateExpenseDto {
  /**
   * Description of the expense
   * @example "Groceries"
   */
  @ApiProperty({
    description: 'Description of the expense',
    example: 'Groceries',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  /**
   * Monetary value of the expense
   * @example 100.5
   */
  @ApiProperty({
    description: 'Amount of the expense',
    example: 100.5,
  })
  @IsNotEmpty()
  @IsNumber()
  value: number;

  /**
   * ID of the expense type category
   * @example 1
   */
  @ApiProperty({
    description: 'ID of the expense type',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  typeId: number;

  /**
   * Payment status of the expense (true = paid, false = pending)
   * @example true
   */
  @ApiProperty({
    description: 'Status of the expense (paid or pending)',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  /**
   * Date when the expense occurred
   * @example "2023-01-15T00:00:00.000Z"
   */
  @ApiProperty({
    description: 'Date of the expense',
    example: '2023-01-15T00:00:00.000Z',
  })
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  /**
   * Optional additional notes about the expense
   * @example "Weekly grocery shopping"
   */
  @ApiProperty({
    description: 'Additional notes or comments about the expense',
    required: false,
    example: 'Weekly grocery shopping',
  })
  @IsString()
  @IsOptional()
  observation?: string;

  /**
   * ID of the user who created the expense
   * @example 1
   */
  @ApiProperty({
    description: 'ID of the user who created the expense',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
