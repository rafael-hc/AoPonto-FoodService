import { Test, TestingModule } from '@nestjs/testing'
import { CancelOrderUseCase } from '@/orders/application/use-cases/cancel-order.use-case'
import { Order, OrderStatus, OrderType } from '@/orders/domain/entities/order'
import { OrderRepository } from '@/orders/domain/repositories/order.repository'
import { InMemoryOrdersRepository } from '@/orders/test/repositories/in-memory-orders-repository'
import { CancelOrderController } from './cancel-order.controller'

describe('CancelOrderController', () => {
  let controller: CancelOrderController
  let orderRepository: InMemoryOrdersRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CancelOrderController],
      providers: [
        {
          provide: OrderRepository,
          useClass: InMemoryOrdersRepository
        },
        {
          provide: CancelOrderUseCase,
          useFactory: (repository: OrderRepository) => {
            return new CancelOrderUseCase(repository)
          },
          inject: [OrderRepository]
        }
      ]
    }).compile()

    controller = module.get<CancelOrderController>(CancelOrderController)
    orderRepository = module.get<InMemoryOrdersRepository>(OrderRepository)
  })

  it('should be able to cancel an order via controller', async () => {
    const order = new Order({
      code: 1,
      status: OrderStatus.PENDING,
      type: OrderType.COUNTER,
      totalAmount: 10
    })
    await orderRepository.create(order)

    const result = await controller.handle(order.id)

    expect(result.status).toBe(OrderStatus.CANCELED)
    expect(orderRepository.items[0].status).toBe(OrderStatus.CANCELED)
  })
})
