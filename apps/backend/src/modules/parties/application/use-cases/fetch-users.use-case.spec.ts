import { Contact } from '@/parties/domain/entities/contact'
import { User, UserRole } from '@/parties/domain/entities/user'
import { InMemoryContactsRepository } from '@/parties/test/repositories/in-memory-contacts-repository'
import { InMemoryUsersRepository } from '@/parties/test/repositories/in-memory-users-repository'
import { FetchUsersUseCase } from './fetch-users.use-case'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryContactsRepository: InMemoryContactsRepository
let sut: FetchUsersUseCase

describe('Fetch Users Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryContactsRepository = new InMemoryContactsRepository()
    sut = new FetchUsersUseCase(
      inMemoryUsersRepository,
      inMemoryContactsRepository
    )
  })

  it('should be able to fetch users with contacts', async () => {
    const contact = new Contact({
      name: 'John Doe',
      email: 'johndoe@example.com',
      document: '12345678900'
    })

    await inMemoryContactsRepository.create(contact)

    const user = new User({
      login: 'johndoe',
      password: 'hashed-password',
      role: UserRole.ADMIN,
      contactId: contact.id
    })

    await inMemoryUsersRepository.create(user)

    const { usersWithContacts } = await sut.execute()

    expect(usersWithContacts).toHaveLength(1)
    expect(usersWithContacts[0].user.login).toBe('johndoe')
    expect(usersWithContacts[0].contact?.name).toBe('John Doe')
  })

  it('should not be able to fetch soft deleted users', async () => {
    const contact = new Contact({
      name: 'John Doe',
      email: 'johndoe@example.com',
      document: '12345678900'
    })

    await inMemoryContactsRepository.create(contact)

    const user = new User({
      login: 'johndoe',
      password: 'hashed-password',
      role: UserRole.ADMIN,
      contactId: contact.id
    })

    await inMemoryUsersRepository.create(user)

    // Soft delete the user
    user.delete()
    await inMemoryUsersRepository.delete(user)

    const { usersWithContacts } = await sut.execute()

    expect(usersWithContacts).toHaveLength(0)
  })
})
