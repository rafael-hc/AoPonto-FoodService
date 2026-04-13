import { Test, TestingModule } from '@nestjs/testing'
import { Product } from '@/catalog/domain/entities/product'
import { TaxMetadata } from '@/catalog/domain/entities/value-objects/product-tax-metadata'
import { ProductsRepository } from '@/catalog/domain/repositories/products-repository'
import { InMemoryProductsRepository } from '@/catalog/test/repositories/in-memory-products-repository'
import { CreateOrderUseCase } from '@/orders/application/use-cases/create-order.use-case'
import { OrderType } from '@/orders/domain/entities/order'
import { OrderRepository } from '@/orders/domain/repositories/order.repository'
import { InMemoryOrdersRepository } from '@/orders/test/repositories/in-memory-orders-repository'
import { CreateOrderController } from './create-order.controller'

describe('CreateOrderController', () => {
  let controller: CreateOrderController
  let productsRepository: InMemoryProductsRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateOrderController],
      providers: [
        {
          provide: OrderRepository,
          useClass: InMemoryOrdersRepository
        },
        {
          provide: ProductsRepository,
          useClass: InMemoryProductsRepository
        },
        {
          provide: CreateOrderUseCase,
          useFactory: (
            orderRepository: OrderRepository,
            productRepository: ProductsRepository
          ) => {
            return new CreateOrderUseCase(orderRepository, productRepository)
          },
          inject: [OrderRepository, ProductsRepository]
        }
      ]
    }).compile()

    controller = module.get<CreateOrderController>(CreateOrderController)
    productsRepository =
      module.get<InMemoryProductsRepository>(ProductsRepository)
  })

  it('should be able to create an order', async () => {
    const product = new Product({
      name: 'Test Product',
      price: 15,
      unitId: 'u1',
      productTypeId: 'pt1',
      taxMetadata: TaxMetadata.create({
        ncm: '12345678',
        cfopId: 'cf1',
        originId: 'o1',
        icmsModalityId: 'im1',
        isServiceTaxExempt: false
      })
    })
    await productsRepository.create(product)

    const result = await controller.handle({
      type: OrderType.COUNTER,
      items: [
        {
          productId: product.id,
          quantity: 2
        }
      ]
    })

    expect(result.id).toBeDefined()
    expect(result.totalAmount).toBe(30)
    expect(result.items).toHaveLength(1)
  })
})
