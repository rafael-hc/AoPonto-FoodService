import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/shared/database/prisma/prisma.service'
import { Product } from '@/catalog/domain/entities/product'
import { ProductsRepository } from '@/catalog/domain/repositories/products-repository'
import { PrismaProductMapper } from '../mappers/prisma-product-mapper'

@Injectable()
export class PrismaProductsRepository implements ProductsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id }
    })

    if (!product) return null

    return PrismaProductMapper.toDomain(product)
  }

  async findByCode(code: number): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { code }
    })

    if (!product) return null

    return PrismaProductMapper.toDomain(product)
  }

  async findMany(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: { deletedAt: null }
    })

    return products.map(PrismaProductMapper.toDomain)
  }

  async create(product: Product): Promise<void> {
    const data = PrismaProductMapper.toPrisma(product)

    await this.prisma.product.create({
      data
    })
  }

  async save(product: Product): Promise<void> {
    const data = PrismaProductMapper.toPrisma(product)

    await this.prisma.product.update({
      where: { id: product.id },
      data
    })
  }

  async delete(product: Product): Promise<void> {
    await this.prisma.product.update({
      where: { id: product.id },
      data: { deletedAt: new Date() }
    })
  }
}
