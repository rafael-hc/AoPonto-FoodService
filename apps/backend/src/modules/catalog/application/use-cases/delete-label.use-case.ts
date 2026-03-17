import { Injectable, NotFoundException } from '@nestjs/common'
import { LabelsRepository } from '@/catalog/domain/repositories/labels-repository'

@Injectable()
export class DeleteLabelUseCase {
  constructor(private labelsRepository: LabelsRepository) {}
  async execute({ id }: { id: string }) {
    const label = await this.labelsRepository.findById(id)
    if (!label) throw new NotFoundException('Etiqueta não encontrada.')

    label.delete()
    await this.labelsRepository.save(label)
  }
}
