import { Injectable } from '@nestjs/common'
import { UnitsRepository } from '@/catalog/domain/repositories/units-repository'

@Injectable()
export class FetchUnitsUseCase {
  constructor(private unitsRepository: UnitsRepository) {}
  async execute() {
    const units = await this.unitsRepository.findMany()
    return { units }
  }
}
