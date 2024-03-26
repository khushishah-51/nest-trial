// auth.services.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/auth.interface';
import { UserDTO, LoginDTO, AdminDTO } from './auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async signup(userDTO: UserDTO): Promise<User> {
    const { name, password } = userDTO;

    const existingUser = await this.userModel.findOne({ name });
    if (existingUser) {
      throw new Error('User already exists! Please choose a different name.');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new this.userModel({ name, password: hashedPassword });
    return await newUser.save();
  }

  async login(loginDTO: LoginDTO): Promise<User> {
    const { name, password } = loginDTO;

    const user = await this.userModel.findOne({ name });
    if (!user) {
      throw new Error("Name doesn't exist. Check name or signup.");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      return user;
    } else {
      throw new Error('Wrong password!');
    }
  }

  async admin(adminDTO: AdminDTO): Promise<string> {
    const { name, password } = adminDTO;

    const user = await this.userModel.findOne({ name, isAdmin: true });

    if (!user) {
      throw new Error('Wrong details. Check details!');
    } else {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        return 'Successfully logged in as admin!';
      } else {
        throw new Error('Wrong details. Check details!');
      }
    }
  }
}
