import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const zodErrorIssueSchema = z.object({
  code: z.string(),
  expected: z.string().optional(),
  received: z.string().optional(),
  message: z.string(),
  path: z.array(z.union([z.string(), z.number()]))
})

const zodValidationErrorSchema = z.object({
  statusCode: z.literal(400),
  message: z.literal('Validation failed'),
  error: z.literal('Bad Request'),
  errors: z.array(zodErrorIssueSchema)
})

export class ZodValidationErrorDto extends createZodDto(
  zodValidationErrorSchema
) {}
