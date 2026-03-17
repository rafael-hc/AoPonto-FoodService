import { randomUUID } from 'node:crypto'
import { DateUtils } from '@/shared/utils/date-utils'

export interface ProductSizeProps {
  id?: string
  code: number
  productPersonalizedId: string
  description: string
  initials: string
  maxParts: number
  externalId: string
  versionReg?: number | null
  versionSync?: number | null
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export class ProductSize {
  private props: ProductSizeProps

  constructor(props: ProductSizeProps) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
      maxParts: props.maxParts ?? 1,
      createdAt: props.createdAt ?? DateUtils.getBrasiliaDate(),
      updatedAt: props.updatedAt ?? DateUtils.getBrasiliaDate()
    }
  }

  static create(props: ProductSizeProps) {
    return new ProductSize(props)
  }

  get id() {
    return this.props.id as string
  }
  get code() {
    return this.props.code
  }
  get productPersonalizedId() {
    return this.props.productPersonalizedId
  }
  get description() {
    return this.props.description
  }
  get initials() {
    return this.props.initials
  }
  get maxParts() {
    return this.props.maxParts
  }
  get externalId() {
    return this.props.externalId
  }
  get versionReg() {
    return this.props.versionReg
  }
  get versionSync() {
    return this.props.versionSync
  }
  get createdAt() {
    return this.props.createdAt as Date
  }
  get updatedAt() {
    return this.props.updatedAt as Date
  }
  get deletedAt() {
    return this.props.deletedAt
  }
}
