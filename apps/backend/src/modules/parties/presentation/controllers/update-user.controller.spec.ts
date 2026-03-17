import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { BcryptHasher } from '@/auth/infrastructure/cryptography/bcrypt-hasher'
import { UpdateUserUseCase } from '@/parties/application/use-cases/update-user.use-case'
import { Contact } from '@/parties/domain/entities/contact'
import { User, UserRole } from '@/parties/domain/entities/user'
import { ContactsRepository } from '@/parties/domain/repositories/contacts-repository'
import { UsersRepository } from '@/parties/domain/repositories/users-repository'
import { InMemoryContactsRepository } from '@/parties/test/repositories/in-memory-contacts-repository'
import { InMemoryUsersRepository } from '@/parties/test/repositories/in-memory-users-repository'
import { UpdateUserController } from './update-user.controller'

describe('UpdateUserController', () => {
  let controller: UpdateUserController
  let usersRepository: InMemoryUsersRepository
  let contactsRepository: InMemoryContactsRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateUserController],
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
          provide: UpdateUserUseCase,
          useFactory: (
            usersRepository: UsersRepository,
            contactsRepository: ContactsRepository
          ) => {
            return new UpdateUserUseCase(
              usersRepository,
              contactsRepository,
              new BcryptHasher()
            )
          },
          inject: [UsersRepository, ContactsRepository]
        }
      ]
    }).compile()

    controller = module.get<UpdateUserController>(UpdateUserController)
    usersRepository = module.get(UsersRepository)
    contactsRepository = module.get(ContactsRepository)
  })

  it('should update user and contact', async () => {
    const contact = new Contact({ name: 'Old', email: 'o@e.com' })
    await contactsRepository.create(contact)
    const user = new User({
      login: 'old',
      password: 'p',
      role: UserRole.ADMIN,
      contactId: contact.id
    })
    await usersRepository.create(user)

    const result = await controller.handle(user.id, {
      name: 'New',
      login: 'new'
    })

    expect(result.login).toBe('new')
    expect(result.contact.name).toBe('New')
  })

  it('should throw NotFoundException if user not found', async () => {
    await expect(
      controller.handle('non-existing', { name: 'New' })
    ).rejects.toThrow(NotFoundException)
  })
})
