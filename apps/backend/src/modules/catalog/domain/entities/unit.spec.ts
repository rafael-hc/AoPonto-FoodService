import { Unit } from './unit'

describe('Unit Entity', () => {
  it('should be able to create a new unit', () => {
    const unit = Unit.create({
      code: 1,
      initials: 'UN',
      description: 'Unidade'
    })

    expect(unit.id).toBeTruthy()
    expect(unit.initials).toBe('UN')
  })

  it('should be able to update unit details', () => {
    const unit = Unit.create({
      code: 1,
      initials: 'UN'
    })

    unit.updateDetails({
      initials: 'KG'
    })

    expect(unit.initials).toBe('KG')
  })
})
