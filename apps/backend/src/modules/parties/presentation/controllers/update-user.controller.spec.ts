import { ConflictException, NotFoundException } from '@nestjs/common'
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

  it('should throw ConflictException if login is already taken by another user', async () => {
    // Create first user
    const contact1 = new Contact({ name: 'User 1' })
    await contactsRepository.create(contact1)
    const user1 = new User({
      login: 'user1',
      password: 'p',
      role: UserRole.ADMIN,
      contactId: contact1.id
    })
    await usersRepository.create(user1)

    // Create second user
    const contact2 = new Contact({ name: 'User 2' })
    await contactsRepository.create(contact2)
    const user2 = new User({
      login: 'user2',
      password: 'p',
      role: UserRole.ADMIN,
      contactId: contact2.id
    })
    await usersRepository.create(user2)

    // Try to update user2's login to 'user1'
    await expect(
      controller.handle(user2.id, { login: 'user1' })
    ).rejects.toThrow(ConflictException)
  })
})
