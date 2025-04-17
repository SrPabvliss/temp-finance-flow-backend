import { Injectable } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import { AppError } from 'src/shared/app.error';
import { Errors } from 'src/shared/errors';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}
  async login(authLoginDto: AuthLoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: authLoginDto.email },
    });

    if (!user) {
      throw new AppError('User not found', Errors.NOT_FOUND);
    }

    if (user.password !== authLoginDto.password) {
      throw new AppError('Invalid password', Errors.BAD_REQUEST);
    }

    const payload = { email: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
      user: user,
    };
  }

  async signUp(signUpDto: SignUpDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: signUpDto.email },
    });

    if (existingUser) {
      throw new AppError('User already exists', Errors.CONFLICT);
    }

    const user = await this.prisma.user.create({
      data: signUpDto,
    });

    const payload = { email: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
      user: user,
    };
  }
}
