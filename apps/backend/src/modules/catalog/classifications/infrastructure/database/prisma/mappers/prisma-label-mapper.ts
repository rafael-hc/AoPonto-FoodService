import type { Label as PrismaLabel } from '@prisma/client'
import { Label } from '@/catalog/classifications/domain/entities/label'

export const PrismaLabelMapper = {
  toDomain(raw: PrismaLabel): Label {
    return new Label({
      id: raw.id,
      description: raw.description,
      order: raw.order,
      type: raw.type,
      externalId: raw.externalId,
      deleteDate: raw.deleteDate,
      versionReg: raw.versionReg,
      versionSync: raw.versionSync,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    })
  },

  toPrisma(label: Label): PrismaLabel {
    return {
      id: label.id,
      description: label.description,
      order: label.order,
      type: label.type,
      externalId: label.externalId,
      deleteDate: label.deleteDate ?? null,
      versionReg: label.versionReg ?? null,
      versionSync: label.versionSync ?? null,
      createdAt: label.createdAt,
      updatedAt: label.updatedAt
    }
  }
}
