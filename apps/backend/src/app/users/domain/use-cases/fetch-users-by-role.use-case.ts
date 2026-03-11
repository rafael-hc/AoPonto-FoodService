import { User, UserRole } from '../entities/user';
import { UsersRepository } from '../repositories/users-repository';

interface FetchUsersByRoleUseCaseRequest {
  role: UserRole;
}

interface FetchUsersByRoleUseCaseResponse {
  users: User[];
}

export class FetchUsersByRoleUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    role,
  }: FetchUsersByRoleUseCaseRequest): Promise<FetchUsersByRoleUseCaseResponse> {
    const users = await this.usersRepository.findManyByRole(role);

    return {
      users,
    };
  }
}
