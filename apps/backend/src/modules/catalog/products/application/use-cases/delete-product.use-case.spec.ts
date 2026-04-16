import { Product } from '@/catalog/products/domain/entities/product'
import { TaxMetadata } from '@/catalog/products/domain/entities/value-objects/product-tax-metadata'
import { InMemoryProductsRepository } from '@/catalog/products/test/repositories/in-memory-products-repository'
import { DeleteProductUseCase } from './delete-product.use-case'

let productsRepository: InMemoryProductsRepository
let sut: DeleteProductUseCase

describe('Delete Product', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new DeleteProductUseCase(productsRepository)
  })

  it('should be able to delete a product', async () => {
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

    await sut.execute({ id: product.id })

    expect(productsRepository.items[0].deletedAt).toBeTruthy()
  })
})
