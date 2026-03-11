import { User, UserRole } from '../entities/user';

export abstract class UsersRepository {
  abstract findByLogin(login: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract findManyByRole(role: UserRole): Promise<User[]>;
  abstract create(user: User): Promise<void>;
}
