import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { JwtEncrypter } from './jwt-encrypter'

describe('JwtEncrypter', () => {
  let sut: JwtEncrypter
  let jwtService: JwtService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtEncrypter,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('any_token')
          }
        }
      ]
    }).compile()

    sut = module.get<JwtEncrypter>(JwtEncrypter)
    jwtService = module.get<JwtService>(JwtService)
  })

  it('should call signAsync with correct values', async () => {
    const signSpy = jest.spyOn(jwtService, 'signAsync')

    await sut.encrypt({ sub: 'user_id' }, { expiresIn: '1d' })

    expect(signSpy).toHaveBeenCalledWith(
      { sub: 'user_id' },
      { expiresIn: '1d' }
    )
  })

  it('should return a token on success', async () => {
    const result = await sut.encrypt({ sub: 'user_id' })

    expect(result).toBe('any_token')
  })
})
