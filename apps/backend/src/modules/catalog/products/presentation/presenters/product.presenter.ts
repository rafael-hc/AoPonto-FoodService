import { Product } from '@/catalog/products/domain/entities/product'

export const ProductPresenter = {
  toHTTP(product: Product) {
    return {
      id: product.id,
      code: product.code,
      name: product.name,
      description: product.description,
      methodOfPreparation: product.methodOfPreparation,
      price: product.price,
      costPrice: product.costPrice,
      minStock: product.minStock,
      currentStock: product.currentStock,
      active: product.active,
      discontinued: product.discontinued,
      // Relacionamentos
      labelId: product.labelId,
      unitId: product.unitId,
      kitchenId: product.kitchenId,
      productTypeId: product.productTypeId,
      // Flags de exibição
      isKitchenItem: product.isKitchenItem,
      useMobileComanda: product.useMobileComanda,
      useDigitalMenu: product.useDigitalMenu,
      barcode: product.barcode,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }
  }
}
