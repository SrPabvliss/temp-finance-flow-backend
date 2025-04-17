import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { SignUpDto } from './dto/signup.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

/**
 * Controller for authentication operations
 *
 * @class
 * @description Manages authentication endpoints such as login and registration
 */
@ApiTags('Authentication')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login endpoint
   *
   * @param {AuthLoginDto} authLoginDto - User login data
   * @returns {Promise<{token: string, user: any}>} JWT token and user data
   * @example
   * // Example usage with Fetch API
   * fetch('/api/auth/login', {
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: JSON.stringify({ email: "user@example.com", password: "password123" })
   * })
   */
  @Post('/login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: AuthLoginDto })
  @ApiResponse({
    status: 200,
    description: 'Returns authentication token and user information',
    schema: {
      properties: {
        token: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            email: { type: 'string' },
            name: { type: 'string' },
            lastname: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid credentials',
  })
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  /**
   * User registration endpoint
   *
   * @param {SignUpDto} signUpDto - User registration data
   * @returns {Promise<{token: string, user: any}>} JWT token and created user data
   * @example
   * // Example usage with Fetch API
   * fetch('/api/auth/signup', {
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: JSON.stringify({
   *     email: "user@example.com",
   *     password: "password123",
   *     name: "First",
   *     lastname: "Last"
   *   })
   * })
   */
  @Post('/signup')
  @ApiOperation({ summary: 'User registration' })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({
    status: 201,
    description: 'Returns authentication token and newly created user',
    schema: {
      properties: {
        token: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            email: { type: 'string' },
            name: { type: 'string' },
            lastname: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 409, description: 'Conflict - User already exists' })
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
