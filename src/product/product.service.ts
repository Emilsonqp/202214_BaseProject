/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    BusinessError,
    BusinessLogicException,
} from '../shared/errors/business-errors';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
    ) { }

    async findAll(): Promise<ProductEntity[]> {
        return await this.productRepository.find({ relations: ["stores"] });
    }

    async findOne(id: string): Promise<ProductEntity> {
        const product: ProductEntity = await this.productRepository.findOne({
            where: { id: `${id}` },
            relations: ['stores'],
        });
        if (!product)
            throw new BusinessLogicException(
                'The product with the given id was not found',
                BusinessError.NOT_FOUND,
            );
        return product;
    }

    async create(product: ProductEntity): Promise<ProductEntity> {
        if (!['Perecedero', 'No perecedero'].includes(product.type))
            throw new BusinessLogicException(
                'The product type is invalid',
                BusinessError.PRECONDITION_FAILED,
            );
        return await this.productRepository.save(product);
    }

    async update(id: string, product: ProductEntity): Promise<ProductEntity> {
        const persistedProduct: ProductEntity =
            await this.productRepository.findOne({
                where: { id: `${id}` },
            });
        if (!persistedProduct)
            throw new BusinessLogicException(
                'The product with the given id was not found',
                BusinessError.NOT_FOUND,
            );
        if (!['Perecedero', 'No perecedero'].includes(product.type))
            throw new BusinessLogicException(
                'The product type is invalid',
                BusinessError.PRECONDITION_FAILED,
            );
        product.id = id;
        return await this.productRepository.save(product);
    }

    async delete(id: string) {
        const product: ProductEntity = await this.productRepository.findOne({
            where: { id: `${id}` },
        });
        if (!product)
            throw new BusinessLogicException(
                'The product with the given id was not found',
                BusinessError.NOT_FOUND,
            );

        await this.productRepository.remove(product);
    }
}
