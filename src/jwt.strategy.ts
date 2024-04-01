// jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTService } from './jwt.service'; 

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtService: JWTService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_secret_key', // Change this to your actual secret key
    });
  }

  async validate(payload: any) {
    if (!payload.userId) {
      throw new UnauthorizedException();
    }
    return { userId: payload.userId }; // Adjust this according to your user schema
  }
}


