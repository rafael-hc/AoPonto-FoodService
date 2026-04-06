import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const productResponseSchema = z.object({
  id: z.string(),
  code: z.number(),
  name: z.string(),
  description: z.string().nullable().optional(),
  methodOfPreparation: z.string().nullable().optional(),
  price: z.any(), // Decimal do Prisma serializado como string/number
  costPrice: z.any().nullable().optional(),
  minStock: z.number().optional(),
  currentStock: z.number().optional(),
  active: z.boolean().optional(),
  discontinued: z.boolean().optional(),
  labelId: z.string(),
  unitId: z.string(),
  kitchenId: z.string().nullable().optional(),
  productTypeId: z.string(),
  isKitchenItem: z.boolean().optional(),
  useMobileComanda: z.boolean().optional(),
  useDigitalMenu: z.boolean().optional(),
  barcode: z.string().nullable().optional(),
  createdAt: z.any(),
  updatedAt: z.any()
})

export class ProductResponseDto extends createZodDto(productResponseSchema) {}

export class FetchProductsResponseDto extends createZodDto(
  z.object({
    products: z.array(productResponseSchema)
  })
) {}

export class SingleProductResponseDto extends createZodDto(
  z.object({
    product: productResponseSchema
  })
) {}
