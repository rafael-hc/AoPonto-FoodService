import { Injectable } from '@nestjs/common'
import { ProductsRepository } from '@/catalog/domain/repositories/products-repository'
import { Order, OrderStatus, OrderType } from '@/orders/domain/entities/order'
import { OrderDetail } from '@/orders/domain/entities/order-detail'
import { OrderItem } from '@/orders/domain/entities/order-item'
import { OrderRepository } from '@/orders/domain/repositories/order.repository'

interface CreateOrderUseCaseRequest {
  type: OrderType
  items: {
    productId: string
    quantity: number
    notes?: string
  }[]
  notes?: string
  customerId?: string

  // Detalhes do pedido
  tableNumber?: string
  comandaNumber?: string
  deliveryAddress?: string
  deliveryFee?: number
}

interface CreateOrderUseCaseResponse {
  order: Order
}

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private productRepository: ProductsRepository // Para recuperar preços, precisamos importar a interface do catalog
  ) {}

  async execute(
    request: CreateOrderUseCaseRequest
  ): Promise<CreateOrderUseCaseResponse> {
    const {
      type,
      items,
      notes,
      customerId,
      tableNumber,
      comandaNumber,
      deliveryAddress,
      deliveryFee
    } = request

    if (!items || items.length === 0) {
      throw new Error('Order must have at least one item')
    }

    const orderReq = new Order({
      code: 0, // Code será setado no banco com autoincrement
      status: OrderStatus.PENDING,
      type,
      totalAmount: 0,
      notes,
      customerId
    })

    if (
      tableNumber ||
      comandaNumber ||
      deliveryAddress ||
      deliveryFee !== undefined
    ) {
      const details = new OrderDetail({
        orderId: orderReq.id,
        tableNumber,
        comandaNumber,
        deliveryAddress,
        deliveryFee
      })
      orderReq.updateDetails(details)
    }

    for (const reqItem of items) {
      // NOTE: precisamos acessar o produto real para pegar o preço
      const product = await this.productRepository.findById(reqItem.productId)

      if (!product) {
        throw new Error(`Product ${reqItem.productId} not found`)
      }

      if (!product.active) {
        throw new Error(`Product ${reqItem.productId} is inactive`)
      }

      const unitPrice = product.price // Aqui precisamos saber a propriedade do preço do objeto de domínio Produto
      const totalPrice = unitPrice * reqItem.quantity

      const orderItem = new OrderItem({
        orderId: orderReq.id,
        productId: reqItem.productId,
        quantity: reqItem.quantity,
        unitPrice,
        totalPrice,
        notes: reqItem.notes
      })

      orderReq.addItem(orderItem)
    }

    // O status e o total já são calculados e arrumados
    await this.orderRepository.create(orderReq)

    return { order: orderReq }
  }
}
