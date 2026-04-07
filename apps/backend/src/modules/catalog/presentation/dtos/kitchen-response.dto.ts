import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const kitchenResponseSchema = z.object({
  id: z.uuid(),
  description: z.string(),
  ip: z.string(),
  port: z.string(),
  printer: z.string(),
  versionReg: z.number().nullable().optional(),
  versionSync: z.number().nullable().optional(),
  createdAt: z.any(),
  updatedAt: z.any().nullable().optional()
})

export class KitchenResponseDto extends createZodDto(kitchenResponseSchema) {}

export class FetchKitchensResponseDto extends createZodDto(
  z.object({
    kitchens: z.array(kitchenResponseSchema)
  })
) {}

export class SingleKitchenResponseDto extends createZodDto(
  z.object({
    kitchen: kitchenResponseSchema
  })
) {}
