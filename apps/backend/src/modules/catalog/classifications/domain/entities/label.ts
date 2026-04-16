import { randomUUID } from 'node:crypto'
import { DateUtils } from '@/shared/utils/date-utils'

export interface LabelProps {
  id?: string
  description: string
  order?: number
  type?: string
  externalId: string
  deleteDate?: Date | null
  versionReg?: number | null
  versionSync?: number | null
  createdAt?: Date
  updatedAt?: Date
}

export class Label {
  private props: LabelProps

  constructor(props: LabelProps) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
      order: props.order ?? 0,
      type: props.type ?? 'P',
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
  get order() {
    return this.props.order as number
  }
  get type() {
    return this.props.type as string
  }
  get externalId() {
    return this.props.externalId
  }
  get deleteDate() {
    return this.props.deleteDate
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

  static create(props: LabelProps) {
    return new Label(props)
  }

  updateDetails(
    props: Partial<
      Omit<LabelProps, 'id' | 'createdAt' | 'updatedAt' | 'externalId'>
    >
  ) {
    Object.assign(this.props, props)
    this.props.updatedAt = DateUtils.getBrasiliaDate()
  }

  delete() {
    this.props.deleteDate = DateUtils.getBrasiliaDate()
    this.props.updatedAt = DateUtils.getBrasiliaDate()
  }
}
