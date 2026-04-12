import { Prisma, ProductDetail as PrismaProductDetail } from '@prisma/client'
import { ProductDetail } from '@/catalog/domain/entities/product-detail'

export const PrismaProductDetailMapper = {
  toDomain(raw: PrismaProductDetail): ProductDetail {
    return new ProductDetail({
      id: raw.id,
      code: raw.code,
      productId: raw.productId,
      productSizeId: raw.productSizeId,
      salePrice: Number(raw.salePrice),
      costPrice: raw.costPrice ? Number(raw.costPrice) : null,
      currentStock: raw.currentStock ? Number(raw.currentStock) : null,
      minStock: raw.minStock ? Number(raw.minStock) : null,
      isStockControlled: raw.isStockControlled,
      barcode: raw.barcode,
      externalId: raw.externalId,
      showOnDesktop: raw.showOnDesktop,
      showOnMobile: raw.showOnMobile,
      showOnDigitalMenu: raw.showOnDigitalMenu,
      showOnDinoMenu: raw.showOnDinoMenu,
      showOnTotem: raw.showOnTotem,
      pausedAt: raw.pausedAt,
      versionReg: raw.versionReg,
      versionSync: raw.versionSync,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt
    })
  },

  toPrisma(productDetail: ProductDetail): PrismaProductDetail {
    return {
      id: productDetail.id,
      code: productDetail.code,
      productId: productDetail.productId,
      productSizeId: productDetail.productSizeId ?? null,
      salePrice: new Prisma.Decimal(productDetail.salePrice),
      costPrice: productDetail.costPrice
        ? new Prisma.Decimal(productDetail.costPrice)
        : null,
      currentStock: productDetail.currentStock
        ? new Prisma.Decimal(productDetail.currentStock)
        : null,
      minStock: productDetail.minStock
        ? new Prisma.Decimal(productDetail.minStock)
        : null,
      isStockControlled: productDetail.isStockControlled ?? false,
      barcode: productDetail.barcode ?? null,
      externalId: productDetail.externalId,
      showOnDesktop: productDetail.showOnDesktop ?? true,
      showOnMobile: productDetail.showOnMobile ?? true,
      showOnDigitalMenu: productDetail.showOnDigitalMenu ?? true,
      showOnDinoMenu: productDetail.showOnDinoMenu ?? true,
      showOnTotem: productDetail.showOnTotem ?? false,
      pausedAt: productDetail.pausedAt ?? null,
      versionReg: productDetail.versionReg ?? null,
      versionSync: productDetail.versionSync ?? null,
      createdAt: productDetail.createdAt,
      updatedAt: productDetail.updatedAt,
      deletedAt: productDetail.deletedAt ?? null
    }
  }
}
