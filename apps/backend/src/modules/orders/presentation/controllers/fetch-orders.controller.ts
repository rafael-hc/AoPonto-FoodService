import { Controller, Get, Query } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { FetchOrdersUseCase } from '@/orders/application/use-cases/fetch-orders.use-case'
import { OrderStatus } from '@/orders/domain/entities/order'
import { OrderResponseDto } from '../dtos/order-response.dto'

@ApiTags('orders')
@Controller('orders')
export class FetchOrdersController {
  constructor(private fetchOrdersUseCase: FetchOrdersUseCase) {}

  @Get()
  @ApiOkResponse({ type: [OrderResponseDto] })
  async handle(
    @Query('status') status?: OrderStatus,
    @Query('customerId') customerId?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ) {
    const { result } = await this.fetchOrdersUseCase.execute({
      filters: {
        status,
        customerId,
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined
      }
    })

    return {
      data: result.data.map((order) => ({
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
      })),
      total: result.total,
      page: result.page,
      limit: result.limit
    }
  }
}
