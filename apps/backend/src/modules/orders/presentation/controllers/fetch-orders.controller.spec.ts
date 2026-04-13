import { Test, TestingModule } from '@nestjs/testing'
import { FetchOrdersUseCase } from '@/orders/application/use-cases/fetch-orders.use-case'
import { Order, OrderStatus, OrderType } from '@/orders/domain/entities/order'
import { OrderRepository } from '@/orders/domain/repositories/order.repository'
import { InMemoryOrdersRepository } from '@/orders/test/repositories/in-memory-orders-repository'
import { FetchOrdersController } from './fetch-orders.controller'

describe('FetchOrdersController', () => {
  let controller: FetchOrdersController
  let orderRepository: InMemoryOrdersRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FetchOrdersController],
      providers: [
        {
          provide: OrderRepository,
          useClass: InMemoryOrdersRepository
        },
        {
          provide: FetchOrdersUseCase,
          useFactory: (repository: OrderRepository) => {
            return new FetchOrdersUseCase(repository)
          },
          inject: [OrderRepository]
        }
      ]
    }).compile()

    controller = module.get<FetchOrdersController>(FetchOrdersController)
    orderRepository = module.get<InMemoryOrdersRepository>(OrderRepository)
  })

  it('should be able to fetch orders via controller', async () => {
    await orderRepository.create(
      new Order({
        code: 1,
        status: OrderStatus.READY,
        type: OrderType.COUNTER,
        totalAmount: 50
      })
    )

    const result = await controller.handle(OrderStatus.READY)

    expect(result.data).toHaveLength(1)
    expect(result.data[0].status).toBe(OrderStatus.READY)
    expect(result.total).toBe(1)
  })
})
