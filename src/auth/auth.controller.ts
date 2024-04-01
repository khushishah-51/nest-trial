// auth.controller.ts

import { Controller, Post, Body, Session,  UseGuards  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
  async login(@Body() loginDTO: LoginDTO): Promise<{ access_token: string }>  {
    const token = await this.authService.login(loginDTO);
    return { access_token: token };
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

