import { Product } from '@/catalog/products/domain/entities/product'
import { TaxMetadata } from '@/catalog/products/domain/entities/value-objects/product-tax-metadata'
import { InMemoryProductsRepository } from '@/catalog/products/test/repositories/in-memory-products-repository'
import { EditProductUseCase } from './edit-product.use-case'

let productsRepository: InMemoryProductsRepository
let sut: EditProductUseCase

describe('Edit Product', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new EditProductUseCase(productsRepository)
  })

  it('should be able to edit a product', async () => {
    const product = Product.create({
      code: 1,
      name: 'P1',
      price: 10,
      labelId: 'l1',
      unitId: 'u1',
      productTypeId: 'pt1',
      taxMetadata: TaxMetadata.create({})
    })

    await productsRepository.create(product)

    await sut.execute({
      id: product.id,
      name: 'P1 Editado'
    })

    expect(productsRepository.items[0].name).toBe('P1 Editado')
  })
})
