import { Contact } from './contact'

describe('Contact Entity', () => {
  it('should be able to create a new contact', () => {
    const contact = new Contact({
      name: 'John Doe',
      email: 'johndoe@example.com',
      document: '12345678900'
    })

    expect(contact.id).toBeDefined()
    expect(contact.name).toBe('John Doe')
    expect(contact.active).toBe(true)
    expect(contact.createdAt).toBeInstanceOf(Date)
  })

  it('should be able to update contact details', () => {
    const contact = new Contact({
      name: 'John Doe',
      email: 'johndoe@example.com',
      document: '12345678900'
    })

    contact.updateDetails({
      name: 'John Smith',
      active: false
    })

    expect(contact.name).toBe('John Smith')
    expect(contact.active).toBe(false)
    expect(contact.updatedAt).toBeInstanceOf(Date)
  })

  it('should be able to soft delete a contact', () => {
    const contact = new Contact({
      name: 'John Doe',
      email: 'johndoe@example.com',
      document: '12345678900'
    })

    contact.delete()

    expect(contact.deletedAt).toBeInstanceOf(Date)
    expect(contact.active).toBe(false)
  })

  it('should have default values for credit and balance', () => {
    const contact = new Contact({
      name: 'John Doe'
    })

    expect(contact.creditLimit).toBe(0)
    expect(contact.currentBalance).toBe(0)
  })

  it('should be able to get all contact properties', () => {
    const birthDate = new Date()
    const contact = new Contact({
      name: 'John Doe',
      document: '12345678900',
      email: 'johndoe@example.com',
      phone: '1122223333',
      mobile: '11999998888',
      birthDate,
      address: 'Main St',
      number: '123',
      complement: 'Apt 1',
      neighborhood: 'Downtown',
      city: 'Springfield',
      state: 'IL',
      zipcode: '62701',
      creditLimit: 1000,
      currentBalance: 500
    })

    expect(contact.name).toBe('John Doe')
    expect(contact.document).toBe('12345678900')
    expect(contact.email).toBe('johndoe@example.com')
    expect(contact.phone).toBe('1122223333')
    expect(contact.mobile).toBe('11999998888')
    expect(contact.birthDate).toBe(birthDate)
    expect(contact.address).toBe('Main St')
    expect(contact.number).toBe('123')
    expect(contact.complement).toBe('Apt 1')
    expect(contact.neighborhood).toBe('Downtown')
    expect(contact.city).toBe('Springfield')
    expect(contact.state).toBe('IL')
    expect(contact.zipcode).toBe('62701')
    expect(contact.creditLimit).toBe(1000)
    expect(contact.currentBalance).toBe(500)
  })

  it('should be able to update all contact data', () => {
    const contact = new Contact({
      name: 'John Doe'
    })

    contact.updateDetails({
      document: '123',
      email: 'new@email.com',
      phone: '123',
      mobile: '456',
      address: 'New St',
      creditLimit: 2000
    })

    expect(contact.document).toBe('123')
    expect(contact.email).toBe('new@email.com')
    expect(contact.address).toBe('New St')
    expect(contact.creditLimit).toBe(2000)
  })
})
