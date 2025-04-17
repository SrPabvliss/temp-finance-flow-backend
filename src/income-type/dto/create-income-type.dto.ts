import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIncomeTypeDto {
  @ApiProperty({
    description: 'Name of the income type',
    example: 'Salary',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Whether this income type is available to all users',
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  isGlobal: boolean;

  @ApiProperty({
    description: 'ID of the user who created this income type',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
