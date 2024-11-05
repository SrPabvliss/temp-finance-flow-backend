import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateExpenseTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  isGlobal: boolean;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
