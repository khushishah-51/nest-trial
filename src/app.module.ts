import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CookieParserMiddleware } from 'cookie-parser';
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
  configureSession(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAdmin)
      .forRoutes('/admin/*'); // Apply session middleware to routes starting with /admin/
  }

  configureCookieParser(consumer: MiddlewareConsumer) {
    consumer
      .apply(CookieParserMiddleware)
      .forRoutes('/products/*'); // Apply cookie-parser middleware to routes starting with /products/
  }

  configure(consumer: MiddlewareConsumer) {
    this.configureSession(consumer);
    this.configureCookieParser(consumer);
  }
}
