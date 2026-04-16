import { Injectable } from '@nestjs/common'
import { Label } from '@/catalog/classifications/domain/entities/label'
import { LabelsRepository } from '@/catalog/classifications/domain/repositories/labels-repository'

@Injectable()
export class RegisterLabelUseCase {
  constructor(private labelsRepository: LabelsRepository) {}

  async execute(props: {
    description: string
    order?: number
    type?: string
    externalId: string
    versionReg?: number
    versionSync?: number
  }) {
    const label = Label.create(props)
    await this.labelsRepository.create(label)
    return { label }
  }
}
