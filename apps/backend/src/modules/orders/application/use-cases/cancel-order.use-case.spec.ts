import { NotFoundException } from '@nestjs/common'
import { Order, OrderStatus, OrderType } from '../../domain/entities/order'
import { InMemoryOrdersRepository } from '../../test/repositories/in-memory-orders-repository'
import { CancelOrderUseCase } from './cancel-order.use-case'

describe('Cancel Order Use Case', () => {
  let ordersRepository: InMemoryOrdersRepository
  let sut: CancelOrderUseCase

  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()
    sut = new CancelOrderUseCase(ordersRepository)
  })

  it('should be able to cancel an order', async () => {
    const order = new Order({
      code: 1,
      status: OrderStatus.PENDING,
      type: OrderType.COUNTER,
      totalAmount: 10
    })

    await ordersRepository.create(order)

    const { order: cancelledOrder } = await sut.execute({
      id: order.id
    })

    expect(cancelledOrder.status).toBe(OrderStatus.CANCELED)
    expect(ordersRepository.items[0].status).toBe(OrderStatus.CANCELED)
  })

  it('should throw error if order not found', async () => {
    await expect(
      sut.execute({
        id: 'non-existing-id'
      })
    ).rejects.toBeInstanceOf(NotFoundException)
  })
})
