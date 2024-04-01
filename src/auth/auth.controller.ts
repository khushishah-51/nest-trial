// auth.controller.ts

import { Controller, Post, Body, Session,  UseGuards  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO, LoginDTO, AdminDTO } from './auth.dto';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService, 
    private readonly jwtService: JwtService,
    ) {}

  @Post('signup')
  async signup(@Body() userDTO: UserDTO) {
    return await this.authService.signup(userDTO);
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const user = await this.authService.login(loginDTO);
    const payload = { username: user.name, sub: user._id }; // Customize payload as needed
    const token = this.jwtService.sign(payload); // Generate JWT token
    return { token }; // Return token to the client};
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

