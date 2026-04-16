export interface TaxMetadataProps {
  ncm?: string | null
  cest?: string | null
  barcode?: string | null
  cfopId?: string | null
  originId?: string | null
  icmsModalityId?: string | null
  pisTaxSituationId?: string | null
  cofinsTaxSituationId?: string | null
  taxConfigurationId?: string | null
  productionIndicatorId?: string | null
  isServiceTaxExempt?: boolean
}

export class TaxMetadata {
  constructor(private props: TaxMetadataProps) {
    this.props = {
      ...props,
      isServiceTaxExempt: props.isServiceTaxExempt ?? false
    }
  }

  get ncm() {
    return this.props.ncm
  }
  get cest() {
    return this.props.cest
  }
  get barcode() {
    return this.props.barcode
  }
  get cfopId() {
    return this.props.cfopId
  }
  get originId() {
    return this.props.originId
  }
  get icmsModalityId() {
    return this.props.icmsModalityId
  }
  get pisTaxSituationId() {
    return this.props.pisTaxSituationId
  }
  get cofinsTaxSituationId() {
    return this.props.cofinsTaxSituationId
  }
  get taxConfigurationId() {
    return this.props.taxConfigurationId
  }
  get productionIndicatorId() {
    return this.props.productionIndicatorId
  }
  get isServiceTaxExempt() {
    return this.props.isServiceTaxExempt
  }

  static create(props: TaxMetadataProps) {
    return new TaxMetadata(props)
  }
}
