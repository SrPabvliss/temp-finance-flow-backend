import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateIncomeDto {
  @ApiProperty({
    description: 'Description of the income',
    example: 'Monthly Salary',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Amount of the income',
    example: 3000,
  })
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @ApiProperty({
    description: 'ID of the income type',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  typeId: number;

  @ApiProperty({
    description: 'Status of the income (received or pending)',
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @ApiProperty({
    description: 'Date of the income',
    example: '2023-01-15T00:00:00.000Z',
  })
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  @ApiProperty({
    description: 'Additional notes or comments about the income',
    required: false,
    example: 'Salary for January 2023',
  })
  @IsOptional()
  observation?: string;

  @ApiProperty({
    description: 'ID of the user who created the income',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
