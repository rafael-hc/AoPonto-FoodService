import { Kitchen } from '@/catalog/classifications/domain/entities/kitchen'
import { KitchenPresenter } from './kitchen.presenter'

describe('KitchenPresenter', () => {
  it('should be able to present a kitchen', () => {
    const kitchen = Kitchen.create({
      code: 1,
      description: 'K1',
      ip: '1',
      port: '1',
      printer: '1'
    })

    const result = KitchenPresenter.toHTTP(kitchen)

    expect(result).toEqual(
      expect.objectContaining({
        id: kitchen.id,
        description: 'K1'
      })
    )
  })
})
