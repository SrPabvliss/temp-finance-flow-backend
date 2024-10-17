import { Injectable } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

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
      throw new Error('User not found');
    }

    if (user.password !== authLoginDto.password) {
      throw new Error('Invalid password');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
      user: user,
    };
  }
}
