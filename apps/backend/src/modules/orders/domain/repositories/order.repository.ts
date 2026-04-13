import { Order, OrderStatus } from '../entities/order'

export interface OrderFilters {
  status?: OrderStatus
  customerId?: string
  page?: number
  limit?: number
}

export interface PaginatedOrders {
  data: Order[]
  total: number
  page: number
  limit: number
}

export abstract class OrderRepository {
  abstract create(order: Order): Promise<void>
  abstract update(order: Order): Promise<void>
  abstract findById(id: string): Promise<Order | null>
  abstract findMany(filters?: OrderFilters): Promise<PaginatedOrders>
}
