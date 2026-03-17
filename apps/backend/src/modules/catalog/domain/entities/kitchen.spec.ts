import { Kitchen } from './kitchen'

describe('Kitchen Entity', () => {
  it('should be able to create a new kitchen', () => {
    const kitchen = Kitchen.create({
      code: 1,
      description: 'Kitchen 1',
      ip: '192.168.0.1',
      port: '8080',
      printer: 'Printer 1'
    })

    expect(kitchen.id).toBeTruthy()
    expect(kitchen.createdAt).toBeInstanceOf(Date)
  })

  it('should be able to update kitchen details', () => {
    const kitchen = Kitchen.create({
      code: 1,
      description: 'Kitchen 1',
      ip: '1',
      port: '1',
      printer: '1'
    })

    const initialUpdatedAt = kitchen.updatedAt

    kitchen.updateDetails({
      description: 'Kitchen Updated'
    })

    expect(kitchen.description).toBe('Kitchen Updated')
    expect(kitchen.updatedAt.getTime()).toBeGreaterThanOrEqual(
      initialUpdatedAt.getTime()
    )
  })
})
