import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

/**
 * DTO for updating users
 *
 * @class
 * @description Defines the data structure for updating an existing user
 * @extends {PartialType<CreateUserDto>}
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}
