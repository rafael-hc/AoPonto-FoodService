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
