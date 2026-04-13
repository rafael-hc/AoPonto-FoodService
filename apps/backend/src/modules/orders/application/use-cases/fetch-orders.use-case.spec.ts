import { Order, OrderStatus, OrderType } from '../../domain/entities/order'
import { InMemoryOrdersRepository } from '../../test/repositories/in-memory-orders-repository'
import { FetchOrdersUseCase } from './fetch-orders.use-case'

describe('Fetch Orders Use Case', () => {
  let ordersRepository: InMemoryOrdersRepository
  let sut: FetchOrdersUseCase

  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()
    sut = new FetchOrdersUseCase(ordersRepository)
  })

  it('should be able to fetch orders', async () => {
    await ordersRepository.create(
      new Order({
        code: 1,
        status: OrderStatus.PENDING,
        type: OrderType.COUNTER,
        totalAmount: 10
      })
    )

    await ordersRepository.create(
      new Order({
        code: 2,
        status: OrderStatus.READY,
        type: OrderType.TABLE,
        totalAmount: 20
      })
    )

    const { result } = await sut.execute({})

    expect(result.data).toHaveLength(2)
    expect(result.total).toBe(2)
  })

  it('should be able to filter orders by status', async () => {
    await ordersRepository.create(
      new Order({
        code: 1,
        status: OrderStatus.PENDING,
        type: OrderType.COUNTER,
        totalAmount: 10
      })
    )

    await ordersRepository.create(
      new Order({
        code: 2,
        status: OrderStatus.READY,
        type: OrderType.TABLE,
        totalAmount: 20
      })
    )

    const { result } = await sut.execute({
      filters: {
        status: OrderStatus.READY
      }
    })

    expect(result.data).toHaveLength(1)
    expect(result.data[0].status).toBe(OrderStatus.READY)
  })
})
