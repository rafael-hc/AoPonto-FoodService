import { User as PrismaUser } from '@prisma/client'
import { User, UserRole } from '@/users/domain/entities/user'

export class PrismaUserMapper {
  static toDomain(
    raw: PrismaUser & {
      contact?: { name: string; email?: string | null; document?: string | null }
    }
  ): User {
    return new User({
      id: raw.id,
      login: raw.login,
      password: raw.password,
      role: raw.role as UserRole,
      active: raw.active,
      contactId: raw.contactId,
      name: raw.contact?.name,
      email: raw.contact?.email ?? undefined,
      document: raw.contact?.document,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt
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
      deletedAt: user.deletedAt,
      contact: {
        connect: {
          id: user.contactId
        }
      }
    }
  }
}
