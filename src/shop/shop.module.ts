import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';

@Module({
    //imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    providers: [ShopService],
    controllers: [ShopController],
})
export class ShopModule {}
