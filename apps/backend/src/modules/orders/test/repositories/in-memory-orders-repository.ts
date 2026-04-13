import { Order } from '@/orders/domain/entities/order'
import {
  OrderFilters,
  OrderRepository,
  PaginatedOrders
} from '@/orders/domain/repositories/order.repository'

export class InMemoryOrdersRepository implements OrderRepository {
  public items: Order[] = []

  async create(order: Order): Promise<void> {
    this.items.push(order)
  }

  async update(order: Order): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === order.id)
    if (itemIndex >= 0) {
      this.items[itemIndex] = order
    }
  }

  async findById(id: string): Promise<Order | null> {
    const order = this.items.find((item) => item.id === id)
    if (!order) return null
    return order
  }

  async findMany(filters?: OrderFilters): Promise<PaginatedOrders> {
    let filteredItems = this.items.filter((item) => !item.deletedAt)

    if (filters?.status) {
      filteredItems = filteredItems.filter(
        (item) => item.status === filters.status
      )
    }

    if (filters?.customerId) {
      filteredItems = filteredItems.filter(
        (item) => item.customerId === filters.customerId
      )
    }

    const page = filters?.page ?? 1
    const limit = filters?.limit ?? 10
    const skip = (page - 1) * limit

    const data = filteredItems.slice(skip, skip + limit)

    return {
      data,
      total: filteredItems.length,
      page,
      limit
    }
  }
}
