import { ProductType } from '@/catalog/domain/entities/product-type'
import { InMemoryProductTypesRepository } from '@/catalog/test/repositories/in-memory-product-types-repository'
import { EditProductTypeUseCase } from './edit-product-type.use-case'

let productTypesRepository: InMemoryProductTypesRepository
let sut: EditProductTypeUseCase

describe('Edit Product Type', () => {
  beforeEach(() => {
    productTypesRepository = new InMemoryProductTypesRepository()
    sut = new EditProductTypeUseCase(productTypesRepository)
  })

  it('should be able to edit a product type', async () => {
    const productType = ProductType.create({
      code: 1,
      description: 'T1'
    })

    await productTypesRepository.create(productType)

    await sut.execute({
      id: productType.id,
      description: 'T1 Editado'
    })

    expect(productTypesRepository.items[0].description).toBe('T1 Editado')
  })
})
