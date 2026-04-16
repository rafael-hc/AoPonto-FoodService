import type { Prisma, Product as PrismaProduct } from '@prisma/client'
import { Product } from '@/catalog/products/domain/entities/product'
import { TaxMetadata } from '@/catalog/products/domain/entities/value-objects/product-tax-metadata'

export const PrismaProductMapper = {
  toDomain(raw: PrismaProduct): Product {
    return new Product({
      id: raw.id,
      code: raw.code,
      name: raw.name,
      description: raw.description,
      price: Number(raw.price),
      costPrice: raw.costPrice ? Number(raw.costPrice) : null,
      minStock: raw.minStock,
      currentStock: raw.currentStock,
      barcode: raw.barcode,
      methodOfPreparation: raw.methodOfPreparation,
      active: raw.active,
      discontinued: raw.discontinued,
      taxMetadata: TaxMetadata.create({
        ncm: raw.ncm,
        cest: raw.cest,
        barcode: raw.barcode,
        productionIndicatorId: raw.productionIndicatorId,
        cfopId: raw.cfopId,
        originId: raw.originId,
        icmsModalityId: raw.icmsModalityId,
        pisTaxSituationId: raw.pisTaxSituationId,
        cofinsTaxSituationId: raw.cofinsTaxSituationId,
        taxConfigurationId: raw.taxConfigurationId,
        isServiceTaxExempt: raw.isServiceTaxExempt
      }),
      labelId: raw.labelId as string,
      kitchenId: raw.kitchenId,
      unitId: raw.unitId as string,
      productTypeId: raw.productTypeId as string,
      isKitchenItem: raw.isKitchenItem,
      useMobileComanda: raw.useMobileComanda,
      useDigitalMenu: raw.useDigitalMenu,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt
    })
  },

  toPrisma(product: Product): Prisma.ProductUncheckedCreateInput {
    return {
      id: product.id,
      ...(product.code && { code: product.code }),
      name: product.name,
      description: product.description,
      price: product.price,
      costPrice: product.costPrice,
      minStock: product.minStock,
      currentStock: product.currentStock,
      methodOfPreparation: product.methodOfPreparation,
      active: product.active,
      discontinued: product.discontinued,
      ncm: product.ncm,
      cest: product.cest,
      barcode: product.barcode,
      labelId: product.labelId,
      kitchenId: product.kitchenId,
      unitId: product.unitId,
      productTypeId: product.productTypeId,
      productionIndicatorId: product.productionIndicatorId,
      cfopId: product.cfopId,
      originId: product.originId,
      icmsModalityId: product.icmsModalityId,
      pisTaxSituationId: product.pisTaxSituationId,
      cofinsTaxSituationId: product.cofinsTaxSituationId,
      taxConfigurationId: product.taxConfigurationId,
      isServiceTaxExempt: product.isServiceTaxExempt,
      isKitchenItem: product.isKitchenItem,
      useMobileComanda: product.useMobileComanda,
      useDigitalMenu: product.useDigitalMenu,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      deletedAt: product.deletedAt
    }
  }
}
