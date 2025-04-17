import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for user authentication
 *
 * @class
 * @description Defines the data structure for user login
 */
export class AuthLoginDto {
  /**
   * User email address
   * @example user@example.com
   */
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @MinLength(4)
  email: string;

  /**
   * User password
   * @example password123
   */
  @ApiProperty({
    description: 'User password',
    example: 'password123',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
