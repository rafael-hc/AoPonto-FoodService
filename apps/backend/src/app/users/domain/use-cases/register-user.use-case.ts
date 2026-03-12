import { User, UserRole } from '../entities/user'
import { Contact } from '../entities/contact'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { UsersRepository } from '../repositories/users-repository'
import { ContactsRepository } from '../repositories/contacts-repository'
import { HashGenerator } from '../cryptography/hash-generator'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  document: string
  login: string
  password: string
  role?: UserRole
}

interface RegisterUserUseCaseResponse {
  user: User
  contact: Contact
}

export class RegisterUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private contactsRepository: ContactsRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    name,
    email,
    document,
    login,
    password,
    role = UserRole.CASHIER
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameLogin = await this.usersRepository.findByLogin(login)

    if (userWithSameLogin) {
      throw new UserAlreadyExistsError()
    }

    const contact = new Contact({
      name,
      email,
      document
    })

    await this.contactsRepository.create(contact)

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = new User({
      login,
      password: hashedPassword,
      role,
      contactId: contact.id
    })

    await this.usersRepository.create(user)

    return { user, contact }
  }
}
