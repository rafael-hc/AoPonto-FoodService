import {
  BaseEntity,
  type BaseEntityProps
} from '@/shared/domain/entities/base-entity'

export enum UserRole {
  ADMIN = 'ADMIN',
  CASHIER = 'CASHIER',
  KITCHEN = 'KITCHEN'
}

export interface UserProps extends BaseEntityProps {
  login: string
  password: string
  role: UserRole
  contactId: string
  name?: string
  email?: string
  document?: string
  failureAttempts?: number
  lockUntil?: Date | null
  passwordChangeRequired?: boolean
}

export class User extends BaseEntity<UserProps> {
  get login() {
    return this.props.login
  }
  get password() {
    return this.props.password
  }
  get role() {
    return this.props.role
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
  get failureAttempts() {
    return this.props.failureAttempts || 0
  }
  get lockUntil() {
    return this.props.lockUntil
  }
  get passwordChangeRequired() {
    return !!this.props.passwordChangeRequired
  }

  isLocked(): boolean {
    if (!this.props.lockUntil) return false
    return new Date() < this.props.lockUntil
  }

  lockAccount(minutes = 5) {
    this.props.failureAttempts = (this.props.failureAttempts || 0) + 1
    if (this.props.failureAttempts >= 5) {
      const lockUntil = new Date()
      lockUntil.setMinutes(lockUntil.getMinutes() + minutes)
      this.props.lockUntil = lockUntil
    }
    this.touch()
  }

  resetFailureAttempts() {
    this.props.failureAttempts = 0
    this.props.lockUntil = null
    this.touch()
  }

  updateDetails(
    props: Partial<
      Omit<
        UserProps,
        'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'contactId'
      >
    >
  ) {
    Object.assign(this.props, props)
    this.touch()
  }
}
