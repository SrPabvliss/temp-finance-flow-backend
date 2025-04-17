import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for creating income types
 *
 * @class
 * @description Defines the data structure for creating a new income type
 */
export class CreateIncomeTypeDto {
  /**
   * Name of the income type
   * @example "Salary"
   */
  @ApiProperty({
    description: 'Name of the income type',
    example: 'Salary',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * Flag indicating if this income type is available to all users
   * @example false
   */
  @ApiProperty({
    description: 'Whether this income type is available to all users',
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  isGlobal: boolean;

  /**
   * ID of the user who created this income type
   * @example 1
   */
  @ApiProperty({
    description: 'ID of the user who created this income type',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
