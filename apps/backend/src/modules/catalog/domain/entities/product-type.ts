import { randomUUID } from 'node:crypto'
import { DateUtils } from '@/shared/utils/date-utils'

export interface ProductTypeProps {
  id?: string
  description: string
  createdAt?: Date
  updatedAt?: Date
}

export class ProductType {
  private props: ProductTypeProps

  constructor(props: ProductTypeProps) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? DateUtils.getBrasiliaDate(),
      updatedAt: props.updatedAt ?? DateUtils.getBrasiliaDate()
    }
  }

  get id() {
    return this.props.id as string
  }
  get description() {
    return this.props.description
  }
  get createdAt() {
    return this.props.createdAt as Date
  }
  get updatedAt() {
    return this.props.updatedAt as Date
  }

  static create(props: ProductTypeProps) {
    return new ProductType(props)
  }

  updateDetails(
    props: Partial<Omit<ProductTypeProps, 'id' | 'createdAt' | 'updatedAt'>>
  ) {
    Object.assign(this.props, props)
    this.props.updatedAt = DateUtils.getBrasiliaDate()
  }
}
