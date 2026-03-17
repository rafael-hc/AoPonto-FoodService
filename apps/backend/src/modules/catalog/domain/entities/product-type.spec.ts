import { ProductType } from './product-type'

describe('ProductType Entity', () => {
  it('should be able to create a new product type', () => {
    const productType = ProductType.create({
      code: 1,
      description: 'Type 1'
    })

    expect(productType.id).toBeTruthy()
    expect(productType.description).toBe('Type 1')
  })

  it('should be able to update product type details', () => {
    const productType = ProductType.create({
      code: 1,
      description: 'Type 1'
    })

    productType.updateDetails({
      description: 'Type Updated'
    })

    expect(productType.description).toBe('Type Updated')
  })
})
