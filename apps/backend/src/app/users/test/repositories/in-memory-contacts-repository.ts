import type { Contact } from '@/users/domain/entities/contact'
import type { ContactsRepository } from '@/users/domain/repositories/contacts-repository'

export class InMemoryContactsRepository implements ContactsRepository {
  public items: Contact[] = []

  async findById(id: string): Promise<Contact | null> {
    const contact = this.items.find((item) => item.id === id)

    if (!contact) {
      return null
    }

    return contact
  }

  async findByDocument(document: string): Promise<Contact | null> {
    const contact = this.items.find((item) => item.document === document)

    if (!contact) {
      return null
    }

    return contact
  }

  async create(contact: Contact): Promise<void> {
    this.items.push(contact)
  }

  async save(contact: Contact): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === contact.id)

    this.items[itemIndex] = contact
  }
}
