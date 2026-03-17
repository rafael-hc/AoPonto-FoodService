import * as crypto from 'node:crypto'
import { DateUtils } from '@/shared/utils/date-utils'

export interface BaseEntityProps {
  id?: string
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export abstract class BaseEntity<Props extends BaseEntityProps> {
  protected props: Props

  constructor(props: Props) {
    this.props = {
      ...props,
      id: props.id ?? crypto.randomUUID(),
      active: props.active ?? true,
      createdAt: props.createdAt ?? DateUtils.getBrasiliaDate(),
      updatedAt: props.updatedAt ?? DateUtils.getBrasiliaDate()
    }
  }

  get id(): string {
    return this.props.id as string
  }

  get active() {
    return this.props.active
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get deletedAt() {
    return this.props.deletedAt
  }

  protected touch() {
    this.props.updatedAt = DateUtils.getBrasiliaDate()
  }

  activate() {
    this.props.active = true
    this.touch()
  }

  deactivate() {
    this.props.active = false
    this.touch()
  }

  delete() {
    this.props.deletedAt = DateUtils.getBrasiliaDate()
    this.props.active = false
    this.touch()
  }
}
