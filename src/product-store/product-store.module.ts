/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../product/product.entity';
import { StoreEntity } from '../store/store.entity';
import { ProductStoreService } from './product-store.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, StoreEntity])],
  providers: [ProductStoreService]
})
export class ProductStoreModule {}
