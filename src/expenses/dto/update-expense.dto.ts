import { PartialType } from '@nestjs/swagger';
import { CreateExpenseDto } from './create-expense.dto';

/**
 * DTO for updating expenses
 *
 * @class
 * @description Defines the data structure for updating an existing expense
 * @extends {PartialType<CreateExpenseDto>}
 */
export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {}
