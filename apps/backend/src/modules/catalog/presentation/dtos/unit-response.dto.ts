import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const unitResponseSchema = z.object({
  id: z.uuid(),
  initials: z.string(),
  description: z.string().nullable(),
  createdAt: z.any(),
  updatedAt: z.any()
})

export class SingleUnitResponseDto extends createZodDto(
  z.object({
    unit: unitResponseSchema
  })
) {}

export class FetchUnitsResponseDto extends createZodDto(
  z.object({
    units: z.array(unitResponseSchema)
  })
) {}
