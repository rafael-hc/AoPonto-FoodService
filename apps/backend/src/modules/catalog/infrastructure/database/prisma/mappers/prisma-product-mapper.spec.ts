import { Product } from '@/catalog/domain/entities/product'
import { TaxMetadata } from '@/catalog/domain/entities/value-objects/product-tax-metadata'
import { PrismaProductMapper } from './prisma-product-mapper'

describe('PrismaProductMapper', () => {
  it('should be able to map to domain', () => {
    const raw = {
      id: 'product-1',
      code: 1,
      name: 'Product 1',
      description: 'Desc',
      price: 10,
      costPrice: 5,
      minStock: 0,
      currentStock: 0,
      methodOfPreparation: null,
      active: true,
      discontinued: false,
      ncm: '1234',
      cest: '5678',
      barcode: '9012',
      labelId: 'l1',
      kitchenId: 'k1',
      unitId: 'u1',
      productTypeId: 'pt1',
      productionIndicatorId: 'pi1',
      cfopId: 'cf1',
      originId: 'o1',
      icmsModalityId: 'im1',
      pisTaxSituationId: 'p1',
      cofinsTaxSituationId: 'c1',
      taxConfigurationId: 'tc1',
      isServiceTaxExempt: false,
      isKitchenItem: true,
      useMobileComanda: true,
      useDigitalMenu: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }

    const product = PrismaProductMapper.toDomain(raw as unknown as any)

    expect(product.id).toBe('product-1')
    expect(product.taxMetadata.ncm).toBe('1234')
  })

  it('should be able to map to prisma', () => {
    const product = Product.create({
      code: 1,
      name: 'P1',
      price: 10,
      labelId: 'l1',
      unitId: 'u1',
      productTypeId: 'pt1',
      taxMetadata: TaxMetadata.create({
        ncm: '1234'
      })
    })

    const raw = PrismaProductMapper.toPrisma(product)

    expect(raw.id).toBe(product.id)
    expect(raw.ncm).toBe('1234')
  })
})
