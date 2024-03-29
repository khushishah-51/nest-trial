// auth.controller.ts

import { Controller, Post, Body, Session } from '@nestjs/common';
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
  async admin(@Body() adminDTO: AdminDTO, @Session() session: Record<string, any>) {
    const result = await this.authService.admin(adminDTO);
      // Set session variables upon successful login
      session.username = adminDTO.name;
      session.isAdmin = true;  
    return result;
  }
}

