import { Injectable, NotFoundException } from '@nestjs/common'
import { UnitsRepository } from '@/catalog/domain/repositories/units-repository'

@Injectable()
export class EditUnitUseCase {
  constructor(private unitsRepository: UnitsRepository) {}
  async execute(props: {
    id: string
    initials?: string
    description?: string | null
  }) {
    const unit = await this.unitsRepository.findById(props.id)
    if (!unit) throw new NotFoundException('Unidade não encontrada.')

    unit.updateDetails(props)
    await this.unitsRepository.save(unit)
    return { unit }
  }
}
