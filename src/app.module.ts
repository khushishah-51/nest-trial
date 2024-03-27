import { Module, NestModule, MiddlewareConsumer  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { ShopModule } from './shop/shop.module';
import * as session from 'express-session';
import { isAdmin } from './middleware/isAdmin.middleware';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/Ecommerce'), AuthModule, AdminModule, ShopModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(session({ secret: 'secret', resave: true, saveUninitialized: true })).forRoutes('*');
  }
}