import { Test, TestingModule } from '@nestjs/testing'
import { FetchUsersUseCase } from '@/parties/application/use-cases/fetch-users.use-case'
import { Contact } from '@/parties/domain/entities/contact'
import { User, UserRole } from '@/parties/domain/entities/user'
import { ContactsRepository } from '@/parties/domain/repositories/contacts-repository'
import { UsersRepository } from '@/parties/domain/repositories/users-repository'
import { InMemoryContactsRepository } from '@/parties/test/repositories/in-memory-contacts-repository'
import { InMemoryUsersRepository } from '@/parties/test/repositories/in-memory-users-repository'
import { FetchUsersController } from './fetch-users.controller'

describe('FetchUsersController', () => {
  let controller: FetchUsersController
  let usersRepository: InMemoryUsersRepository
  let contactsRepository: InMemoryContactsRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FetchUsersController],
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
          provide: FetchUsersUseCase,
          useFactory: (
            usersRepository: UsersRepository,
            contactsRepository: ContactsRepository
          ) => {
            return new FetchUsersUseCase(usersRepository, contactsRepository)
          },
          inject: [UsersRepository, ContactsRepository]
        }
      ]
    }).compile()

    controller = module.get<FetchUsersController>(FetchUsersController)
    usersRepository = module.get(UsersRepository)
    contactsRepository = module.get(ContactsRepository)
  })

  it('should return a list of users with contacts', async () => {
    const contact = new Contact({
      name: 'John Doe',
      email: 'john@example.com',
      document: '123'
    })
    await contactsRepository.create(contact)

    const user = new User({
      login: 'johndoe',
      password: 'p',
      role: UserRole.ADMIN,
      contactId: contact.id
    })
    await usersRepository.create(user)

    const result = await controller.handle()

    expect(result.users).toHaveLength(1)
    expect(result.users[0].login).toBe('johndoe')
    expect(result.users[0].name).toBe('John Doe')
  })
})
