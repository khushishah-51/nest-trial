// product.controller.ts
import { Controller, Get, Post, Body, Param, Query, Req,  Headers, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { ShopService } from './shop.service';
import { ProductDTO } from './dto/product.dto';

@Controller('products')
export class ShopController {
  constructor(private readonly productService: ShopService) {}

  @Get('liked')
  @UseGuards(JwtAuthGuard) // Use JWTAuthGuard
  async findLikedProducts(@Req() req): Promise<ProductDTO[]> {
    const userId = req.user.userId; // Extract userId from request user
    return this.productService.findLikedProducts(userId);
  }

  @Get()
  async findAll(): Promise<ProductDTO[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductDTO> {
    return this.productService.findOne(id);
  }

@Post(':id/like')
@UseGuards(JwtAuthGuard) // Use JWTAuthGuard
async likeProduct(@Param('id') id: string, @Req() req): Promise<void> {
  console.log('shopcontroller')
  const userId = req.user.userId; // Extract userId from request user
  return this.productService.likeProduct(id, userId);
}



}

