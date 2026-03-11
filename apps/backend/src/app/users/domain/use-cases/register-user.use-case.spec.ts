import { UserAlreadyExistsError } from '@/users/domain/errors/user-already-exists-error';
import { RegisterUserUseCase } from './register-user.use-case';
import { HashGenerator } from '@/users/domain/cryptography/hash-generator';
import { InMemoryUsersRepository } from '@/users/test/repositories/in-memory-users-repository';

class FakeHasher implements HashGenerator {
  async hash(plain: string): Promise<string> {
    return plain + '-hashed';
  }
  async compare(plain: string, hash: string): Promise<boolean> {
    return plain + '-hashed' === hash;
  }
}

let inMemoryUsersRepository: InMemoryUsersRepository;
let fakeHasher: FakeHasher;
let sut: RegisterUserUseCase;

describe('Register User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    fakeHasher = new FakeHasher();
    sut = new RegisterUserUseCase(inMemoryUsersRepository, fakeHasher);
  });

  it('should be able to register a new user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    });

    expect(user.password).toEqual('password123-hashed');
    expect(inMemoryUsersRepository.items[0].email).toEqual(
      'johndoe@example.com',
    );
  });

  it('should not be able to register with existing email', async () => {
    const email = 'johndoe@example.com';

    await sut.execute({
      name: 'John Doe',
      email,
      password: 'password123',
    });

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: 'password123',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
