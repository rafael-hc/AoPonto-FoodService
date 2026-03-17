import { Injectable } from '@nestjs/common'
import { Unit } from '@/catalog/domain/entities/unit'
import { UnitsRepository } from '@/catalog/domain/repositories/units-repository'

@Injectable()
export class RegisterUnitUseCase {
  constructor(private unitsRepository: UnitsRepository) {}

  async execute(props: { initials: string; description?: string | null }) {
    const unit = Unit.create(props)
    await this.unitsRepository.create(unit)
    return { unit }
  }
}
