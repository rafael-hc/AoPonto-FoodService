import { randomUUID } from 'node:crypto'
import { DateUtils } from '@/shared/utils/date-utils'

export interface WizardOptionProps {
  id?: string
  wizardQuestionId: string
  productId?: string | null
  description?: string | null
  promoPrice?: number | null
  maxQty: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export class WizardOption {
  private props: WizardOptionProps

  constructor(props: WizardOptionProps) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
      maxQty: props.maxQty ?? 1,
      createdAt: props.createdAt ?? DateUtils.getBrasiliaDate(),
      updatedAt: props.updatedAt ?? DateUtils.getBrasiliaDate()
    }
  }

  static create(props: WizardOptionProps) {
    return new WizardOption(props)
  }

  get id() {
    return this.props.id as string
  }
  get wizardQuestionId() {
    return this.props.wizardQuestionId
  }
  get productId() {
    return this.props.productId
  }
  get description() {
    return this.props.description
  }
  get promoPrice() {
    return this.props.promoPrice
  }
  get maxQty() {
    return this.props.maxQty
  }
  get createdAt() {
    return this.props.createdAt as Date
  }
  get updatedAt() {
    return this.props.updatedAt as Date
  }
  get deletedAt() {
    return this.props.deletedAt
  }

  delete() {
    this.props.deletedAt = DateUtils.getBrasiliaDate()
    this.props.updatedAt = DateUtils.getBrasiliaDate()
  }

  update(
    props: Partial<
      Omit<
        WizardOptionProps,
        'id' | 'createdAt' | 'updatedAt' | 'wizardQuestionId'
      >
    >
  ) {
    Object.assign(this.props, props)
    this.props.updatedAt = DateUtils.getBrasiliaDate()
  }
}
