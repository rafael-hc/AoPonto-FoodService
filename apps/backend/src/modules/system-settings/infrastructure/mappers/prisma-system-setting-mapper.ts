import { SystemSetting as PrismaSystemSetting } from '@prisma/client'
import { SystemSetting } from '../../domain/entities/system-setting'

export const PrismaSystemSettingMapper = {
  toDomain(raw: PrismaSystemSetting): SystemSetting {
    return SystemSetting.restore({
      id: raw.id,
      parameter: raw.parameter,
      value: raw.value,
      type: raw.type,
      group: raw.group,
      description: raw.description,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    })
  },

  toPrisma(setting: SystemSetting): PrismaSystemSetting {
    return {
      id: setting.id,
      parameter: setting.parameter,
      value: setting.value ?? null,
      type: setting.type,
      group: setting.group,
      description: setting.description ?? null,
      createdAt: setting.createdAt ?? new Date(),
      updatedAt: setting.updatedAt ?? new Date()
    }
  }
}
