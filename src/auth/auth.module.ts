// auth.module.ts

import { Module, NestModule, MiddlewareConsumer  } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from './schemas/auth.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  JwtModule.register({
    secret: 'mysecret', 
    signOptions: { expiresIn: '1h' },
  }),
],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule{}
