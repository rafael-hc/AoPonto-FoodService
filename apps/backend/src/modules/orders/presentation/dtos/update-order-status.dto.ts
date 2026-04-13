import { ApiProperty } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'
import { OrderStatus } from '@/orders/domain/entities/order'

export const orderStatusSchema = z.enum(
  [
    OrderStatus.PENDING,
    OrderStatus.PREPARING,
    OrderStatus.READY,
    OrderStatus.DELIVERED,
    OrderStatus.CANCELED
  ],
  {
    error: 'Status de pedido inválido'
  }
)

const updateOrderStatusSchema = z.object({
  status: orderStatusSchema
})

export class UpdateOrderStatusDto extends createZodDto(
  updateOrderStatusSchema
) {
  @ApiProperty({ enum: OrderStatus, enumName: 'OrderStatus' })
  declare status: OrderStatus
}
