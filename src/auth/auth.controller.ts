// auth.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO, LoginDTO, AdminDTO } from './auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() userDTO: UserDTO) {
    return await this.authService.signup(userDTO);
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    return await this.authService.login(loginDTO);
  }

  @Post('admin')
  async admin(@Body() adminDTO: AdminDTO) {
    return await this.authService.admin(adminDTO);
  }
}

