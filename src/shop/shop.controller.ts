// product.controller.ts
import { Controller, Get, Post, Body, Param, Query, Req,  Headers, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { ShopService } from './shop.service';
import { ProductDTO } from './dto/product.dto';
import * as jwt from 'jsonwebtoken';
import { LikedProductDTO } from './dto/liked-product.dto';
import { CLIENT_RENEG_LIMIT } from 'tls';

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
//   @Post(':id/like')
//   async likeProduct(@Param('id') id: string, @Req() req): Promise<void> {
//     console.log("hi")
//     console.log(req.cookies['userId'])
//     if (req.cookies && req.cookies['userId']) {
//       const userId = req.cookies['userId']; // Retrieve userId from cookies
//       return this.productService.likeProduct(id, userId);
//     } else {
//       // Handle the case when 'userId' cookie is not present
//       throw new Error("User ID cookie not found");
//     }
//   }
  
//   @Get('liked')
//   async findLikedProducts(@Req() req): Promise<ProductDTO[]> {
//     const userId = req.cookies['userId']; // Retrieve userId from cookies
//     return this.productService.findLikedProducts(userId);
//   }
// }
//jwt
// @Post(':id/like')
// @UseGuards(JwtAuthGuard) // Use JWTAuthGuard
// async likeProduct(@Param('id') id: string, @Req() req): Promise<void> {
//   const userId = req.user.userId; // Extract userId from request user
//   return this.productService.likeProduct(id, userId);
// }

// @Get('liked')
// @UseGuards(JwtAuthGuard) // Use JWTAuthGuard
// async findLikedProducts(@Req() req): Promise<ProductDTO[]> {
//   const userId = req.user.userId; // Extract userId from request user
//   return this.productService.findLikedProducts(userId);
// }
@Post(':id/like')
@UseGuards(JwtAuthGuard) // Protect this route with JWT authentication
async likeProduct(@Param('id') id: string, @Req() req): Promise<void> {
  const userId = req.user.userId; // Extract userId from JWT payload
  return this.productService.likeProduct(id, userId);
}

@Get('liked')
@UseGuards(JwtAuthGuard) // Protect this route with JWT authentication
async findLikedProducts(@Req() req): Promise<ProductDTO[]> {
  const userId = req.user.userId; // Extract userId from JWT payload
  return this.productService.findLikedProducts(userId);
}
}

