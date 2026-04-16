import { ProductSize } from './product-size'

describe('ProductSize Entity', () => {
  it('should be able to create a new product size', () => {
    const size = ProductSize.create({
      code: 1,
      productPersonalizedId: 'pp1',
      description: 'Grande',
      initials: 'G',
      maxParts: 2,
      externalId: 'ext-1'
    })

    expect(size.id).toBeTruthy()
    expect(size.maxParts).toBe(2)
  })
})
