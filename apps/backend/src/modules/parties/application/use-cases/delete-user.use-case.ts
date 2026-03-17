import { ResourceNotFoundError } from '@/parties/domain/errors/resource-not-found-error'
import type { ContactsRepository } from '@/parties/domain/repositories/contacts-repository'
import type { UsersRepository } from '@/parties/domain/repositories/users-repository'

interface DeleteUserUseCaseRequest {
  id: string
}

export class DeleteUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private contactsRepository: ContactsRepository
  ) {}

  async execute({ id }: DeleteUserUseCaseRequest): Promise<void> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    user.delete()
    await this.usersRepository.delete(user)

    const contact = await this.contactsRepository.findById(user.contactId)

    if (contact) {
      contact.delete()
      await this.contactsRepository.delete(contact)
    }
  }
}
