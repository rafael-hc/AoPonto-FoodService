import { randomUUID } from 'node:crypto'
import { DateUtils } from '@/shared/utils/date-utils'
import { TaxMetadata } from './value-objects/product-tax-metadata'

export interface ProductProps {
  id?: string
  code?: number
  name: string
  description?: string | null
  price: number
  costPrice?: number | null
  minStock?: number
  currentStock?: number
  barcode?: string | null

  methodOfPreparation?: string | null

  active?: boolean
  discontinued?: boolean

  taxMetadata: TaxMetadata

  labelId: string
  kitchenId?: string | null
  unitId: string
  productTypeId: string

  isKitchenItem?: boolean
  useMobileComanda?: boolean
  useDigitalMenu?: boolean

  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export class Product {
  private props: ProductProps

  constructor(props: ProductProps) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
      active: props.active ?? true,
      discontinued: props.discontinued ?? false,
      minStock: props.minStock ?? 0,
      currentStock: props.currentStock ?? 0,
      isKitchenItem: props.isKitchenItem ?? true,
      useMobileComanda: props.useMobileComanda ?? true,
      useDigitalMenu: props.useDigitalMenu ?? true,
      createdAt: props.createdAt ?? DateUtils.getBrasiliaDate(),
      updatedAt: props.updatedAt ?? DateUtils.getBrasiliaDate()
    }
  }

  static create(props: ProductProps) {
    const product = new Product(props)
    return product
  }

  get id() {
    return this.props.id as string
  }
  get code() {
    return this.props.code
  }
  get name() {
    return this.props.name
  }
  get price() {
    return this.props.price
  }
  get costPrice() {
    return this.props.costPrice
  }
  get minStock() {
    return this.props.minStock
  }
  get currentStock() {
    return this.props.currentStock
  }
  get description() {
    return this.props.description
  }
  get methodOfPreparation() {
    return this.props.methodOfPreparation
  }
  get active() {
    return this.props.active
  }
  get discontinued() {
    return this.props.discontinued
  }

  get taxMetadata() {
    return this.props.taxMetadata
  }

  get ncm() {
    return this.props.taxMetadata.ncm
  }
  get cest() {
    return this.props.taxMetadata.cest
  }
  get barcode() {
    return this.props.barcode
  }

  get labelId() {
    return this.props.labelId
  }
  get kitchenId() {
    return this.props.kitchenId
  }
  get unitId() {
    return this.props.unitId
  }
  get productTypeId() {
    return this.props.productTypeId
  }

  get cfopId() {
    return this.props.taxMetadata.cfopId
  }
  get originId() {
    return this.props.taxMetadata.originId
  }
  get icmsModalityId() {
    return this.props.taxMetadata.icmsModalityId
  }
  get pisTaxSituationId() {
    return this.props.taxMetadata.pisTaxSituationId
  }
  get cofinsTaxSituationId() {
    return this.props.taxMetadata.cofinsTaxSituationId
  }
  get taxConfigurationId() {
    return this.props.taxMetadata.taxConfigurationId
  }
  get productionIndicatorId() {
    return this.props.taxMetadata.productionIndicatorId
  }

  get isServiceTaxExempt() {
    return this.props.taxMetadata.isServiceTaxExempt
  }
  get isKitchenItem() {
    return this.props.isKitchenItem
  }
  get useMobileComanda() {
    return this.props.useMobileComanda
  }
  get useDigitalMenu() {
    return this.props.useDigitalMenu
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

  activate() {
    this.props.active = true
    this.props.updatedAt = DateUtils.getBrasiliaDate()
  }

  deactivate() {
    this.props.active = false
    this.props.updatedAt = DateUtils.getBrasiliaDate()
  }

  delete() {
    this.props.deletedAt = DateUtils.getBrasiliaDate()
    this.props.updatedAt = DateUtils.getBrasiliaDate()
  }

  updateDetails(
    props: Partial<
      Omit<ProductProps, 'id' | 'createdAt' | 'updatedAt' | 'taxMetadata'>
    >
  ) {
    Object.assign(this.props, props)
    this.props.updatedAt = DateUtils.getBrasiliaDate()
  }
}
