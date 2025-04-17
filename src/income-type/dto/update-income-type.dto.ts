import { PartialType } from '@nestjs/swagger';
import { CreateIncomeTypeDto } from './create-income-type.dto';

/**
 * DTO for updating income types
 *
 * @class
 * @description Defines the data structure for updating an existing income type
 * @extends {PartialType<CreateIncomeTypeDto>}
 */
export class UpdateIncomeTypeDto extends PartialType(CreateIncomeTypeDto) {}
