import { Injectable } from '@nestjs/common'
import { SystemSetting } from '../../domain/entities/system-setting'
import { SystemSettingsRepository } from '../../domain/repositories/system-settings.repository'

export interface SaveSystemSettingRequest {
  parameter: string
  value?: string | null
  type: string
  group: string
  description?: string | null
}

@Injectable()
export class SaveSystemSettingUseCase {
  constructor(private readonly repository: SystemSettingsRepository) {}

  async execute(request: SaveSystemSettingRequest): Promise<SystemSetting> {
    const { parameter, value, type, group, description } = request

    let setting = await this.repository.findByParameter(parameter)

    if (setting) {
      // SystemSetting existente: faz a atualização via regras de negócio
      setting.updateValue(value ?? null)
      if (description !== undefined) {
        setting.updateDescription(description ?? null)
      }
    } else {
      // Configuration nova: cria usando o Factory Create
      setting = SystemSetting.create({
        parameter,
        value: value ?? null,
        type,
        group,
        description: description ?? null
      })
    }

    await this.repository.save(setting)

    return setting
  }
}
