/* eslint-disable prettier/prettier */
import { ProductEntity } from '../product/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StoreEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    city:string

    @Column()
    addres:string

    @ManyToMany(() => ProductEntity, product => product.stores)
    products: ProductEntity[];
}
