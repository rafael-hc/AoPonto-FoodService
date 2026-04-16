import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const productTypeResponseSchema = z.object({
  id: z.uuid(),
  description: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime()
})

export const registerProductTypeSchema = z.object({
  description: z
    .string({ error: 'Descrição é obrigatória' })
    .min(1, { error: 'Descrição não pode ser vazia' })
})

export class SingleProductTypeResponseDto extends createZodDto(
  z.object({
    productType: productTypeResponseSchema
  })
) {}

export class FetchProductTypesResponseDto extends createZodDto(
  z.object({
    productTypes: z.array(productTypeResponseSchema)
  })
) {}
