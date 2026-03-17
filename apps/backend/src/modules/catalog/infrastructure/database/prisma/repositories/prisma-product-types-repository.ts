import { Injectable } from '@nestjs/common'
import { ProductType } from '@/catalog/domain/entities/product-type'
import { ProductTypesRepository } from '@/catalog/domain/repositories/product-types-repository'
import { PrismaService } from '@/shared/database/prisma/prisma.service'
import { PrismaProductTypeMapper } from '../mappers/prisma-product-type-mapper'

@Injectable()
export class PrismaProductTypesRepository implements ProductTypesRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<ProductType | null> {
    const productType = await this.prisma.productType.findUnique({
      where: { id }
    })

    if (!productType) return null

    return PrismaProductTypeMapper.toDomain(productType)
  }

  async findMany(): Promise<ProductType[]> {
    const productTypes = await this.prisma.productType.findMany()

    return productTypes.map(PrismaProductTypeMapper.toDomain)
  }

  async create(productType: ProductType): Promise<void> {
    const data = PrismaProductTypeMapper.toPrisma(productType)

    await this.prisma.productType.create({
      data
    })
  }

  async save(productType: ProductType): Promise<void> {
    const data = PrismaProductTypeMapper.toPrisma(productType)

    await this.prisma.productType.update({
      where: { id: productType.id },
      data
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.productType.delete({
      where: { id }
    })
  }
}
