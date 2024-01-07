import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '@nestjs/config';
import { UsersRepository } from 'src/modules/users/repository/users.repository';
import { JwtPaylod } from '../types/auth';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UsersRepository, conf: ConfigService) {
    // calling Base Constructor
    super({
      secretOrKey: conf.get<string>('JWT_SECRET_TOKEN'),
      jwtFromRequest:  ExtractJwt.fromExtractors([
        req => {
          let token = null;
          if (req && req.cookies) {
            token = req.cookies['token'];
          }
          return token;
        },
      ]),
    });
  }

  // Override Validation fn
  async validate(payload: JwtPaylod & { iat: number }) {
    // Extract email from JWT payload
    const { email, iat } = payload;

    // Get user based on it's email
    const user = await this.userRepository.findByEmail(email);

    // check if user exists throw UnAuthorized if it not exists
    if (!user) throw new UnauthorizedException();

    // Add user To request object
    return user;
  }
}
