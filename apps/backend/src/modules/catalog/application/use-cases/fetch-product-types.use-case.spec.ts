import { ProductType } from '@/catalog/domain/entities/product-type'
import { InMemoryProductTypesRepository } from '@/catalog/test/repositories/in-memory-product-types-repository'
import { FetchProductTypesUseCase } from './fetch-product-types.use-case'

let productTypesRepository: InMemoryProductTypesRepository
let sut: FetchProductTypesUseCase

describe('Fetch Product Types', () => {
  beforeEach(() => {
    productTypesRepository = new InMemoryProductTypesRepository()
    sut = new FetchProductTypesUseCase(productTypesRepository)
  })

  it('should be able to fetch product types', async () => {
    await productTypesRepository.create(
      ProductType.create({
        code: 1,
        description: 'T1'
      })
    )

    const { productTypes } = await sut.execute()

    expect(productTypes).toHaveLength(1)
  })
})
