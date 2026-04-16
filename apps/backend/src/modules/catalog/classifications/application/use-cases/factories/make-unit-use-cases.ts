import { UnitsRepository } from '@/catalog/classifications/domain/repositories/units-repository'
import { DeleteUnitUseCase } from '../delete-unit.use-case'
import { EditUnitUseCase } from '../edit-unit.use-case'
import { FetchUnitsUseCase } from '../fetch-units.use-case'
import { RegisterUnitUseCase } from '../register-unit.use-case'

export function makeRegisterUnitUseCase(unitsRepository: UnitsRepository) {
  return new RegisterUnitUseCase(unitsRepository)
}

export function makeFetchUnitsUseCase(unitsRepository: UnitsRepository) {
  return new FetchUnitsUseCase(unitsRepository)
}

export function makeEditUnitUseCase(unitsRepository: UnitsRepository) {
  return new EditUnitUseCase(unitsRepository)
}

export function makeDeleteUnitUseCase(unitsRepository: UnitsRepository) {
  return new DeleteUnitUseCase(unitsRepository)
}
