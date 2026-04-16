import { ProductPersonalized } from './product-personalized'

describe('ProductPersonalized Entity', () => {
  it('should be able to create a new product personalized', () => {
    const personalized = ProductPersonalized.create({
      code: 1,
      description: 'Borda Recheada',
      externalId: 'ext-1'
    })

    expect(personalized.id).toBeTruthy()
    expect(personalized.description).toBe('Borda Recheada')
  })
})
