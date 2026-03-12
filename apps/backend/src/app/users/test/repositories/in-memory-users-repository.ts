import { User, type UserRole } from '../../domain/entities/user'
import { UsersRepository } from '../../domain/repositories/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByLogin(login: string): Promise<User | null> {
    const user = this.items.find((item) => item.login === login)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async create(user: User): Promise<void> {
    this.items.push(user)
  }

  async findManyByRole(role: UserRole): Promise<User[]> {
    return this.items.filter((item) => item.role === role)
  }
}
