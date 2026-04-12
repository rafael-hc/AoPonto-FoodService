import type { HashGenerator } from '@/auth/domain/cryptography/hash-generator'
import { UserAlreadyExistsError } from '@/parties/domain/errors/user-already-exists-error'
import { InMemoryContactsRepository } from '@/parties/test/repositories/in-memory-contacts-repository'
import { InMemoryUsersRepository } from '@/parties/test/repositories/in-memory-users-repository'
import { RegisterUserUseCase } from './register-user.use-case'

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
let sut: RegisterUserUseCase

describe('Register User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryContactsRepository = new InMemoryContactsRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterUserUseCase(
      inMemoryUsersRepository,
      inMemoryContactsRepository,
      fakeHasher
    )
  })

  it('should be able to register a new user', async () => {
    const { user, contact } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      document: '12345678900',
      login: 'johndoe',
      password: 'password123'
    })

    expect(user.password).toEqual('password123-hashed')
    expect(contact.email).toEqual('johndoe@example.com')
    expect(inMemoryContactsRepository.items[0].email).toEqual(
      'johndoe@example.com'
    )
  })

  it('should not be able to register with existing email', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      document: '12345678900',
      login: 'johndoe',
      password: 'password123'
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        document: '12345678900',
        login: 'johndoe',
        password: 'password123'
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should not be able to register with existing login', async () => {
    const login = 'johndoe'

    await sut.execute({
      name: 'John Doe',
      email: 'john1@example.com',
      document: '12345678901',
      login,
      password: 'password123'
    })

    await expect(() =>
      sut.execute({
        name: 'John Smith',
        email: 'john2@example.com',
        document: '12345678902',
        login,
        password: 'password123'
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should link the user to the contact correctly', async () => {
    const { user, contact } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      document: '12345678900',
      login: 'johndoe',
      password: 'password123'
    })

    expect(user.contactId).toBe(contact.id)
  })
})
