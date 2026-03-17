import { Injectable, NotFoundException } from '@nestjs/common'
import { LabelsRepository } from '@/catalog/domain/repositories/labels-repository'

@Injectable()
export class EditLabelUseCase {
  constructor(private labelsRepository: LabelsRepository) {}
  async execute(props: {
    id: string
    description?: string
    order?: number
    type?: string
    versionReg?: number
    versionSync?: number
  }) {
    const label = await this.labelsRepository.findById(props.id)
    if (!label) throw new NotFoundException('Etiqueta não encontrada.')

    label.updateDetails(props)
    await this.labelsRepository.save(label)
    return { label }
  }
}
