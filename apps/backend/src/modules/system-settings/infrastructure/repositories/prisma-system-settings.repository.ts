import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/shared/database/prisma/prisma.service'
import { SystemSetting } from '../../domain/entities/system-setting'
import { SystemSettingsRepository } from '../../domain/repositories/system-settings.repository'
import { PrismaSystemSettingMapper } from '../mappers/prisma-system-setting-mapper'

@Injectable()
export class PrismaSystemSettingsRepository
  implements SystemSettingsRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findByParameter(parameter: string): Promise<SystemSetting | null> {
    const raw = await this.prisma.systemSetting.findUnique({
      where: { parameter }
    })

    if (!raw) return null
    return PrismaSystemSettingMapper.toDomain(raw)
  }

  async findByGroup(group: string): Promise<SystemSetting[]> {
    const raw = await this.prisma.systemSetting.findMany({
      where: { group },
      orderBy: { parameter: 'asc' }
    })

    return raw.map(PrismaSystemSettingMapper.toDomain)
  }

  async save(setting: SystemSetting): Promise<void> {
    const data = PrismaSystemSettingMapper.toPrisma(setting)

    // O upsert é a forma mais segura de salvar ou atualizar do Prisma
    await this.prisma.systemSetting.upsert({
      where: { id: data.id },
      create: data,
      update: data
    })
  }
}
