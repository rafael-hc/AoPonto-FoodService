import { Injectable, NotFoundException } from '@nestjs/common'
import { UnitsRepository } from '@/catalog/classifications/domain/repositories/units-repository'

@Injectable()
export class DeleteUnitUseCase {
  constructor(private unitsRepository: UnitsRepository) {}
  async execute({ id }: { id: string }) {
    const unit = await this.unitsRepository.findById(id)
    if (!unit) throw new NotFoundException('Unidade não encontrada.')

    await this.unitsRepository.delete(id)
  }
}
