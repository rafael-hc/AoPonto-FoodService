import type { User } from '../entities/user'
import type { UsersRepository } from '../repositories/users-repository'

interface FetchUsersUseCaseResponse {
  users: User[]
}

export class FetchUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<FetchUsersUseCaseResponse> {
    const users = await this.usersRepository.findMany()

    return {
      users
    }
  }
}
