import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  providers: [ProductService],
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
})
export class ProductModule {}
