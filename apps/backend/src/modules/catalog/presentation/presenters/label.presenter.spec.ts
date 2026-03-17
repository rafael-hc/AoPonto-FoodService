import { Label } from '@/catalog/domain/entities/label'
import { LabelPresenter } from './label.presenter'

describe('LabelPresenter', () => {
  it('should be able to present a label', () => {
    const label = Label.create({
      code: 1,
      description: 'L1',
      externalId: 'ext1'
    })

    const result = LabelPresenter.toHTTP(label)

    expect(result).toEqual(
      expect.objectContaining({
        id: label.id,
        description: 'L1',
        externalId: 'ext1'
      })
    )
  })
})
