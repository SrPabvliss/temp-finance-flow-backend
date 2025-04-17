import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for creating expense types
 *
 * @class
 * @description Defines the data structure for creating a new expense type
 */
export class CreateExpenseTypeDto {
  /**
   * Name of the expense type
   * @example "Food"
   */
  @ApiProperty({
    description: 'Name of the expense type',
    example: 'Food',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * Flag indicating if this expense type is available to all users
   * @example false
   */
  @ApiProperty({
    description: 'Whether this expense type is available to all users',
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  isGlobal: boolean;

  /**
   * ID of the user who created this expense type
   * @example 1
   */
  @ApiProperty({
    description: 'ID of the user who created this expense type',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
