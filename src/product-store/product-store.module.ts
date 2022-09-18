/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../product/product.entity';
import { StoreEntity } from '../store/store.entity';
import { ProductStoreService } from './product-store.service';
import { ProductStoreController } from './product-store.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, StoreEntity])],
  providers: [ProductStoreService],
  controllers: [ProductStoreController]
})
export class ProductStoreModule {}
