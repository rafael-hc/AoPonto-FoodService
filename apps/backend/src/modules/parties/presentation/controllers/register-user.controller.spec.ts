import { ConflictException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { BcryptHasher } from '@/auth/infrastructure/cryptography/bcrypt-hasher'
import { RegisterUserUseCase } from '@/parties/application/use-cases/register-user.use-case'
import { UserRole } from '@/parties/domain/entities/user'
import { ContactsRepository } from '@/parties/domain/repositories/contacts-repository'
import { UsersRepository } from '@/parties/domain/repositories/users-repository'
import { InMemoryContactsRepository } from '@/parties/test/repositories/in-memory-contacts-repository'
import { InMemoryUsersRepository } from '@/parties/test/repositories/in-memory-users-repository'
import { RegisterUserController } from './register-user.controller'

describe('RegisterUserController', () => {
  let controller: RegisterUserController
  let usersRepository: InMemoryUsersRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterUserController],
      providers: [
        {
          provide: UsersRepository,
          useClass: InMemoryUsersRepository
        },
        {
          provide: ContactsRepository,
          useClass: InMemoryContactsRepository
        },
        {
          provide: RegisterUserUseCase,
          useFactory: (
            usersRepository: UsersRepository,
            contactsRepository: ContactsRepository
          ) => {
            return new RegisterUserUseCase(
              usersRepository,
              contactsRepository,
              new BcryptHasher()
            )
          },
          inject: [UsersRepository, ContactsRepository]
        }
      ]
    }).compile()

    controller = module.get<RegisterUserController>(RegisterUserController)
    usersRepository = module.get(UsersRepository)
  })

  it('should be able to register a new user', async () => {
    const result = await controller.handle({
      name: 'John Doe',
      login: 'johndoe',
      password: 'password123',
      email: 'john@example.com',
      document: '12345678901',
      role: UserRole.ADMIN
    })

    expect(result.login).toBe('johndoe')
    expect(result.contact.name).toBe('John Doe')
    expect(usersRepository.items).toHaveLength(1)
  })

  it('should throw ConflictException if user already exists', async () => {
    await controller.handle({
      name: 'John Doe',
      login: 'johndoe',
      password: 'password123',
      email: 'john@example.com',
      document: '12345678901',
      role: UserRole.ADMIN
    })

    await expect(
      controller.handle({
        name: 'John Doe',
        login: 'johndoe',
        password: 'password123',
        email: 'john@example.com',
        document: '12345678901',
        role: UserRole.ADMIN
      })
    ).rejects.toThrow(ConflictException)
  })
})
