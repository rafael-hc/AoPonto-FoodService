import type { HashGenerator } from '@/auth/domain/cryptography/hash-generator'
import type { Contact } from '@/parties/domain/entities/contact'
import type { User, UserRole } from '@/parties/domain/entities/user'
import { ResourceNotFoundError } from '@/parties/domain/errors/resource-not-found-error'
import { UserAlreadyExistsError } from '@/parties/domain/errors/user-already-exists-error'
import type { ContactsRepository } from '@/parties/domain/repositories/contacts-repository'
import type { UsersRepository } from '@/parties/domain/repositories/users-repository'

interface UpdateUserUseCaseRequest {
  id: string
  name?: string
  email?: string
  document?: string
  login?: string
  password?: string
  role?: UserRole
  active?: boolean
}

interface UpdateUserUseCaseResponse {
  user: User
  contact: Contact | null
}

export class UpdateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private contactsRepository: ContactsRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    id,
    name,
    email,
    document,
    login,
    password,
    role,
    active
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    // Se o login mudou, verifica se já existe outro usuário com o mesmo login
    if (login && login !== user.login) {
      const userWithSameLogin = await this.usersRepository.findByLogin(login)
      if (userWithSameLogin) {
        throw new UserAlreadyExistsError()
      }
    }

    let hashedPassword: string | undefined
    if (password) {
      hashedPassword = await this.hashGenerator.hash(password)
    }

    user.updateDetails({
      ...(login && { login }),
      ...(hashedPassword && {
        password: hashedPassword,
        passwordChangeRequired: false
      }),
      ...(role && { role }),
      ...(active !== undefined && { active })
    })

    // Update contact details
    const contact = await this.contactsRepository.findById(user.contactId)

    if (contact) {
      contact.updateDetails({
        ...(name && { name }),
        ...(email && { email }),
        ...(document && { document }),
        // SYNC: toda vez que um usuário for (in)ativado, o contato deve ser (in)ativado também
        ...(active !== undefined && { active })
      })

      await this.contactsRepository.save(contact)
    }

    await this.usersRepository.save(user)

    return { user, contact }
  }
}
