import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { DeleteUserUseCase } from '@/parties/application/use-cases/delete-user.use-case'
import { Contact } from '@/parties/domain/entities/contact'
import { User, UserRole } from '@/parties/domain/entities/user'
import { ContactsRepository } from '@/parties/domain/repositories/contacts-repository'
import { UsersRepository } from '@/parties/domain/repositories/users-repository'
import { InMemoryContactsRepository } from '@/parties/test/repositories/in-memory-contacts-repository'
import { InMemoryUsersRepository } from '@/parties/test/repositories/in-memory-users-repository'
import { DeleteUserController } from './delete-user.controller'

describe('DeleteUserController', () => {
  let controller: DeleteUserController
  let usersRepository: InMemoryUsersRepository
  let contactsRepository: InMemoryContactsRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteUserController],
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
          provide: DeleteUserUseCase,
          useFactory: (
            usersRepository: UsersRepository,
            contactsRepository: ContactsRepository
          ) => {
            return new DeleteUserUseCase(usersRepository, contactsRepository)
          },
          inject: [UsersRepository, ContactsRepository]
        }
      ]
    }).compile()

    controller = module.get<DeleteUserController>(DeleteUserController)
    usersRepository = module.get(UsersRepository)
    contactsRepository = module.get(ContactsRepository)
  })

  it('should delete user and contact', async () => {
    const contact = new Contact({ name: 'John' })
    await contactsRepository.create(contact)
    const user = new User({
      login: 'john',
      password: 'p',
      role: UserRole.ADMIN,
      contactId: contact.id
    })
    await usersRepository.create(user)

    await controller.handle(user.id)

    expect(usersRepository.items[0].active).toBe(false)
    expect(contactsRepository.items[0].active).toBe(false)
  })

  it('should throw NotFoundException if user not found', async () => {
    await expect(controller.handle('non-existing')).rejects.toThrow(
      NotFoundException
    )
  })
})
