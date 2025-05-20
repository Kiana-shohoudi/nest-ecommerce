import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Category } from 'src/categories/categories.entity';

@Module({
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([Product , Category])],
  providers: [ProductsService]
})
export class ProductsModule {}
