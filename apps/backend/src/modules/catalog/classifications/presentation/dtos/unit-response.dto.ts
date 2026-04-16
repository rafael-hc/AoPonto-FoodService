import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const unitResponseSchema = z.strictObject({
  id: z.uuid(),
  initials: z.string(),
  description: z.string().nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime()
})

export class SingleUnitResponseDto extends createZodDto(
  z.strictObject({
    unit: unitResponseSchema
  })
) {}

export class FetchUnitsResponseDto extends createZodDto(
  z.strictObject({
    units: z.array(unitResponseSchema)
  })
) {}
