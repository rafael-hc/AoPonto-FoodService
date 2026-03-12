import { randomUUID } from 'node:crypto'
import { DateUtils } from '@/shared/utils/date-utils'

export enum UserRole {
  ADMIN = 'ADMIN',
  CASHIER = 'CASHIER',
  KITCHEN = 'KITCHEN'
}

export interface UserProps {
  id?: string
  login: string
  password: string
  role: UserRole
  active?: boolean
  contactId: string
  name?: string
  email?: string
  document?: string | null
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export class User {
  private props: UserProps

  constructor(props: UserProps) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
      active: props.active ?? true,
      createdAt: props.createdAt ?? DateUtils.getBrasiliaDate(),
      updatedAt: props.updatedAt ?? DateUtils.getBrasiliaDate()
    }
  }

  get id() {
    return this.props.id!
  }
  get login() {
    return this.props.login
  }
  get password() {
    return this.props.password
  }
  get role() {
    return this.props.role
  }
  get active() {
    return this.props.active
  }
  get contactId() {
    return this.props.contactId
  }
  get name() {
    return this.props.name
  }
  get email() {
    return this.props.email
  }
  get document() {
    return this.props.document
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
}
