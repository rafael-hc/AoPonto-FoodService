import { Body, Controller, Post } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { CreateOrderUseCase } from '@/orders/application/use-cases/create-order.use-case'
import { CreateOrderDto } from '../dtos/create-order.dto'
import { OrderResponseDto } from '../dtos/order-response.dto'

@ApiTags('orders')
@Controller('orders')
export class CreateOrderController {
  constructor(private createOrderUseCase: CreateOrderUseCase) {}

  @Post()
  @ApiOkResponse({ type: OrderResponseDto })
  async handle(@Body() body: CreateOrderDto) {
    const { order } = await this.createOrderUseCase.execute({
      type: body.type,
      items: body.items,
      notes: body.notes,
      customerId: body.customerId,
      tableNumber: body.tableNumber,
      comandaNumber: body.comandaNumber,
      deliveryAddress: body.deliveryAddress,
      deliveryFee: body.deliveryFee
    })

    return {
      id: order.id,
      code: order.code,
      status: order.status,
      type: order.type,
      totalAmount: order.totalAmount,
      notes: order.notes,
      customerId: order.customerId,
      items: order.items.map((i) => ({
        id: i.id,
        productId: i.productId,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        totalPrice: i.totalPrice,
        notes: i.notes
      })),
      details: order.details
        ? {
            id: order.details.id,
            tableNumber: order.details.tableNumber,
            comandaNumber: order.details.comandaNumber,
            deliveryAddress: order.details.deliveryAddress,
            deliveryFee: order.details.deliveryFee
          }
        : undefined,
      createdAt: order.createdAt
    }
  }
}
