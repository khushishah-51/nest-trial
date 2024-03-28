import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('category')
  async createCategory(@Body('name') name: string) {
    const createdCategory = await this.adminService.createCategory(name);
    return { category: createdCategory };
  }

  @Post('product')
  async createProduct(
    @Body('title') title: string,
    @Body('categoryName') categoryName: string,
  ) {
    const createdProduct = await this.adminService.createProduct(title, categoryName);
    return { product: createdProduct };
  }
}

