import { Test, TestingModule } from '@nestjs/testing'
import type { Response } from 'express'
import { LogoutController } from './logout.controller'

describe('LogoutController', () => {
  let sut: LogoutController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogoutController]
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

    const result = await sut.handle(mockResponse)

    expect(mockResponse.clearCookie).toHaveBeenCalledWith('access_token')
    expect(mockResponse.clearCookie).toHaveBeenCalledWith('refresh_token')
    expect(result).toEqual({ message: 'Logout realizado com sucesso' })
  })
})
