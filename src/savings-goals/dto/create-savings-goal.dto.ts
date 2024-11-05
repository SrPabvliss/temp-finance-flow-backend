import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSavingsGoalDto {
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsNumber()
  percentaje: number;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
