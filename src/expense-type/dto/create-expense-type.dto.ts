import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseTypeDto {
  @ApiProperty({
    description: 'Name of the expense type',
    example: 'Food',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Whether this expense type is available to all users',
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  isGlobal: boolean;

  @ApiProperty({
    description: 'ID of the user who created this expense type',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
