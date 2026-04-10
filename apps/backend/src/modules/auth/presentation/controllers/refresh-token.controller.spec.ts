import { UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import type { Request, Response } from 'express'
import { RefreshTokenUseCase } from '../../application/use-cases/refresh-token.use-case'
import { RefreshTokenController } from './refresh-token.controller'

describe('RefreshTokenController', () => {
  let sut: RefreshTokenController
  let jwtService: JwtService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RefreshTokenController],
      providers: [
        {
          provide: RefreshTokenUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue({
              accessToken: 'new_access_token',
              refreshToken: 'new_refresh_token'
            })
          }
        },
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn().mockResolvedValue({ sub: 'user_id' })
          }
        }
      ]
    }).compile()

    sut = module.get<RefreshTokenController>(RefreshTokenController)
    jwtService = module.get<JwtService>(JwtService)
  })

  const mockResponse = {
    cookie: jest.fn()
  } as unknown as Response

  const mockRequest = {
    cookies: {
      refresh_token: 'old_refresh_token'
    }
  } as unknown as Request

  it('should refresh token and set new cookies', async () => {
    const result = await sut.handle(mockRequest, mockResponse)

    expect(result.message).toBe('Token refreshed successfully')
    expect(mockResponse.cookie).toHaveBeenCalledWith(
      'access_token',
      'new_access_token',
      expect.any(Object)
    )
  })

  it('should throw UnauthorizedException if refresh token is missing', async () => {
    const emptyRequest = { cookies: {} } as unknown as Request

    await expect(sut.handle(emptyRequest, mockResponse)).rejects.toThrow(
      new UnauthorizedException('Refresh token missing')
    )
  })

  it('should throw UnauthorizedException if refresh token is invalid', async () => {
    jest.spyOn(jwtService, 'verifyAsync').mockRejectedValueOnce(new Error())

    await expect(sut.handle(mockRequest, mockResponse)).rejects.toThrow(
      new UnauthorizedException('Invalid refresh token')
    )
  })
})
