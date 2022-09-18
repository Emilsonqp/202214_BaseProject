import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreEntity } from './store.entity';

@Module({
  providers: [StoreService],
  imports: [TypeOrmModule.forFeature([StoreEntity])],
  controllers: [StoreController],
})
export class StoreModule {}
