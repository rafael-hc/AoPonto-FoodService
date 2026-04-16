import { Test, TestingModule } from '@nestjs/testing'
import { DeleteLabelUseCase } from '@/catalog/classifications/application/use-cases/delete-label.use-case'
import { EditLabelUseCase } from '@/catalog/classifications/application/use-cases/edit-label.use-case'
import { FetchLabelsUseCase } from '@/catalog/classifications/application/use-cases/fetch-labels.use-case'
import { RegisterLabelUseCase } from '@/catalog/classifications/application/use-cases/register-label.use-case'
import { Label } from '@/catalog/classifications/domain/entities/label'
import { LabelsController } from './labels.controller'

describe('LabelsController', () => {
  let controller: LabelsController
  let registerLabel: RegisterLabelUseCase
  let fetchLabels: FetchLabelsUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LabelsController],
      providers: [
        {
          provide: RegisterLabelUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: FetchLabelsUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: EditLabelUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: DeleteLabelUseCase,
          useValue: { execute: jest.fn() }
        }
      ]
    }).compile()

    controller = module.get<LabelsController>(LabelsController)
    registerLabel = module.get<RegisterLabelUseCase>(RegisterLabelUseCase)
    fetchLabels = module.get<FetchLabelsUseCase>(FetchLabelsUseCase)
  })

  it('should register a label', async () => {
    const label = Label.create({
      description: 'L1',
      externalId: 'ext1'
    })

    jest.spyOn(registerLabel, 'execute').mockResolvedValue({ label })

    const result = await controller.register({
      description: 'L1',
      externalId: 'ext1'
    })

    expect(result.label.description).toBe('L1')
  })

  it('should fetch labels', async () => {
    const label = Label.create({
      description: 'L1',
      externalId: 'ext1'
    })

    jest.spyOn(fetchLabels, 'execute').mockResolvedValue({ labels: [label] })

    const result = await controller.fetch()

    expect(result.labels).toHaveLength(1)
  })
})
