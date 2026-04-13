import { NotFoundException } from '@nestjs/common'
import { Order, OrderStatus, OrderType } from '../../domain/entities/order'
import { InMemoryOrdersRepository } from '../../test/repositories/in-memory-orders-repository'
import { UpdateOrderStatusUseCase } from './update-order-status.use-case'

describe('Update Order Status Use Case', () => {
  let ordersRepository: InMemoryOrdersRepository
  let sut: UpdateOrderStatusUseCase

  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()
    sut = new UpdateOrderStatusUseCase(ordersRepository)
  })

  it('should be able to update order status', async () => {
    const order = new Order({
      code: 1,
      status: OrderStatus.PENDING,
      type: OrderType.COUNTER,
      totalAmount: 10
    })

    await ordersRepository.create(order)

    const { order: updatedOrder } = await sut.execute({
      id: order.id,
      status: OrderStatus.PREPARING
    })

    expect(updatedOrder.status).toBe(OrderStatus.PREPARING)
    expect(ordersRepository.items[0].status).toBe(OrderStatus.PREPARING)
  })

  it('should throw error if order not found', async () => {
    await expect(
      sut.execute({
        id: 'non-existing-id',
        status: OrderStatus.PREPARING
      })
    ).rejects.toBeInstanceOf(NotFoundException)
  })
})
