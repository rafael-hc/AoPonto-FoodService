import type { Encrypter } from '@/auth/domain/cryptography/encrypter'
import type { HashGenerator } from '@/auth/domain/cryptography/hash-generator'
import { WrongCredentialsError } from '@/auth/domain/errors/wrong-credentials-error'
import { User, UserRole } from '@/parties/domain/entities/user'
import { InMemoryUsersRepository } from '@/parties/test/repositories/in-memory-users-repository'
import { AuthenticateUserUseCase } from './authenticate-user.use-case'

class FakeHasher implements HashGenerator {
  async hash(plain: string): Promise<string> {
    return `${plain}-hashed`
  }
  async compare(plain: string, hash: string): Promise<boolean> {
    return `${plain}-hashed` === hash
  }
}

class FakeEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload)
  }
}

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: AuthenticateUserUseCase

describe('Authenticate User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      fakeHasher,
      fakeEncrypter
    )
  })

  it('should be able to authenticate a user', async () => {
    const user = new User({
      id: 'user-1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('password123'),
      role: UserRole.CASHIER,
      createdAt: new Date(),
      updatedAt: new Date(),
      login: 'john',
      contactId: 'contact-1'
    })

    await inMemoryUsersRepository.create(user)

    const { accessToken, refreshToken } = await sut.execute({
      login: 'john',
      password: 'password123'
    })

    expect(accessToken).toEqual(expect.any(String))
    expect(accessToken).toContain('user-1')
    expect(refreshToken).toEqual(expect.any(String))
    expect(refreshToken).toContain('user-1')
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        login: 'john',
        password: 'password123'
      })
    ).rejects.toBeInstanceOf(WrongCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const user = new User({
      id: 'user-2',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('password123'),
      role: UserRole.CASHIER,
      login: 'john',
      contactId: 'contact-1'
    })

    await inMemoryUsersRepository.create(user)

    await expect(() =>
      sut.execute({
        login: 'john',
        password: 'wrong-password'
      })
    ).rejects.toBeInstanceOf(WrongCredentialsError)
  })
})
