/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { StoreDto } from 'src/store/store.dto';
import { StoreEntity } from 'src/store/store.entity';
import { ProductStoreService } from './product-store.service';

@Controller('products')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProductStoreController {
    constructor(private readonly ProductStoreService: ProductStoreService) { }

    @Post(':productId/stores/:storeId')
    async addStoreToProduct(@Param('productId') productId: string, @Param('storeId') storeId: string) {
        return await this.ProductStoreService.addStoreToProduct(productId, storeId);
    }

    @Get(':productId/stores/:storeId')
    async findStoreFromProduct(@Param('productId') productId: string, @Param('storeId') storeId: string) {
        return await this.ProductStoreService.findStoreFromProduct(productId, storeId);
    }

    @Get(':productId/stores')
    async findStoresFromProduct(@Param('productId') productId: string) {
        return await this.ProductStoreService.findStoresFromProduct(productId);
    }

    @Put(':productId/stores')
    async updateStoresFromProduct(@Param('productId') productId: string, @Body() StoreDto: StoreDto[]) {
        const stores = plainToInstance(StoreEntity, StoreDto)
        return await this.ProductStoreService.updateStoresFromProduct(productId, stores);
    }

    @Delete(':productId/stores/:storeId')
    @HttpCode(204)
    async deleteStoreFromProduct(@Param('productId') productId: string, @Param('storeId') storeId: string) {
        return await this.ProductStoreService.deleteStoreFromProduct(productId, storeId);
    }
}
