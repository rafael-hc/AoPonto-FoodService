import type { Kitchen as PrismaKitchen } from '@prisma/client'
import { Kitchen } from '@/catalog/classifications/domain/entities/kitchen'

export const PrismaKitchenMapper = {
  toDomain(raw: PrismaKitchen): Kitchen {
    return new Kitchen({
      id: raw.id,
      description: raw.description,
      ip: raw.ip,
      port: raw.port,
      printer: raw.printer,
      versionReg: raw.versionReg,
      versionSync: raw.versionSync,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    })
  },

  toPrisma(kitchen: Kitchen): PrismaKitchen {
    return {
      id: kitchen.id,
      description: kitchen.description,
      ip: kitchen.ip,
      port: kitchen.port,
      printer: kitchen.printer,
      versionReg: kitchen.versionReg ?? null,
      versionSync: kitchen.versionSync ?? null,
      createdAt: kitchen.createdAt ?? new Date(),
      updatedAt: kitchen.updatedAt ?? new Date()
    }
  }
}
