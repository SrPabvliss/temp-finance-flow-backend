import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for user registration
 *
 * @class
 * @description Defines the data structure for creating a new user
 */
export class SignUpDto {
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
    minLength: 6,
  })
  @IsNotEmpty()
  password: string;
}
