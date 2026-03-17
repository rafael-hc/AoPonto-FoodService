import type { HashGenerator } from '@/auth/domain/cryptography/hash-generator'
import { Contact } from '@/parties/domain/entities/contact'
import { User, UserRole } from '@/parties/domain/entities/user'
import { UserAlreadyExistsError } from '@/parties/domain/errors/user-already-exists-error'
import type { ContactsRepository } from '@/parties/domain/repositories/contacts-repository'
import type { UsersRepository } from '@/parties/domain/repositories/users-repository'

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

    // Verifica se o usuário já existe (incluindo deletados para evitar conflito de login)
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
