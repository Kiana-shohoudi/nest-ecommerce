import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Category } from 'src/categories/categories.entity';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) { }

    findAll() {
        return this.productRepository.find()
    }

    async create(productDto: CreateProductDto): Promise<Product> {
        const category = await this.categoryRepository.findOne({
            where: { id: productDto.categoryId },
        });

        if (!category) {
            throw new Error('Category not found');
        }

        const product = this.productRepository.create({
            ...productDto,
            category,
        });

        return this.productRepository.save(product);
    }
}
