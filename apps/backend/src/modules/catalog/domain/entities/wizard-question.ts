import { randomUUID } from 'node:crypto'
import { DateUtils } from '@/shared/utils/date-utils'
import { WizardOption } from './wizard-option'

export interface WizardQuestionProps {
  id?: string
  internalCode?: number
  description: string
  context?: 'PRODUCT' | 'COMBO'
  minResponses: number
  maxResponses: number
  minItems: number
  maxItems: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
  options?: WizardOption[]
}

export class WizardQuestion {
  private props: WizardQuestionProps

  constructor(props: WizardQuestionProps) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
      context: props.context ?? 'PRODUCT',
      minResponses: props.minResponses ?? 0,
      maxResponses: props.maxResponses ?? 1,
      minItems: props.minItems ?? 0,
      maxItems: props.maxItems ?? 1,
      options: props.options ?? [],
      createdAt: props.createdAt ?? DateUtils.getBrasiliaDate(),
      updatedAt: props.updatedAt ?? DateUtils.getBrasiliaDate()
    }
  }

  static create(props: WizardQuestionProps) {
    return new WizardQuestion(props)
  }

  get id() {
    return this.props.id as string
  }
  get internalCode() {
    return this.props.internalCode
  }
  get description() {
    return this.props.description
  }
  get context() {
    return this.props.context as 'PRODUCT' | 'COMBO'
  }
  get minResponses() {
    return this.props.minResponses
  }
  get maxResponses() {
    return this.props.maxResponses
  }
  get minItems() {
    return this.props.minItems
  }
  get maxItems() {
    return this.props.maxItems
  }
  get options() {
    return this.props.options
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

  setOptions(options: WizardOption[]) {
    this.props.options = options
    this.props.updatedAt = DateUtils.getBrasiliaDate()
  }

  delete() {
    this.props.deletedAt = DateUtils.getBrasiliaDate()
    this.props.updatedAt = DateUtils.getBrasiliaDate()
  }

  update(props: Partial<Omit<WizardQuestionProps, 'id' | 'createdAt' | 'updatedAt' | 'internalCode' | 'options'>>) {
    Object.assign(this.props, props)
    this.props.updatedAt = DateUtils.getBrasiliaDate()
  }

  /**
   * Valida se uma seleção de itens satisfaz as regras da pergunta.
   * @param selections Array de { optionId: string, quantity: number }
   */
  validateSelection(selections: { optionId: string; quantity: number }[]): { isValid: boolean; message?: string } {
    const totalResponses = selections.length
    const totalItems = selections.reduce((acc, curr) => acc + curr.quantity, 0)

    // Validar quantidade de tipos de respostas (opções distintas)
    if (totalResponses < this.minResponses) {
      return { 
        isValid: false, 
        message: `Selecione pelo menos ${this.minResponses} opção(ões).` 
      }
    }

    if (this.maxResponses > 0 && totalResponses > this.maxResponses) {
      return { 
        isValid: false, 
        message: `Selecione no máximo ${this.maxResponses} opção(ões).` 
      }
    }

    // Validar quantidade total de itens (soma das quantidades)
    if (totalItems < this.minItems) {
      return { 
        isValid: false, 
        message: `A quantidade total deve ser pelo menos ${this.minItems}.` 
      }
    }

    if (this.maxItems > 0 && totalItems > this.maxItems) {
      return { 
        isValid: false, 
        message: `A quantidade total deve ser no máximo ${this.maxItems}.` 
      }
    }

    // Validar limites individuais de cada opção se as opções estiverem carregadas
    if (this.props.options && this.props.options.length > 0) {
      for (const selection of selections) {
        const option = this.props.options.find(o => o.id === selection.optionId)
        if (option && selection.quantity > option.maxQty) {
          return {
            isValid: false,
            message: `A quantidade para "${option.description ?? 'item'}" excede o limite de ${option.maxQty}.`
          }
        }
      }
    }

    return { isValid: true }
  }
}
