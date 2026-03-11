import { RefreshTokenUseCase } from './refresh-token.use-case';
import { Encrypter } from '../cryptography/encrypter';

class FakeEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload);
  }
}

let fakeEncrypter: FakeEncrypter;
let sut: RefreshTokenUseCase;

describe('Refresh Token Use Case', () => {
  beforeEach(() => {
    fakeEncrypter = new FakeEncrypter();
    sut = new RefreshTokenUseCase(fakeEncrypter);
  });

  it('should be able to refresh token', async () => {
    const { accessToken, refreshToken } = await sut.execute({
      userId: 'user-1',
    });

    expect(accessToken).toEqual(expect.any(String));
    expect(accessToken).toContain('user-1');
    expect(refreshToken).toEqual(expect.any(String));
    expect(refreshToken).toContain('user-1');
  });
});
