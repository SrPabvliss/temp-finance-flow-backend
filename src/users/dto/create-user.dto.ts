import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for creating users
 *
 * @class
 * @description Defines the data structure for creating a new user
 */
export class CreateUserDto {
  /**
   * User email address
   * @example user@example.com
   */
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  /**
   * User first name
   * @example John
   */
  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  @IsNotEmpty()
  name: string;

  /**
   * User last name
   * @example Doe
   */
  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  @IsNotEmpty()
  lastname: string;

  /**
   * User password
   * @example password123
   */
  @ApiProperty({
    description: 'User password',
    example: 'password123',
  })
  @IsNotEmpty()
  password: string;
}
