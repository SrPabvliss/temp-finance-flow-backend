import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateIncomeDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @IsNotEmpty()
  date: Date;

  @IsOptional()
  observation?: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
