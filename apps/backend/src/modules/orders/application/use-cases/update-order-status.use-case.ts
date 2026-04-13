import { Injectable, NotFoundException } from '@nestjs/common'
import { Order, OrderStatus } from '@/orders/domain/entities/order'
import { OrderRepository } from '@/orders/domain/repositories/order.repository'

interface UpdateOrderStatusUseCaseRequest {
  id: string
  status: OrderStatus
}

interface UpdateOrderStatusUseCaseResponse {
  order: Order
}

@Injectable()
export class UpdateOrderStatusUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(
    request: UpdateOrderStatusUseCaseRequest
  ): Promise<UpdateOrderStatusUseCaseResponse> {
    const { id, status } = request

    const order = await this.orderRepository.findById(id)

    if (!order) {
      throw new NotFoundException('Order not found')
    }

    order.changeStatus(status)

    await this.orderRepository.update(order)

    return { order }
  }
}
