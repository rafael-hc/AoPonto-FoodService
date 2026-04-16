import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const labelResponseSchema = z.strictObject({
  id: z.uuid(),
  code: z.number(),
  description: z.string(),
  order: z.number(),
  type: z.string(),
  externalId: z.string(),
  versionReg: z.number().nullable().optional(),
  versionSync: z.number().nullable().optional(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime().nullable().optional()
})

export class LabelResponseDto extends createZodDto(labelResponseSchema) {}

export class FetchLabelsResponseDto extends createZodDto(
  z.strictObject({
    labels: z.array(labelResponseSchema)
  })
) {}

export class SingleLabelResponseDto extends createZodDto(
  z.strictObject({
    label: labelResponseSchema
  })
) {}
