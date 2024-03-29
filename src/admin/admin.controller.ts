import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('category')
  async createCategory(@Body('name') name: string) {
    const createdCategory = await this.adminService.createCategory(name);
    return { category: createdCategory };
  }

  @Post('product')
  async createProduct(@Body() createProductDto: CreateProductDto) { 
    const createdProduct = await this.adminService.createProduct(createProductDto);
    return { product: createdProduct };
  }  
}

