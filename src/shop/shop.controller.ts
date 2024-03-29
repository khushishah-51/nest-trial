// product.controller.ts
import { Controller, Get, Post, Body, Param, Query, Req } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ProductDTO } from './dto/product.dto';
import { LikedProductDTO } from './dto/liked-product.dto';

@Controller('products')
export class ShopController {
  constructor(private readonly productService: ShopService) {}

  @Get()
  async findAll(): Promise<ProductDTO[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductDTO> {
    return this.productService.findOne(id);
  }

  // @Post(':id/like')
  // async likeProduct(@Param('id') id: string, @Req() req): Promise<void> {
  //   const userId = req.cookies['userId']; // Retrieve userId from cookies
  //   return this.productService.likeProduct(id, userId);
  // }
  @Post(':id/like')
  async likeProduct(@Param('id') id: string, @Req() req): Promise<void> {
    if (req.cookies && req.cookies['userId']) {
      const userId = req.cookies['userId']; // Retrieve userId from cookies
      return this.productService.likeProduct(id, userId);
    } else {
      // Handle the case when 'userId' cookie is not present
      throw new Error("User ID cookie not found");
    }
  }
  

  @Get('liked')
  async findLikedProducts(@Req() req): Promise<ProductDTO[]> {
    const userId = req.cookies['userId']; // Retrieve userId from cookies
    return this.productService.findLikedProducts(userId);
  }
}
