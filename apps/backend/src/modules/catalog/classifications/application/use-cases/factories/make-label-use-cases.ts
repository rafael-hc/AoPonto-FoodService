import { LabelsRepository } from '@/catalog/classifications/domain/repositories/labels-repository'
import { DeleteLabelUseCase } from '../delete-label.use-case'
import { EditLabelUseCase } from '../edit-label.use-case'
import { FetchLabelsUseCase } from '../fetch-labels.use-case'
import { RegisterLabelUseCase } from '../register-label.use-case'

export function makeRegisterLabelUseCase(labelsRepository: LabelsRepository) {
  return new RegisterLabelUseCase(labelsRepository)
}

export function makeFetchLabelsUseCase(labelsRepository: LabelsRepository) {
  return new FetchLabelsUseCase(labelsRepository)
}

export function makeEditLabelUseCase(labelsRepository: LabelsRepository) {
  return new EditLabelUseCase(labelsRepository)
}

export function makeDeleteLabelUseCase(labelsRepository: LabelsRepository) {
  return new DeleteLabelUseCase(labelsRepository)
}
