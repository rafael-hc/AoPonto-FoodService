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
})
