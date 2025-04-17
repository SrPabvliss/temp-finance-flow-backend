import { PartialType } from '@nestjs/swagger';
import { CreateExpenseTypeDto } from './create-expense-type.dto';

/**
 * DTO for updating expense types
 *
 * @class
 * @description Defines the data structure for updating an existing expense type
 * @extends {PartialType<CreateExpenseTypeDto>}
 */
export class UpdateExpenseTypeDto extends PartialType(CreateExpenseTypeDto) {}
