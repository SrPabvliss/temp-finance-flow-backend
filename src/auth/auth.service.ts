import { Injectable } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
  async login(authLoginDto: AuthLoginDto) {
    const user = await this.userService.getUserByEmail(authLoginDto.email);

    if (
      !this.userService.comparePassword(authLoginDto.password, user.password)
    ) {
      throw new Error('Invalid password');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
