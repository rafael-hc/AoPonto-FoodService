import {
  BaseEntity,
  type BaseEntityProps
} from '@/shared/domain/entities/base-entity'

export interface OrderDetailProps extends BaseEntityProps {
  orderId: string
  tableNumber?: string | null
  comandaNumber?: string | null
  deliveryAddress?: string | null
  deliveryFee?: number | null
}

export class OrderDetail extends BaseEntity<OrderDetailProps> {
  get orderId() {
    return this.props.orderId
  }
  get tableNumber() {
    return this.props.tableNumber
  }
  get comandaNumber() {
    return this.props.comandaNumber
  }
  get deliveryAddress() {
    return this.props.deliveryAddress
  }
  get deliveryFee() {
    return this.props.deliveryFee
  }

  updateDetails(
    props: Partial<
      Omit<
        OrderDetailProps,
        'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'orderId'
      >
    >
  ) {
    Object.assign(this.props, props)
    this.touch()
  }
}
