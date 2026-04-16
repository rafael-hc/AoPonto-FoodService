import { randomUUID } from 'node:crypto'
import { DateUtils } from '@/shared/utils/date-utils'

export interface ProductPersonalizedProps {
  id?: string
  code: number
  description: string
  externalId: string
  versionReg?: number | null
  versionSync?: number | null
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export class ProductPersonalized {
  private props: ProductPersonalizedProps

  constructor(props: ProductPersonalizedProps) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? DateUtils.getBrasiliaDate(),
      updatedAt: props.updatedAt ?? DateUtils.getBrasiliaDate()
    }
  }

  static create(props: ProductPersonalizedProps) {
    return new ProductPersonalized(props)
  }

  get id() {
    return this.props.id as string
  }
  get code() {
    return this.props.code
  }
  get description() {
    return this.props.description
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
