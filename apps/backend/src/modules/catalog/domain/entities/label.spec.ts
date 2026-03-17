import { Label } from './label'

describe('Label Entity', () => {
  it('should be able to create a new label', () => {
    const label = Label.create({
      code: 1,
      description: 'Label 1',
      externalId: 'ext-1'
    })

    expect(label.id).toBeTruthy()
    expect(label.order).toBe(0)
    expect(label.type).toBe('P')
  })

  it('should be able to update label details', () => {
    const label = Label.create({
      code: 1,
      description: 'Label 1',
      externalId: 'ext-1'
    })

    label.updateDetails({
      description: 'Label Updated'
    })

    expect(label.description).toBe('Label Updated')
  })

  it('should be able to soft delete a label', () => {
    const label = Label.create({
      code: 1,
      description: 'Label 1',
      externalId: 'ext-1'
    })

    label.delete()

    expect(label.deleteDate).toBeTruthy()
  })
})
