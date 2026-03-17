import { HashGenerator } from '@/auth/domain/cryptography/hash-generator'
import { Contact } from '@/parties/domain/entities/contact'
import { User, UserRole } from '@/parties/domain/entities/user'
import { ResourceNotFoundError } from '@/parties/domain/errors/resource-not-found-error'
import { UserAlreadyExistsError } from '@/parties/domain/errors/user-already-exists-error'
import { InMemoryContactsRepository } from '@/parties/test/repositories/in-memory-contacts-repository'
import { InMemoryUsersRepository } from '@/parties/test/repositories/in-memory-users-repository'
import { UpdateUserUseCase } from './update-user.use-case'

class FakeHasher implements HashGenerator {
  async hash(plain: string): Promise<string> {
    return `${plain}-hashed`
  }
  async compare(plain: string, hash: string): Promise<boolean> {
    return `${plain}-hashed` === hash
  }
}

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryContactsRepository: InMemoryContactsRepository
let fakeHasher: FakeHasher
let sut: UpdateUserUseCase

describe('Update User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryContactsRepository = new InMemoryContactsRepository()
    fakeHasher = new FakeHasher()
    sut = new UpdateUserUseCase(
      inMemoryUsersRepository,
      inMemoryContactsRepository,
      fakeHasher
    )
  })

  it('should be able to update a user and contact info', async () => {
    const contact = new Contact({
      name: 'Old Name',
      email: 'old@example.com',
      document: '12345678900'
    })
    await inMemoryContactsRepository.create(contact)

    const user = new User({
      login: 'old-login',
      password: 'old-password',
      role: UserRole.ADMIN,
      contactId: contact.id
    })
    await inMemoryUsersRepository.create(user)

    const { user: updatedUser, contact: updatedContact } = await sut.execute({
      id: user.id,
      name: 'New Name',
      login: 'new-login',
      password: 'new-password'
    })

    expect(updatedUser.login).toBe('new-login')
    expect(updatedUser.password).toBe('new-password-hashed')
    expect(updatedContact?.name).toBe('New Name')
    expect(inMemoryContactsRepository.items[0].name).toBe('New Name')
    expect(inMemoryUsersRepository.items[0].login).toBe('new-login')
  })

  it('should not be able to update a non-existing user', async () => {
    await expect(() =>
      sut.execute({
        id: 'non-existing-id',
        name: 'New Name'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to update login to an already existing one', async () => {
    const contact1 = new Contact({
      name: 'User 1',
      email: 'u1@ex.com',
      document: '1'
    })
    await inMemoryContactsRepository.create(contact1)
    const user1 = new User({
      login: 'existing-login',
      password: 'p',
      role: UserRole.ADMIN,
      contactId: contact1.id
    })
    await inMemoryUsersRepository.create(user1)

    const contact2 = new Contact({
      name: 'User 2',
      email: 'u2@ex.com',
      document: '2'
    })
    await inMemoryContactsRepository.create(contact2)
    const user2 = new User({
      login: 'user2',
      password: 'p',
      role: UserRole.ADMIN,
      contactId: contact2.id
    })
    await inMemoryUsersRepository.create(user2)

    await expect(() =>
      sut.execute({
        id: user2.id,
        login: 'existing-login'
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should sync active status between user and contact', async () => {
    const contact = new Contact({
      name: 'John',
      email: 'john@ex.com',
      document: '123',
      active: true
    })
    await inMemoryContactsRepository.create(contact)

    const user = new User({
      login: 'john',
      password: 'p',
      role: UserRole.ADMIN,
      contactId: contact.id,
      active: true
    })
    await inMemoryUsersRepository.create(user)

    await sut.execute({
      id: user.id,
      active: false
    })

    expect(inMemoryUsersRepository.items[0].active).toBe(false)
    expect(inMemoryContactsRepository.items[0].active).toBe(false)
  })
})
