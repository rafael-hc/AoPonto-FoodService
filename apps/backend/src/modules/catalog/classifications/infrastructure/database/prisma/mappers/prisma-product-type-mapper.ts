import type { ProductType as PrismaProductType } from '@prisma/client'
import { ProductType } from '@/catalog/classifications/domain/entities/product-type'

export const PrismaProductTypeMapper = {
  toDomain(raw: PrismaProductType): ProductType {
    return new ProductType({
      id: raw.id,
      description: raw.description,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    })
  },

  toPrisma(productType: ProductType): PrismaProductType {
    return {
      id: productType.id,
      description: productType.description,
      createdAt: productType.createdAt ?? new Date(),
      updatedAt: productType.updatedAt ?? new Date()
    } as PrismaProductType
  }
}
