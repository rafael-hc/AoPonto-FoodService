import { User, UserRole } from '../entities/user'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { UsersRepository } from '../repositories/users-repository'
import { ContactsRepository } from '../repositories/contacts-repository'
import { HashGenerator } from '../cryptography/hash-generator'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { DateUtils } from '@/shared/utils/date-utils'

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
      user['props'].login = login
    }

    if (password) {
      const hashedPassword = await this.hashGenerator.hash(password)
      user['props'].password = hashedPassword
    }

    if (role) {
      user['props'].role = role
    }

    if (active !== undefined) {
      user['props'].active = active
    }

    // Update contact details
    const contact = await this.contactsRepository.findById(user.contactId)

    if (contact) {
      if (name) contact['props'].name = name
      if (email) contact['props'].email = email
      if (document) contact['props'].document = document

      // SYNC: toda vez que um usuário for (in)ativado, o contato deve ser (in)ativado também
      if (active !== undefined) {
        contact['props'].active = active
      }

      contact['props'].updatedAt = DateUtils.getBrasiliaDate()
      await this.contactsRepository.save(contact)
    }

    user['props'].updatedAt = DateUtils.getBrasiliaDate()
    await this.usersRepository.save(user)

    return { user }
  }
}
