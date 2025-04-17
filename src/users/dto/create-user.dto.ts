import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
  })
  @IsNotEmpty()
  password: string;
}
