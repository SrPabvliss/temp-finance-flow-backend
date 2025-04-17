import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created',
    schema: {
      properties: {
        id: { type: 'number' },
        email: { type: 'string' },
        name: { type: 'string' },
        lastname: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request - Validation error' })
  @ApiResponse({ status: 409, description: 'Conflict - Email already exists' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Returns the user',
    schema: {
      properties: {
        id: { type: 'number' },
        email: { type: 'string' },
        name: { type: 'string' },
        lastname: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', description: 'User ID', type: 'number' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated',
    schema: {
      properties: {
        id: { type: 'number' },
        email: { type: 'string' },
        name: { type: 'string' },
        lastname: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request - Validation error' })
  @ApiResponse({ status: 404, description: 'User not found' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
}
