import { Injectable, NotFoundException } from '@nestjs/common'
import { Order, OrderStatus } from '@/orders/domain/entities/order'
import { OrderRepository } from '@/orders/domain/repositories/order.repository'

interface CancelOrderUseCaseRequest {
  id: string
}

interface CancelOrderUseCaseResponse {
  order: Order
}

@Injectable()
export class CancelOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(
    request: CancelOrderUseCaseRequest
  ): Promise<CancelOrderUseCaseResponse> {
    const { id } = request

    const order = await this.orderRepository.findById(id)

    if (!order) {
      throw new NotFoundException('Order not found')
    }

    // Marca como cancelado no domínio
    order.changeStatus(OrderStatus.CANCELED)

    await this.orderRepository.update(order)

    return { order }
  }
}
