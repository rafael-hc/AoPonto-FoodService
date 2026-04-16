import { InMemoryProductTypesRepository } from '@/catalog/classifications/test/repositories/in-memory-product-types-repository'
import { RegisterProductTypeUseCase } from './register-product-type.use-case'

let productTypesRepository: InMemoryProductTypesRepository
let sut: RegisterProductTypeUseCase

describe('Register Product Type', () => {
  beforeEach(() => {
    productTypesRepository = new InMemoryProductTypesRepository()
    sut = new RegisterProductTypeUseCase(productTypesRepository)
  })

  it('should be able to register a product type', async () => {
    const { productType } = await sut.execute({
      description: 'T1'
    })

    expect(productType.id).toBeTruthy()
    expect(productTypesRepository.items).toHaveLength(1)
  })
})
