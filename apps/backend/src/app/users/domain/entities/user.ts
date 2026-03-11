export enum UserRole {
  ADMIN = 'ADMIN',
  CASHIER = 'CASHIER',
  KITCHEN = 'KITCHEN',
}

export interface UserProps {
  id?: string;
  login: string;
  password: string;
  role: UserRole;
  active?: boolean;
  contactId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  private props: UserProps;

  constructor(props: UserProps) {
    this.props = {
      ...props,
      active: props.active ?? true,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  get id() {
    return this.props.id;
  }
  get login() {
    return this.props.login;
  }
  get password() {
    return this.props.password;
  }
  get role() {
    return this.props.role;
  }
  get active() {
    return this.props.active;
  }
  get contactId() {
    return this.props.contactId;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }
}
