import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

/**
 * JWT Strategy for authentication
 *
 * @class
 * @description Implements Passport JWT strategy to validate authentication tokens
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * JWT Strategy constructor
   *
   * @param {ConfigService} configService - Configuration service to get environment variables
   */
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  /**
   * Validates the JWT token payload
   *
   * @param {any} payload - Decoded JWT token payload
   * @returns {Promise<{userId: number, username: string}>} Authenticated user data
   */
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
