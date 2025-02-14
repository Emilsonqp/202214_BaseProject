/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    BusinessError,
    BusinessLogicException,
} from '../shared/errors/business-errors';
import { StoreEntity } from './store.entity';

@Injectable()
export class StoreService {
    constructor(
        @InjectRepository(StoreEntity)
        private readonly storeRepository: Repository<StoreEntity>,
    ) { }

    async findAll(): Promise<StoreEntity[]> {
        return await this.storeRepository.find({ relations: ["products"] });
    }

    async findOne(id: string): Promise<StoreEntity> {
        const store: StoreEntity = await this.storeRepository.findOne({
            where: { id: `${id}` },
            relations: ['products'],
        });
        if (!store)
            throw new BusinessLogicException(
                'The store with the given id was not found',
                BusinessError.NOT_FOUND,
            );
        return store;
    }

    async create(store: StoreEntity): Promise<StoreEntity> {
        if (store.city.length != 3)
            throw new BusinessLogicException(
                'The store city is invalid',
                BusinessError.PRECONDITION_FAILED,
            );
        return await this.storeRepository.save(store);
    }

    async update(id: string, store: StoreEntity): Promise<StoreEntity> {
        const persistedStore: StoreEntity =
            await this.storeRepository.findOne({
                where: { id: `${id}` },
            });
        if (!persistedStore)
            throw new BusinessLogicException(
                'The store with the given id was not found',
                BusinessError.NOT_FOUND,
            );
        if (store.city.length != 3)
            throw new BusinessLogicException(
                'The store city is invalid',
                BusinessError.PRECONDITION_FAILED,
            );
        store.id = id;
        return await this.storeRepository.save(store);
    }

    async delete(id: string) {
        const store: StoreEntity = await this.storeRepository.findOne({
            where: { id: `${id}` },
        });
        if (!store)
            throw new BusinessLogicException(
                'The store with the given id was not found',
                BusinessError.NOT_FOUND,
            );

        await this.storeRepository.remove(store);
    }
}
