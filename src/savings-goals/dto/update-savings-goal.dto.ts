import { PartialType } from '@nestjs/swagger';
import { CreateSavingsGoalDto } from './create-savings-goal.dto';

/**
 * DTO for updating savings goals
 *
 * @class
 * @description Defines the data structure for updating an existing savings goal
 * @extends {PartialType<CreateSavingsGoalDto>}
 */
export class UpdateSavingsGoalDto extends PartialType(CreateSavingsGoalDto) {}
