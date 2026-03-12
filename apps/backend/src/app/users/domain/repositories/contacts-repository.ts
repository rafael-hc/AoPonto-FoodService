import type { Contact } from '../entities/contact'

export abstract class ContactsRepository {
  abstract findById(id: string): Promise<Contact | null>
  abstract findByDocument(document: string): Promise<Contact | null>
  abstract create(contact: Contact): Promise<void>
  abstract save(contact: Contact): Promise<void>
  abstract delete(contact: Contact): Promise<void>
}
