import { ProductType } from '@/catalog/domain/entities/product-type'
import { InMemoryProductTypesRepository } from '@/catalog/test/repositories/in-memory-product-types-repository'
import { DeleteProductTypeUseCase } from './delete-product-type.use-case'

let productTypesRepository: InMemoryProductTypesRepository
let sut: DeleteProductTypeUseCase

describe('Delete Product Type', () => {
  beforeEach(() => {
    productTypesRepository = new InMemoryProductTypesRepository()
    sut = new DeleteProductTypeUseCase(productTypesRepository)
  })

  it('should be able to delete a product type', async () => {
    const productType = ProductType.create({
      code: 1,
      description: 'T1'
    })

    await productTypesRepository.create(productType)

    await sut.execute({ id: productType.id })

    expect(productTypesRepository.items).toHaveLength(0)
  })
})
