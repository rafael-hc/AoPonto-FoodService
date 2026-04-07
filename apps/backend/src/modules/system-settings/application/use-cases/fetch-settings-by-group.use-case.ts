import { Injectable } from '@nestjs/common'
import { SystemSettingsRepository } from '../../domain/repositories/system-settings.repository'
import { SystemSetting } from '../../domain/entities/system-setting'

export interface FetchSettingsByGroupRequest {
  group: string
}

@Injectable()
export class FetchSettingsByGroupUseCase {
  constructor(private readonly repository: SystemSettingsRepository) {}

  async execute({ group }: FetchSettingsByGroupRequest): Promise<SystemSetting[]> {
    return this.repository.findByGroup(group)
  }
}
