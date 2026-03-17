import type { Contact } from '@/parties/domain/entities/contact'
import type { User } from '@/parties/domain/entities/user'
import type { ContactsRepository } from '@/parties/domain/repositories/contacts-repository'
import type { UsersRepository } from '@/parties/domain/repositories/users-repository'

interface FetchUsersUseCaseResponse {
  usersWithContacts: Array<{
    user: User
    contact: Contact | null
  }>
}

export class FetchUsersUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private contactsRepository: ContactsRepository
  ) {}

  async execute(): Promise<FetchUsersUseCaseResponse> {
    const users = await this.usersRepository.findMany()

    const usersWithContacts = await Promise.all(
      users
        .filter((user) => !user.deletedAt)
        .map(async (user) => {
          const contact = await this.contactsRepository.findById(user.contactId)
          return { user, contact }
        })
    )

    return {
      usersWithContacts
    }
  }
}
