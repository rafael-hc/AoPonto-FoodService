import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { UsersRepository } from '../repositories/users-repository'
import { ContactsRepository } from '../repositories/contacts-repository'

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

    await this.usersRepository.delete(user)

    const contact = await this.contactsRepository.findById(user.contactId)

    if (contact) {
      contact['props'].active = false
      await this.contactsRepository.delete(contact)
    }
  }
}
