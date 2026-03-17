import {
  BaseEntity,
  type BaseEntityProps
} from '@/shared/domain/entities/base-entity'

export interface ContactProps extends BaseEntityProps {
  name: string
  document?: string | null
  email?: string | null
  phone?: string | null
  mobile?: string | null
  birthDate?: Date | null

  // Endereço
  address?: string | null
  number?: string | null
  complement?: string | null
  neighborhood?: string | null
  city?: string | null
  state?: string | null
  zipcode?: string | null

  // Financeiro
  creditLimit?: number
  currentBalance?: number
}

export class Contact extends BaseEntity<ContactProps> {
  constructor(props: ContactProps) {
    super({
      ...props,
      creditLimit: props.creditLimit ?? 0,
      currentBalance: props.currentBalance ?? 0
    })
  }

  get name() {
    return this.props.name
  }
  get document() {
    return this.props.document
  }
  get email() {
    return this.props.email
  }
  get phone() {
    return this.props.phone
  }
  get mobile() {
    return this.props.mobile
  }
  get birthDate() {
    return this.props.birthDate
  }
  get address() {
    return this.props.address
  }
  get number() {
    return this.props.number
  }
  get complement() {
    return this.props.complement
  }
  get neighborhood() {
    return this.props.neighborhood
  }
  get city() {
    return this.props.city
  }
  get state() {
    return this.props.state
  }
  get zipcode() {
    return this.props.zipcode
  }
  get creditLimit() {
    return this.props.creditLimit
  }
  get currentBalance() {
    return this.props.currentBalance
  }

  updateDetails(
    props: Partial<
      Omit<ContactProps, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
    >
  ) {
    Object.assign(this.props, props)
    this.touch()
  }
}
