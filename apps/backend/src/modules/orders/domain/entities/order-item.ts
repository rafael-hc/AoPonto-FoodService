import {
  BaseEntity,
  type BaseEntityProps
} from '@/shared/domain/entities/base-entity'

export interface OrderItemProps extends BaseEntityProps {
  orderId: string
  productId: string
  quantity: number
  unitPrice: number
  totalPrice: number
  notes?: string | null
}

export class OrderItem extends BaseEntity<OrderItemProps> {
  get orderId() {
    return this.props.orderId
  }
  get productId() {
    return this.props.productId
  }
  get quantity() {
    return this.props.quantity
  }
  get unitPrice() {
    return this.props.unitPrice
  }
  get totalPrice() {
    return this.props.totalPrice
  }
  get notes() {
    return this.props.notes
  }
}
