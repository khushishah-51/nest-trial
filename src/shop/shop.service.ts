// product.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interfaces/product.interface';
import { LikedProduct } from './interfaces/liked-product.interface';
import { ProductDTO } from './dto/product.dto';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('LikedProduct') private readonly likedProductModel: Model<LikedProduct>
  ) {}

  async findAll(): Promise<ProductDTO[]> {
    const products = await this.productModel.find().exec();
    return products.map(product => this.productToDTO(product));
  }

  async findOne(id: string): Promise<ProductDTO> {
    const product = await this.productModel.findById(id).exec();
    return this.productToDTO(product);
  }

  async likeProduct(productId: string, userId: string): Promise<void> {
    const existingLikedProduct = await this.likedProductModel.findOne({ productId, userId }).exec();
    console.log('shopservice')
    if (!existingLikedProduct) {
      console.log('shopservice')
      const likedProduct = new this.likedProductModel({ productId, userId });
      await likedProduct.save();
    }
  }

  async findLikedProducts(userId: string): Promise<ProductDTO[]> {
    const likedProducts = await this.likedProductModel.find({ userId }).exec();
    const productIds = likedProducts.map(likedProduct => likedProduct.productId);
    const products = await this.productModel.find({ _id: { $in: productIds } }).exec();
    return products.map(product => this.productToDTO(product));
  }

  private productToDTO(product: Product, userId?: string): ProductDTO {
    const productDTO: ProductDTO = {
      title: product.title,
      image: product.image,
      category: product.category,
    };

    if (userId && product.likes && product.likes.includes(userId)) {
      productDTO.isLiked = true;
    } else {
      productDTO.isLiked = false;
    }
  
    return productDTO;
  }
}
