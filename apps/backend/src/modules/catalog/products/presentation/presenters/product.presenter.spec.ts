import { Product } from '@/catalog/products/domain/entities/product'
import { TaxMetadata } from '@/catalog/products/domain/entities/value-objects/product-tax-metadata'
import { ProductPresenter } from './product.presenter'

describe('ProductPresenter', () => {
  it('should be able to present a product', () => {
    const product = Product.create({
      code: 1,
      name: 'P1',
      price: 10,
      labelId: 'l1',
      unitId: 'u1',
      productTypeId: 'pt1',
      taxMetadata: TaxMetadata.create({})
    })

    const result = ProductPresenter.toHTTP(product)

    expect(result).toEqual(
      expect.objectContaining({
        id: product.id,
        name: 'P1',
        price: 10
      })
    )
  })
})
