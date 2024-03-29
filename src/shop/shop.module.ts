import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { LikedProductSchema } from './schemas/liked-product.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
          { name: 'Product', schema: ProductSchema },
          { name: 'LikedProduct', schema: LikedProductSchema }, // Add LikedProductSchema here
        ])
      ],    
    providers: [ShopService],
    controllers: [ShopController],
})
export class ShopModule {}
