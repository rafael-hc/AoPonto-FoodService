import type { ProductDetail as PrismaProductDetail } from '@prisma/client'
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
      salePrice: productDetail.salePrice as any, // Decimal handle
      costPrice: (productDetail.costPrice as any) ?? null,
      currentStock: (productDetail.currentStock as any) ?? null,
      minStock: (productDetail.minStock as any) ?? null,
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
