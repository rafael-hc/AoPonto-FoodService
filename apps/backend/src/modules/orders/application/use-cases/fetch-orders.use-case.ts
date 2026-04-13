import { Injectable } from '@nestjs/common'
import {
  OrderFilters,
  OrderRepository,
  PaginatedOrders
} from '@/orders/domain/repositories/order.repository'

interface FetchOrdersUseCaseRequest {
  filters?: OrderFilters
}

interface FetchOrdersUseCaseResponse {
  result: PaginatedOrders
}

@Injectable()
export class FetchOrdersUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(
    request: FetchOrdersUseCaseRequest
  ): Promise<FetchOrdersUseCaseResponse> {
    const result = await this.orderRepository.findMany(request.filters)

    return { result }
  }
}
