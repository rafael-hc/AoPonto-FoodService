import { Unit } from '@/catalog/domain/entities/unit'
import { UnitPresenter } from './unit.presenter'

describe('UnitPresenter', () => {
  it('should be able to present a unit', () => {
    const unit = Unit.create({
      code: 1,
      initials: 'UN',
      description: 'Unit 1'
    })

    const result = UnitPresenter.toHTTP(unit)

    expect(result).toEqual(
      expect.objectContaining({
        id: unit.id,
        initials: 'UN'
      })
    )
  })
})
