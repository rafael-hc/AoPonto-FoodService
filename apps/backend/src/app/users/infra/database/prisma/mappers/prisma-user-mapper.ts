import { User as PrismaUser } from '@prisma/client'
import { User, UserRole } from '@/users/domain/entities/user'

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return new User({
      id: raw.id,
      login: raw.login,
      password: raw.password,
      role: raw.role as UserRole,
      active: raw.active,
      contactId: raw.contactId,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    })
  }

  static toPrisma(user: User) {
    return {
      id: user.id,
      login: user.login,
      password: user.password,
      role: user.role,
      active: user.active,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      contact: {
        connect: {
          id: user.contactId
        }
      }
    }
  }
}
