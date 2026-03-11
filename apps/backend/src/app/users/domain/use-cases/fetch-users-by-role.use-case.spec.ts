import { InMemoryUsersRepository } from '@/users/test/repositories/in-memory-users-repository';
import { FetchUsersByRoleUseCase } from './fetch-users-by-role.use-case';
import { UserRole } from '../entities/user';

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: FetchUsersByRoleUseCase;

describe('Fetch Users By Role Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new FetchUsersByRoleUseCase(inMemoryUsersRepository);
  });

  it('should be able to fetch users by role', async () => {
    const { users } = await sut.execute({
      role: UserRole.CASHIER,
    });

    expect(users).toEqual([]);
  });
});
