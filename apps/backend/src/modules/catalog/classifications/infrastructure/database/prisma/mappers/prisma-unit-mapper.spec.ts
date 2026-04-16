import { Unit } from '@/catalog/classifications/domain/entities/unit'
import { PrismaUnitMapper } from './prisma-unit-mapper'

describe('PrismaUnitMapper', () => {
  it('should be able to map to domain', () => {
    const raw = {
      id: 'unit-1',
      initials: 'UN',
      description: 'Unit 1',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const unit = PrismaUnitMapper.toDomain(raw)

    expect(unit.id).toBe('unit-1')
    expect(unit.initials).toBe('UN')
  })

  it('should be able to map to prisma', () => {
    const unit = Unit.create({
      initials: 'UN',
      description: 'Unit 1'
    })

    const raw = PrismaUnitMapper.toPrisma(unit)

    expect(raw.id).toBe(unit.id)
    expect(raw.initials).toBe('UN')
  })
})
