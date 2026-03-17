import type { ProductPersonalized as PrismaProductPersonalized } from '@prisma/client'
import { ProductPersonalized } from '@/catalog/domain/entities/product-personalized'

export const PrismaProductPersonalizedMapper = {
  toDomain(raw: PrismaProductPersonalized): ProductPersonalized {
    return new ProductPersonalized({
      id: raw.id,
      code: raw.code,
      description: raw.description,
      externalId: raw.externalId,
      versionReg: raw.versionReg,
      versionSync: raw.versionSync,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt
    })
  },

  toPrisma(
    productPersonalized: ProductPersonalized
  ): PrismaProductPersonalized {
    return {
      id: productPersonalized.id,
      code: productPersonalized.code,
      description: productPersonalized.description,
      externalId: productPersonalized.externalId,
      versionReg: productPersonalized.versionReg ?? null,
      versionSync: productPersonalized.versionSync ?? null,
      createdAt: productPersonalized.createdAt,
      updatedAt: productPersonalized.updatedAt,
      deletedAt: productPersonalized.deletedAt ?? null
    }
  }
}
