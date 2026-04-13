import { ApiProperty } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'
import { OrderType } from '@/orders/domain/entities/order'

export const orderTypeSchema = z.enum(
  [OrderType.TABLE, OrderType.COUNTER, OrderType.DELIVERY],
  {
    error: 'Tipo de pedido inválido'
  }
)

const createOrderItemSchema = z.object({
  productId: z.string().uuid({ error: 'O ID do produto deve ser um UUID' }),
  quantity: z.number().positive({ error: 'A quantidade deve ser positiva' }),
  notes: z.string().optional()
})

const createOrderSchema = z.object({
  type: orderTypeSchema,
  items: z
    .array(createOrderItemSchema)
    .min(1, { error: 'O pedido deve ter pelo menos 1 item' }),
  notes: z.string().optional(),
  customerId: z
    .string()
    .uuid({ error: 'O ID do cliente deve ser um UUID' })
    .optional(),

  tableNumber: z.string().optional(),
  comandaNumber: z.string().optional(),
  deliveryAddress: z.string().optional(),
  deliveryFee: z
    .number()
    .min(0, { error: 'A taxa de entrega não pode ser negativa' })
    .optional()
})

export class CreateOrderDto extends createZodDto(createOrderSchema) {
  @ApiProperty({ enum: OrderType, enumName: 'OrderType' })
  declare type: OrderType
}
