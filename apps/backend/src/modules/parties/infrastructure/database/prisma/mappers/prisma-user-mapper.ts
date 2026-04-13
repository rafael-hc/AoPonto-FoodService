import type { User as PrismaUser } from '@prisma/client'
import { User, type UserRole } from '@/parties/domain/entities/user'

export const PrismaUserMapper = {
  toDomain(
    raw: PrismaUser & {
      contact?: {
        name: string
        email?: string | null
        document?: string | null
      }
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
      document: raw.contact?.document ?? undefined,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
      failureAttempts: raw.failureAttempts,
      lockUntil: raw.lockUntil,
      passwordChangeRequired: raw.passwordChangeRequired
    })
  },

  toPrisma(user: User) {
    return {
      id: user.id,
      login: user.login,
      password: user.password,
      role: user.role,
      active: user.active,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
      failureAttempts: user.failureAttempts,
      lockUntil: user.lockUntil,
      passwordChangeRequired: user.passwordChangeRequired,
      contact: {
        connect: {
          id: user.contactId
        }
      }
    }
  }
}
