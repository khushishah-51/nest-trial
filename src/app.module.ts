import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { ShopModule } from './shop/shop.module';
import * as session from 'express-session';
import { isAdmin } from './middleware/isAdmin.middleware';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/Ecommerce'), AuthModule, AdminModule, ShopModule,
   PassportModule.register({ defaultStrategy: 'jwt' }), 
  // JwtModule.register({
  //   secret: 'mysecret', 
  //   signOptions: { expiresIn: '1h' },
  // }), 
],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})

export class AppModule implements NestModule {
  configureSession(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAdmin)
      .forRoutes('/admin/*'); // Apply session middleware to routes starting with /admin/
  }

  configure(consumer: MiddlewareConsumer) {
    this.configureSession(consumer);
  }
}
