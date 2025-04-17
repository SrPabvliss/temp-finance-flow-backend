import { PartialType } from '@nestjs/swagger';
import { CreateIncomeDto } from './create-income.dto';

/**
 * DTO for updating incomes
 *
 * @class
 * @description Defines the data structure for updating an existing income
 * @extends {PartialType<CreateIncomeDto>}
 */
export class UpdateIncomeDto extends PartialType(CreateIncomeDto) {}
