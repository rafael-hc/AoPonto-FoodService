import { Injectable } from '@nestjs/common'
import { LabelsRepository } from '@/catalog/classifications/domain/repositories/labels-repository'

@Injectable()
export class FetchLabelsUseCase {
  constructor(private labelsRepository: LabelsRepository) {}
  async execute() {
    const labels = await this.labelsRepository.findMany()
    return { labels }
  }
}
