import { AuthenticateUserUseCase } from './authenticate-user.use-case';
import { InMemoryUsersRepository } from '@/users/test/repositories/in-memory-users-repository';
import { HashGenerator } from '../cryptography/hash-generator';
import { Encrypter } from '../cryptography/encrypter';
import { User } from '../entities/user';
import { UserRole } from '../entities/user';
import { WrongCredentialsError } from '../errors/wrong-credentials-error';

class FakeHasher implements HashGenerator {
  async hash(plain: string): Promise<string> {
    return plain + '-hashed';
  }
  async compare(plain: string, hash: string): Promise<boolean> {
    return plain + '-hashed' === hash;
  }
}

class FakeEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload);
  }
}

let inMemoryUsersRepository: InMemoryUsersRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;
let sut: AuthenticateUserUseCase;

describe('Authenticate User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    fakeHasher = new FakeHasher();
    fakeEncrypter = new FakeEncrypter();
    sut = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      fakeHasher,
      fakeEncrypter,
    );
  });

  it('should be able to authenticate a user', async () => {
    const user = new User({
      id: 'user-1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('password123'),
      role: UserRole.CASHIER,
    });

    await inMemoryUsersRepository.create(user);

    const { accessToken, refreshToken } = await sut.execute({
      email: 'johndoe@example.com',
      password: 'password123',
    });

    expect(accessToken).toEqual(expect.any(String));
    expect(accessToken).toContain('user-1');
    expect(refreshToken).toEqual(expect.any(String));
    expect(refreshToken).toContain('user-1');
  });

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'wrong@example.com',
        password: 'password123',
      }),
    ).rejects.toBeInstanceOf(WrongCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const user = new User({
      id: 'user-2',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('password123'),
      role: UserRole.CASHIER,
    });

    await inMemoryUsersRepository.create(user);

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(WrongCredentialsError);
  });
});
