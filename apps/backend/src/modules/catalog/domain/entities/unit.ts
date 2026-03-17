import { randomUUID } from 'node:crypto'
import { DateUtils } from '@/shared/utils/date-utils'

export interface UnitProps {
  id?: string
  initials: string
  description?: string | null
  createdAt?: Date
  updatedAt?: Date
}

export class Unit {
  private props: UnitProps

  constructor(props: UnitProps) {
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
  get initials() {
    return this.props.initials
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

  static create(props: UnitProps) {
    return new Unit(props)
  }

  updateDetails(
    props: Partial<Omit<UnitProps, 'id' | 'createdAt' | 'updatedAt'>>
  ) {
    Object.assign(this.props, props)
    this.props.updatedAt = DateUtils.getBrasiliaDate()
  }
}
