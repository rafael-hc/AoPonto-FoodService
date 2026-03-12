import { UserAlreadyExistsError } from '@/users/domain/errors/user-already-exists-error'
import { RegisterUserUseCase } from './register-user.use-case'
import { HashGenerator } from '@/users/domain/cryptography/hash-generator'
import { InMemoryUsersRepository } from '@/users/test/repositories/in-memory-users-repository'
import { InMemoryContactsRepository } from '@/users/test/repositories/in-memory-contacts-repository'

class FakeHasher implements HashGenerator {
  async hash(plain: string): Promise<string> {
    return plain + '-hashed'
  }
  async compare(plain: string, hash: string): Promise<boolean> {
    return plain + '-hashed' === hash
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
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      document: '12345678900',
      login: 'johndoe',
      password: 'password123'
    })

    expect(user.password).toEqual('password123-hashed')
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
})
