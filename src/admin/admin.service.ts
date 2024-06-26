import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interfaces/product.interface';
import { Category } from './interfaces/category.interface';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async createCategory(categoryName: string): Promise<Category> {
    const createdCategory = new this.categoryModel({ name: categoryName });
    return createdCategory.save();
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { title, image, categoryName } = createProductDto;
    const category = await this.categoryModel.findOne({ name: categoryName });
    if (!category) {
      throw new Error('Category not found');
    }

    const createdProduct = new this.productModel({ title, image, category });
    return createdProduct.save();
  }  
}



