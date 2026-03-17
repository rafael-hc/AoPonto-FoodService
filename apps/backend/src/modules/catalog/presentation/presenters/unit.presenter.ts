import { Unit } from '@/catalog/domain/entities/unit'

export const UnitPresenter = {
  toHTTP(unit: Unit) {
    return {
      id: unit.id,
      initials: unit.initials,
      description: unit.description,
      createdAt: unit.createdAt,
      updatedAt: unit.updatedAt
    }
  }
}
