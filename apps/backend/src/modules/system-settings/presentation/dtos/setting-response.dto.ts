import { ApiProperty } from '@nestjs/swagger'
import { SystemSetting } from '../../domain/entities/system-setting'

export class SettingResponseDto {
  @ApiProperty()
  id!: string

  @ApiProperty()
  parameter!: string

  @ApiProperty({ nullable: true })
  value!: string | null

  @ApiProperty()
  type!: string

  @ApiProperty()
  group!: string

  @ApiProperty({ nullable: true })
  description!: string | null

  static fromDomain(setting: SystemSetting): SettingResponseDto {
    return {
      id: setting.id,
      parameter: setting.parameter,
      value: setting.value,
      type: setting.type,
      group: setting.group,
      description: setting.description
    }
  }
}
