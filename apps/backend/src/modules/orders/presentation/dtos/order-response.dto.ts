import { ApiProperty } from '@nestjs/swagger'
import { OrderStatus, OrderType } from '@/orders/domain/entities/order'

export class OrderItemResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  productId: string

  @ApiProperty()
  quantity: number

  @ApiProperty()
  unitPrice: number

  @ApiProperty()
  totalPrice: number

  @ApiProperty({ required: false })
  notes?: string
}

export class OrderDetailResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty({ required: false })
  tableNumber?: string

  @ApiProperty({ required: false })
  comandaNumber?: string

  @ApiProperty({ required: false })
  deliveryAddress?: string

  @ApiProperty({ required: false })
  deliveryFee?: number
}

export class OrderResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  code: number

  @ApiProperty({ enum: OrderStatus, enumName: 'OrderStatus' })
  status: OrderStatus

  @ApiProperty({ enum: OrderType, enumName: 'OrderType' })
  type: OrderType

  @ApiProperty()
  totalAmount: number

  @ApiProperty({ required: false })
  notes?: string

  @ApiProperty({ required: false })
  customerId?: string

  @ApiProperty({ type: [OrderItemResponseDto] })
  items: OrderItemResponseDto[]

  @ApiProperty({ type: OrderDetailResponseDto, required: false })
  details?: OrderDetailResponseDto

  @ApiProperty()
  createdAt: Date
}
