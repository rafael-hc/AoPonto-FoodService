import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { GetProfileController } from './get-profile.controller'
import { PrismaService } from '@/shared/database/prisma/prisma.service'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'

describe('GetProfileController', () => {
  let sut: GetProfileController
  let prisma: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetProfileController],
      providers: [
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn()
            },
            rolePermission: {
              findMany: jest.fn()
            }
          }
        },
        {
          provide: JwtService,
          useValue: {}
        }
      ]
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile()

    sut = module.get<GetProfileController>(GetProfileController)
    prisma = module.get<PrismaService>(PrismaService)
  })

  const mockUserPayload = { sub: 'user_id' }

  it('should return user profile if found', async () => {
    const mockUser = {
      id: 'user_id',
      login: 'john',
      role: 'ADMIN',
      active: true,
      contact: {
        id: 'contact_id',
        name: 'John Doe',
        email: 'john@example.com',
        document: '123'
      },
      permissions: [{ permission: { code: 'P1' } }]
    }

    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser as unknown as null)
    jest.spyOn(prisma.rolePermission, 'findMany').mockResolvedValue([])

    const result = await sut.handle(mockUserPayload)

    expect(result.user.login).toBe('john')
    expect(result.user.permissions).toContain('P1')
  })

  it('should throw NotFoundException if user not found', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null)

    await expect(sut.handle(mockUserPayload)).rejects.toThrow(NotFoundException)
  })
})
