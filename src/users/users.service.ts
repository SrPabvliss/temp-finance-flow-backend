import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppError } from 'src/shared/app.error';
import { Errors } from 'src/shared/errors';

/**
 * Service for managing users
 *
 * @class
 * @description Handles operations related to users like creation, retrieval and update
 */
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new user
   *
   * @param {CreateUserDto} createUserDto - Data for creating a new user
   * @returns {Promise<User>} The created user
   * @throws {AppError} If the email already exists
   * @example
   * // Usage example
   * this.usersService.create({
   *   email: 'user@example.com',
   *   name: 'John',
   *   lastname: 'Doe',
   *   password: 'password123'
   * })
   */
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new AppError('Email already exists', Errors.CONFLICT);
    }
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  /**
   * Find a user by ID
   *
   * @param {number} id - ID of the user to find
   * @returns {Promise<User>} The user
   * @throws {AppError} If the user is not found
   * @example
   * // Usage example
   * this.usersService.findOne(1)
   */
  async findOne(id: number) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new AppError('User not found', Errors.NOT_FOUND);
    }
    return existingUser;
  }

  /**
   * Update a user
   *
   * @param {number} id - ID of the user to update
   * @param {UpdateUserDto} updateUserDto - Data for updating the user
   * @returns {Promise<User>} The updated user
   * @throws {AppError} If the user is not found
   * @example
   * // Usage example
   * this.usersService.update(1, { name: 'John Updated' })
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }
}
