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

  @IsNumber()
  @IsNotEmpty()
  typeId: number;

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
