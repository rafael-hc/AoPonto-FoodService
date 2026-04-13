import { Test, TestingModule } from '@nestjs/testing'
import { UpdateOrderStatusUseCase } from '@/orders/application/use-cases/update-order-status.use-case'
import { Order, OrderStatus, OrderType } from '@/orders/domain/entities/order'
import { OrderRepository } from '@/orders/domain/repositories/order.repository'
import { InMemoryOrdersRepository } from '@/orders/test/repositories/in-memory-orders-repository'
import { UpdateOrderStatusController } from './update-order-status.controller'

describe('UpdateOrderStatusController', () => {
  let controller: UpdateOrderStatusController
  let orderRepository: InMemoryOrdersRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateOrderStatusController],
      providers: [
        {
          provide: OrderRepository,
          useClass: InMemoryOrdersRepository
        },
        {
          provide: UpdateOrderStatusUseCase,
          useFactory: (repository: OrderRepository) => {
            return new UpdateOrderStatusUseCase(repository)
          },
          inject: [OrderRepository]
        }
      ]
    }).compile()

    controller = module.get<UpdateOrderStatusController>(
      UpdateOrderStatusController
    )
    orderRepository = module.get<InMemoryOrdersRepository>(OrderRepository)
  })

  it('should be able to update order status via controller', async () => {
    const order = new Order({
      code: 1,
      status: OrderStatus.PENDING,
      type: OrderType.COUNTER,
      totalAmount: 10
    })
    await orderRepository.create(order)

    const result = await controller.handle(order.id, {
      status: OrderStatus.PREPARING
    })

    expect(result.status).toBe(OrderStatus.PREPARING)
    expect(orderRepository.items[0].status).toBe(OrderStatus.PREPARING)
  })
})
