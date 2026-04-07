import { Module } from '@nestjs/common'

import { SystemSettingsRepository } from './domain/repositories/system-settings.repository'
import { PrismaSystemSettingsRepository } from './infrastructure/repositories/prisma-system-settings.repository'
import { SaveSystemSettingUseCase } from './application/use-cases/save-system-setting.use-case'
import { FetchSettingsByGroupUseCase } from './application/use-cases/fetch-settings-by-group.use-case'
import { SystemSettingsController } from './presentation/controllers/system-settings.controller'

@Module({
  controllers: [SystemSettingsController],
  providers: [
    {
      provide: SystemSettingsRepository,
      useClass: PrismaSystemSettingsRepository
    },
    SaveSystemSettingUseCase,
    FetchSettingsByGroupUseCase
  ],
  exports: [
    SystemSettingsRepository,
    FetchSettingsByGroupUseCase
  ]
})
export class SystemSettingsModule {}
