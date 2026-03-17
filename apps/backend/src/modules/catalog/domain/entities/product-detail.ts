import { randomUUID } from 'node:crypto'
import { DateUtils } from '@/shared/utils/date-utils'

export interface ProductDetailProps {
  id?: string
  code: number
  productId: string
  productSizeId?: string | null
  salePrice: number
  costPrice?: number | null
  currentStock?: number | null
  minStock?: number | null
  isStockControlled?: boolean
  barcode?: string | null
  externalId: string

  showOnDesktop?: boolean
  showOnMobile?: boolean
  showOnDigitalMenu?: boolean
  showOnDinoMenu?: boolean
  showOnTotem?: boolean

  pausedAt?: Date | null
  versionReg?: number | null
  versionSync?: number | null
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export class ProductDetail {
  private props: ProductDetailProps

  constructor(props: ProductDetailProps) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
      currentStock: props.currentStock ?? 0,
      minStock: props.minStock ?? 0,
      isStockControlled: props.isStockControlled ?? false,
      showOnDesktop: props.showOnDesktop ?? true,
      showOnMobile: props.showOnMobile ?? true,
      showOnDigitalMenu: props.showOnDigitalMenu ?? true,
      showOnDinoMenu: props.showOnDinoMenu ?? true,
      showOnTotem: props.showOnTotem ?? false,
      createdAt: props.createdAt ?? DateUtils.getBrasiliaDate(),
      updatedAt: props.updatedAt ?? DateUtils.getBrasiliaDate()
    }
  }

  static create(props: ProductDetailProps) {
    return new ProductDetail(props)
  }

  get id() {
    return this.props.id as string
  }
  get code() {
    return this.props.code
  }
  get productId() {
    return this.props.productId
  }
  get productSizeId() {
    return this.props.productSizeId
  }
  get salePrice() {
    return this.props.salePrice
  }
  get costPrice() {
    return this.props.costPrice
  }
  get currentStock() {
    return this.props.currentStock
  }
  get minStock() {
    return this.props.minStock
  }
  get isStockControlled() {
    return this.props.isStockControlled
  }
  get barcode() {
    return this.props.barcode
  }
  get externalId() {
    return this.props.externalId
  }
  get showOnDesktop() {
    return this.props.showOnDesktop
  }
  get showOnMobile() {
    return this.props.showOnMobile
  }
  get showOnDigitalMenu() {
    return this.props.showOnDigitalMenu
  }
  get showOnDinoMenu() {
    return this.props.showOnDinoMenu
  }
  get showOnTotem() {
    return this.props.showOnTotem
  }
  get pausedAt() {
    return this.props.pausedAt
  }
  get versionReg() {
    return this.props.versionReg
  }
  get versionSync() {
    return this.props.versionSync
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
}
