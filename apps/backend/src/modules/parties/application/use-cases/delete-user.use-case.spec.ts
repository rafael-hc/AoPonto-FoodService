import { Contact } from '@/parties/domain/entities/contact'
import { User, UserRole } from '@/parties/domain/entities/user'
import { ResourceNotFoundError } from '@/parties/domain/errors/resource-not-found-error'
import { InMemoryContactsRepository } from '@/parties/test/repositories/in-memory-contacts-repository'
import { InMemoryUsersRepository } from '@/parties/test/repositories/in-memory-users-repository'
import { DeleteUserUseCase } from './delete-user.use-case'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryContactsRepository: InMemoryContactsRepository
let sut: DeleteUserUseCase

describe('Delete User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryContactsRepository = new InMemoryContactsRepository()
    sut = new DeleteUserUseCase(
      inMemoryUsersRepository,
      inMemoryContactsRepository
    )
  })

  it('should be able to soft delete a user and its contact', async () => {
    const contact = new Contact({
      name: 'John Doe',
      email: 'johndoe@example.com',
      document: '12345678900',
      active: true
    })
    await inMemoryContactsRepository.create(contact)

    const user = new User({
      login: 'johndoe',
      password: 'password123',
      role: UserRole.ADMIN,
      contactId: contact.id,
      active: true
    })
    await inMemoryUsersRepository.create(user)

    await sut.execute({ id: user.id })

    expect(inMemoryUsersRepository.items[0].active).toBe(false)
    expect(inMemoryUsersRepository.items[0].deletedAt).toBeInstanceOf(Date)
    expect(inMemoryContactsRepository.items[0].active).toBe(false)
    expect(inMemoryContactsRepository.items[0].deletedAt).toBeInstanceOf(Date)
  })

  it('should not be able to delete a non-existing user', async () => {
    await expect(() =>
      sut.execute({ id: 'non-existing-id' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
