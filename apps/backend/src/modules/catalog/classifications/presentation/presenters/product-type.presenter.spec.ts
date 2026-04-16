import { ProductType } from '@/catalog/classifications/domain/entities/product-type'
import { ProductTypePresenter } from './product-type.presenter'

describe('ProductTypePresenter', () => {
  it('should be able to present a product type', () => {
    const productType = ProductType.create({
      code: 1,
      description: 'Type 1'
    })

    const result = ProductTypePresenter.toHTTP(productType)

    expect(result).toEqual(
      expect.objectContaining({
        id: productType.id,
        description: 'Type 1'
      })
    )
  })
})
