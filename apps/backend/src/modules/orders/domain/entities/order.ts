import {
  BaseEntity,
  type BaseEntityProps
} from '@/shared/domain/entities/base-entity'
import { OrderDetail } from './order-detail'
import { OrderItem } from './order-item'

export enum OrderStatus {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  READY = 'READY',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED'
}

export enum OrderType {
  TABLE = 'TABLE',
  COUNTER = 'COUNTER',
  DELIVERY = 'DELIVERY'
}

export interface OrderProps extends BaseEntityProps {
  code: number
  status: OrderStatus
  type: OrderType
  totalAmount: number
  notes?: string | null
  customerId?: string | null

  items?: OrderItem[]
  details?: OrderDetail | null
}

export class Order extends BaseEntity<OrderProps> {
  get code() {
    return this.props.code
  }
  get status() {
    return this.props.status
  }
  get type() {
    return this.props.type
  }
  get totalAmount() {
    return this.props.totalAmount
  }
  get notes() {
    return this.props.notes
  }
  get customerId() {
    return this.props.customerId
  }
  get items() {
    return this.props.items || []
  }
  get details() {
    return this.props.details
  }

  changeStatus(status: OrderStatus) {
    this.props.status = status
    this.touch()
  }

  calculateTotal() {
    const itemsTotal = this.items.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    )
    const deliveryFee = this.details?.deliveryFee || 0
    this.props.totalAmount = itemsTotal + deliveryFee
    this.touch()
  }

  addItem(item: OrderItem) {
    if (!this.props.items) {
      this.props.items = []
    }
    this.props.items.push(item)
    this.calculateTotal()
    this.touch()
  }

  removeItem(itemId: string) {
    if (!this.props.items) return

    this.props.items = this.props.items.filter((item) => item.id !== itemId)
    this.calculateTotal()
    this.touch()
  }

  updateDetails(details: OrderDetail) {
    this.props.details = details
    this.calculateTotal()
    this.touch()
  }
}
