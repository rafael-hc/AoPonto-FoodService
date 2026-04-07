import { SystemSetting } from '../entities/system-setting'

export abstract class SystemSettingsRepository {
  abstract findByParameter(parameter: string): Promise<SystemSetting | null>
  abstract findByGroup(group: string): Promise<SystemSetting[]>
  abstract save(setting: SystemSetting): Promise<void>
}
