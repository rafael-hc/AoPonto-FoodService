import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import type { Response } from 'express'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { LogoutController } from './logout.controller'

describe('LogoutController', () => {
  let sut: LogoutController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogoutController],
      providers: [
        JwtAuthGuard,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn().mockResolvedValue({ sub: 'user_id' })
          }
        },
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn().mockReturnValue(false)
          }
        },
        {
          provide: 'REDIS_CLIENT',
          useValue: {
            get: jest.fn().mockResolvedValue(null),
            set: jest.fn()
          }
        }
      ]
    }).compile()

    sut = module.get<LogoutController>(LogoutController)
  })

  it('should clear cookies and return success message', async () => {
    const mockResponse = {
      clearCookie: jest.fn(),
      send: jest
        .fn()
        .mockReturnValue({ message: 'Logout realizado com sucesso' })
    } as unknown as Response

    const mockRequest = {
      cookies: { access_token: 'any-token' },
      headers: {}
    } as any

    const result = await sut.handle(mockRequest, mockResponse)

    expect(mockResponse.clearCookie).toHaveBeenCalledWith('access_token')
    expect(mockResponse.clearCookie).toHaveBeenCalledWith('refresh_token')
    expect(result).toEqual({ message: 'Logout realizado com sucesso' })
  })
})
