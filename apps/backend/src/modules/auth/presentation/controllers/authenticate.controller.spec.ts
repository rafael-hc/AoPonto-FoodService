import { UnauthorizedException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import type { Response } from 'express'
import { WrongCredentialsError } from '@/auth/domain/errors/wrong-credentials-error'
import { AuthenticateUserUseCase } from '../../application/use-cases/authenticate-user.use-case'
import { AuthenticateController } from './authenticate.controller'

describe('AuthenticateController', () => {
  let sut: AuthenticateController
  let authenticateUserUseCase: AuthenticateUserUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticateController],
      providers: [
        {
          provide: AuthenticateUserUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue({
              accessToken: 'access_token',
              refreshToken: 'refresh_token'
            })
          }
        }
      ]
    }).compile()

    sut = module.get<AuthenticateController>(AuthenticateController)
    authenticateUserUseCase = module.get<AuthenticateUserUseCase>(
      AuthenticateUserUseCase
    )
  })

  const mockResponse = {
    cookie: jest.fn()
  } as unknown as Response

  it('should authenticate user and set cookies', async () => {
    const result = await sut.handle(
      { login: 'any_login', password: 'any_password' },
      mockResponse
    )

    expect(result).toEqual({ message: 'Authenticated successfully' })
    expect(mockResponse.cookie).toHaveBeenCalledWith(
      'access_token',
      'access_token',
      expect.any(Object)
    )
    expect(mockResponse.cookie).toHaveBeenCalledWith(
      'refresh_token',
      'refresh_token',
      expect.any(Object)
    )
  })

  it('should throw UnauthorizedException on wrong credentials', async () => {
    jest
      .spyOn(authenticateUserUseCase, 'execute')
      .mockRejectedValueOnce(new WrongCredentialsError())

    await expect(
      sut.handle({ login: 'any_login', password: 'any_password' }, mockResponse)
    ).rejects.toThrow(UnauthorizedException)
  })
})
