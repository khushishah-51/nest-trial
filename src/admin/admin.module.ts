import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
    //imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    providers: [AdminService],
    controllers: [AdminController],
})
export class AdminModule {}
