import type { Unit as PrismaUnit } from '@prisma/client'
import { Unit } from '@/catalog/domain/entities/unit'

export const PrismaUnitMapper = {
  toDomain(raw: PrismaUnit): Unit {
    return new Unit({
      id: raw.id,
      initials: raw.initials,
      description: raw.description,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    })
  },

  toPrisma(unit: Unit): PrismaUnit {
    return {
      id: unit.id,
      initials: unit.initials,
      description: unit.description ?? null,
      createdAt: unit.createdAt ?? new Date(),
      updatedAt: unit.updatedAt ?? new Date()
    }
  }
}
