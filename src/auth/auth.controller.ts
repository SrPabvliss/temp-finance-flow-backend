import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { SignUpDto } from './dto/signup.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
