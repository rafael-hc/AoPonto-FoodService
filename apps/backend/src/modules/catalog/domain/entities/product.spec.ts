import { Product } from './product'
import { TaxMetadata } from './value-objects/product-tax-metadata'

describe('Product Entity', () => {
  it('should be able to create a new product', () => {
    const product = Product.create({
      code: 1,
      name: 'Product 1',
      price: 10,
      labelId: 'l1',
      unitId: 'u1',
      productTypeId: 'pt1',
      taxMetadata: TaxMetadata.create({})
    })

    expect(product.id).toBeTruthy()
    expect(product.active).toBe(true)
    expect(product.isKitchenItem).toBe(true)
  })

  it('should be able to update product details', () => {
    const product = Product.create({
      code: 1,
      name: 'Product 1',
      price: 10,
      labelId: 'l1',
      unitId: 'u1',
      productTypeId: 'pt1',
      taxMetadata: TaxMetadata.create({})
    })

    product.updateDetails({
      name: 'Product Updated',
      price: 20
    })

    expect(product.name).toBe('Product Updated')
    expect(product.price).toBe(20)
  })

  it('should be able to activate and deactivate a product', () => {
    const product = Product.create({
      code: 1,
      name: 'P1',
      price: 10,
      labelId: 'l1',
      unitId: 'u1',
      productTypeId: 'pt1',
      taxMetadata: TaxMetadata.create({})
    })

    product.deactivate()
    expect(product.active).toBe(false)

    product.activate()
    expect(product.active).toBe(true)
  })

  it('should be able to soft delete a product', () => {
    const product = Product.create({
      code: 1,
      name: 'P1',
      price: 10,
      labelId: 'l1',
      unitId: 'u1',
      productTypeId: 'pt1',
      taxMetadata: TaxMetadata.create({})
    })

    product.delete()
    expect(product.deletedAt).toBeTruthy()
  })
})
