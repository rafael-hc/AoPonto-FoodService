import { randomUUID } from 'node:crypto'
import { DateUtils } from '@/shared/utils/date-utils'

export interface ProductWizardProps {
  id?: string
  productId: string
  wizardQuestionId: string
  order: number
  createdAt?: Date
  updatedAt?: Date
}

export class ProductWizard {
  private props: ProductWizardProps

  constructor(props: ProductWizardProps) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
      order: props.order ?? 0,
      createdAt: props.createdAt ?? DateUtils.getBrasiliaDate(),
      updatedAt: props.updatedAt ?? DateUtils.getBrasiliaDate()
    }
  }

  static create(props: ProductWizardProps) {
    return new ProductWizard(props)
  }

  get id() {
    return this.props.id as string
  }
  get productId() {
    return this.props.productId
  }
  get wizardQuestionId() {
    return this.props.wizardQuestionId
  }
  get order() {
    return this.props.order
  }
  get createdAt() {
    return this.props.createdAt as Date
  }
  get updatedAt() {
    return this.props.updatedAt as Date
  }

  updateOrder(order: number) {
    this.props.order = order
    this.props.updatedAt = DateUtils.getBrasiliaDate()
  }
}
