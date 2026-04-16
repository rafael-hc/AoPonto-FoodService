import { InMemoryProductsRepository } from '@/catalog/products/test/repositories/in-memory-products-repository'
import { RegisterProductUseCase } from './register-product.use-case'

let productsRepository: InMemoryProductsRepository
let sut: RegisterProductUseCase

describe('Register Product', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new RegisterProductUseCase(productsRepository)
  })

  it('should be able to register a product', async () => {
    const { product } = await sut.execute({
      code: 1,
      name: 'Prod 1',
      price: 10,
      labelId: 'l1',
      unitId: 'u1',
      productTypeId: 'pt1'
    })

    expect(product.id).toBeTruthy()
    expect(productsRepository.items).toHaveLength(1)
  })
})
