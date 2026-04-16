import { ProductDetail } from './product-detail'

describe('ProductDetail Entity', () => {
  it('should be able to create a new product detail', () => {
    const detail = ProductDetail.create({
      code: 1,
      productId: 'p1',
      salePrice: 10,
      externalId: 'ext-1'
    })

    expect(detail.id).toBeTruthy()
    expect(detail.showOnDesktop).toBe(true)
    expect(detail.showOnTotem).toBe(false)
  })
})
