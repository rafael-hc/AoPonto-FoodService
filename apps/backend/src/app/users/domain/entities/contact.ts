import { randomUUID } from 'node:crypto'
import { DateUtils } from '@/shared/utils/date-utils'

export interface ContactProps {
  id?: string
  name: string
  active?: boolean
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

  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export class Contact {
  private props: ContactProps

  constructor(props: ContactProps) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
      active: props.active ?? true,
      creditLimit: props.creditLimit ?? 0,
      currentBalance: props.currentBalance ?? 0,
      createdAt: props.createdAt ?? DateUtils.getBrasiliaDate(),
      updatedAt: props.updatedAt ?? DateUtils.getBrasiliaDate()
    }
  }

  get id() {
    return this.props.id!
  }
  get name() {
    return this.props.name
  }
  get active() {
    return this.props.active
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
