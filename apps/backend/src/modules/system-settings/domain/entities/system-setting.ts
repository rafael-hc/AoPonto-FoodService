import { randomUUID } from 'node:crypto'

export interface SystemSettingProps {
  id?: string
  parameter: string
  value?: string | null
  type: string
  group: string
  description?: string | null
  createdAt?: Date
  updatedAt?: Date
}

export class SystemSetting {
  private props: SystemSettingProps

  private constructor(props: SystemSettingProps) {
    this.props = { ...props }
  }

  /**
   * Factory method para criar uma configuração nova.
   */
  static create(props: Omit<SystemSettingProps, 'id' | 'createdAt' | 'updatedAt'>): SystemSetting {
    return new SystemSetting({
      ...props,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  /**
   * Factory method para restaurar os dados vindos do banco de Dados.
   */
  static restore(props: SystemSettingProps): SystemSetting {
    return new SystemSetting(props)
  }

  get id() { return this.props.id! }
  get parameter() { return this.props.parameter }
  get value() { return this.props.value ?? null }
  get type() { return this.props.type }
  get group() { return this.props.group }
  get description() { return this.props.description ?? null }
  get createdAt() { return this.props.createdAt }
  get updatedAt() { return this.props.updatedAt }

  updateValue(newValue: string | null) {
    this.props.value = newValue
    this.props.updatedAt = new Date()
  }

  updateDescription(newDescription: string | null) {
    this.props.description = newDescription
    this.props.updatedAt = new Date()
  }
}
