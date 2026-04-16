import type { ProductSize as PrismaProductSize } from '@prisma/client'
import { ProductSize } from '@/catalog/products/domain/entities/product-size'

export const PrismaProductSizeMapper = {
  toDomain(raw: PrismaProductSize): ProductSize {
    return new ProductSize({
      id: raw.id,
      code: raw.code,
      productPersonalizedId: raw.productPersonalizedId,
      description: raw.description,
      initials: raw.initials,
      maxParts: raw.maxParts,
      externalId: raw.externalId,
      versionReg: raw.versionReg,
      versionSync: raw.versionSync,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt
    })
  },

  toPrisma(productSize: ProductSize): PrismaProductSize {
    return {
      id: productSize.id,
      code: productSize.code,
      productPersonalizedId: productSize.productPersonalizedId,
      description: productSize.description,
      initials: productSize.initials,
      maxParts: productSize.maxParts,
      externalId: productSize.externalId,
      versionReg: productSize.versionReg ?? null,
      versionSync: productSize.versionSync ?? null,
      createdAt: productSize.createdAt,
      updatedAt: productSize.updatedAt,
      deletedAt: productSize.deletedAt ?? null
    }
  }
}
