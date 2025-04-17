import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateExpenseDto {
  @ApiProperty({
    description: 'Description of the expense',
    example: 'Groceries',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Amount of the expense',
    example: 100.5,
  })
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @ApiProperty({
    description: 'ID of the expense type',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  typeId: number;

  @ApiProperty({
    description: 'Status of the expense (paid or pending)',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  @ApiProperty({
    description: 'Date of the expense',
    example: '2023-01-15T00:00:00.000Z',
  })
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  @ApiProperty({
    description: 'Additional notes or comments about the expense',
    required: false,
    example: 'Weekly grocery shopping',
  })
  @IsString()
  @IsOptional()
  observation?: string;

  @ApiProperty({
    description: 'ID of the user who created the expense',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
