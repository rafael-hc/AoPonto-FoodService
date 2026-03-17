import { Product } from '@/catalog/domain/entities/product'
import { TaxMetadata } from '@/catalog/domain/entities/value-objects/product-tax-metadata'
import { InMemoryProductsRepository } from '@/catalog/test/repositories/in-memory-products-repository'
import { FetchProductsUseCase } from './fetch-products.use-case'

let productsRepository: InMemoryProductsRepository
let sut: FetchProductsUseCase

describe('Fetch Products', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new FetchProductsUseCase(productsRepository)
  })

  it('should be able to fetch products', async () => {
    await productsRepository.create(
      Product.create({
        code: 1,
        name: 'P1',
        price: 10,
        labelId: 'l1',
        unitId: 'u1',
        productTypeId: 'pt1',
        taxMetadata: TaxMetadata.create({})
      })
    )

    const { products } = await sut.execute()

    expect(products).toHaveLength(1)
  })
})
