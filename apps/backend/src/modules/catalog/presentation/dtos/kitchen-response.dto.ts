import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const kitchenResponseSchema = z.strictObject({
  id: z.uuid(),
  description: z.string(),
  ip: z.string(),
  port: z.string(),
  printer: z.string(),
  versionReg: z.number().nullable().optional(),
  versionSync: z.number().nullable().optional(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime().nullable().optional()
})

export class KitchenResponseDto extends createZodDto(kitchenResponseSchema) {}

export class FetchKitchensResponseDto extends createZodDto(
  z.strictObject({
    kitchens: z.array(kitchenResponseSchema)
  })
) {}

export class SingleKitchenResponseDto extends createZodDto(
  z.strictObject({
    kitchen: kitchenResponseSchema
  })
) {}
