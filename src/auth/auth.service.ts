import { Injectable } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import { AppError } from 'src/shared/app.error';
import { Errors } from 'src/shared/errors';
import * as bcrypt from 'bcrypt';

/**
 * Authentication service for users
 *
 * @class
 * @description Handles authentication operations such as login and registration
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Login with user credentials
   *
   * @param {AuthLoginDto} authLoginDto - User login data
   * @returns {Promise<{token: string, user: any}>} JWT token and user data
   * @throws {AppError} If user doesn't exist or password is invalid
   * @example
   * // Usage example
   * this.authService.login({ email: "example@test.com", password: "password123" })
   */
  async login(authLoginDto: AuthLoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: authLoginDto.email },
    });

    if (!user) {
      throw new AppError('User not found', Errors.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(
      authLoginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new AppError('Invalid password', Errors.BAD_REQUEST);
    }

    const payload = { email: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
      user: user,
    };
  }

  /**
   * Register a new user
   *
   * @param {SignUpDto} signUpDto - User registration data
   * @returns {Promise<{token: string, user: any}>} JWT token and created user data
   * @throws {AppError} If user already exists
   * @example
   * // Usage example
   * this.authService.signUp({
   *   email: "example@test.com",
   *   password: "password123",
   *   name: "First",
   *   lastname: "Last"
   * })
   */
  async signUp(signUpDto: SignUpDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: signUpDto.email },
    });

    if (existingUser) {
      throw new AppError('User already exists', Errors.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...signUpDto,
        password: hashedPassword,
      },
    });

    const payload = { email: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
      user: user,
    };
  }
}
