import { type ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import type { Request } from 'express'
import type { UserPayload } from '../decorators/current-user.decorator'
import { JwtAuthGuard } from './jwt-auth.guard'

interface MockRequest extends Request {
  user: UserPayload
}

describe('JwtAuthGuard', () => {
  let sut: JwtAuthGuard
  let jwtService: JwtService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
            get: jest.fn().mockResolvedValue(null)
          }
        }
      ]
    }).compile()

    process.env.JWT_SECRET = 'any_secret'

    sut = module.get<JwtAuthGuard>(JwtAuthGuard)
    jwtService = module.get<JwtService>(JwtService)
  })

  const mockExecutionContext = (request: Partial<MockRequest>) =>
    ({
      switchToHttp: () => ({
        getRequest: () => request as MockRequest
      }),
      getHandler: () => jest.fn(),
      getClass: () => jest.fn()
    }) as unknown as ExecutionContext

  it('should be able to extract token from cookies', async () => {
    const request = {
      cookies: { access_token: 'any_token' },
      headers: {}
    } as unknown as MockRequest
    const context = mockExecutionContext(request)

    const result = await sut.canActivate(context)

    expect(result).toBe(true)
    expect(request.user).toEqual({ sub: 'user_id' })
  })

  it('should be able to extract token from Bearer header', async () => {
    const request = {
      cookies: {},
      headers: { authorization: 'Bearer any_token' }
    } as unknown as MockRequest
    const context = mockExecutionContext(request)

    const result = await sut.canActivate(context)

    expect(result).toBe(true)
    expect(request.user).toEqual({ sub: 'user_id' })
  })

  it('should throw UnauthorizedException if token is missing', async () => {
    const request = {
      cookies: {},
      headers: {}
    } as unknown as MockRequest
    const context = mockExecutionContext(request)

    await expect(sut.canActivate(context)).rejects.toThrow(
      UnauthorizedException
    )
  })

  it('should throw UnauthorizedException if token is invalid', async () => {
    const request = {
      cookies: { access_token: 'invalid_token' },
      headers: {}
    } as unknown as MockRequest
    const context = mockExecutionContext(request)

    jest.spyOn(jwtService, 'verifyAsync').mockRejectedValueOnce(new Error())

    await expect(sut.canActivate(context)).rejects.toThrow(
      UnauthorizedException
    )
  })
})
