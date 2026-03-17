import { randomUUID } from 'node:crypto'
import { DateUtils } from '@/shared/utils/date-utils'

export interface KitchenProps {
  id?: string
  description: string
  ip: string
  port: string
  printer: string
  versionReg?: number | null
  versionSync?: number | null
  createdAt?: Date
  updatedAt?: Date
}

export class Kitchen {
  private props: KitchenProps

  constructor(props: KitchenProps) {
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
  get ip() {
    return this.props.ip
  }
  get port() {
    return this.props.port
  }
  get printer() {
    return this.props.printer
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

  static create(props: KitchenProps) {
    return new Kitchen(props)
  }

  updateDetails(
    props: Partial<Omit<KitchenProps, 'id' | 'createdAt' | 'updatedAt'>>
  ) {
    Object.assign(this.props, props)
    this.props.updatedAt = DateUtils.getBrasiliaDate()
  }
}
