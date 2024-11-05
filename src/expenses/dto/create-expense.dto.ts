import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNumber()
  @IsNotEmpty()
  typeId: number;

  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsOptional()
  observation?: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
