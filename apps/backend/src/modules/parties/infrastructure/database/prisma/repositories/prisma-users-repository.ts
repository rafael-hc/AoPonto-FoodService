import { Injectable } from '@nestjs/common'
import { User } from '@/parties/domain/entities/user'
import { UsersRepository } from '@/parties/domain/repositories/users-repository'
import { PrismaService } from '@/shared/database/prisma/prisma.service'
import { DateUtils } from '@/shared/utils/date-utils'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findByLogin(login: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { login },
      include: { contact: true }
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { id },
      include: { contact: true }
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findMany(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: {
        deletedAt: null
      },
      include: {
        contact: true
      }
    })

    return users.map(PrismaUserMapper.toDomain)
  }

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.create({
      data: {
        id: data.id,
        login: data.login,
        password: data.password,
        role: data.role,
        active: data.active,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        contact: {
          connect: {
            id: user.contactId
          }
        }
      }
    })
  }

  async save(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        login: data.login,
        password: data.password,
        role: data.role,
        active: data.active,
        updatedAt: DateUtils.getBrasiliaDate()
      }
    })
  }

  async delete(user: User): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        deletedAt: DateUtils.getBrasiliaDate(),
        active: false
      }
    })
  }
}
