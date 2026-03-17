import { randomUUID } from 'node:crypto'

export interface CfopProps {
  id?: string
  code: number
  description?: string | null
  fullCode?: string | null
}
export class Cfop {
  private props: CfopProps
  constructor(props: CfopProps) {
    this.props = { ...props, id: props.id ?? randomUUID() }
  }
  get id() {
    return this.props.id as string
  }
  get code() {
    return this.props.code
  }
}

export interface ProductOriginProps {
  id?: string
  code: number
  description?: string | null
  fullCode?: string | null
}
export class ProductOrigin {
  private props: ProductOriginProps
  constructor(props: ProductOriginProps) {
    this.props = { ...props, id: props.id ?? randomUUID() }
  }
  get id() {
    return this.props.id as string
  }
  get code() {
    return this.props.code
  }
}

export interface TaxSituationProps {
  id?: string
  code: string
  type: string
  description?: string | null
  fullCode?: string | null
}
export class TaxSituation {
  private props: TaxSituationProps
  constructor(props: TaxSituationProps) {
    this.props = { ...props, id: props.id ?? randomUUID() }
  }
  get id() {
    return this.props.id as string
  }
  get code() {
    return this.props.code
  }
}
