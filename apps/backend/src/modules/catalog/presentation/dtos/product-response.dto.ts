import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const productResponseSchema = z.strictObject({
  id: z.uuid(),
  code: z.number(),
  name: z.string(),
  description: z.string().nullable().optional(),
  methodOfPreparation: z.string().nullable().optional(),
  price: z.coerce.number(), // Decimal do Prisma serializado como string/number
  costPrice: z.coerce.number().nullable().optional(),
  minStock: z.number().optional(),
  currentStock: z.number().optional(),
  active: z.boolean().optional(),
  discontinued: z.boolean().optional(),
  labelId: z.uuid(),
  unitId: z.uuid(),
  kitchenId: z.uuid().nullable().optional(),
  productTypeId: z.uuid(),
  isKitchenItem: z.boolean().optional(),
  useMobileComanda: z.boolean().optional(),
  useDigitalMenu: z.boolean().optional(),
  barcode: z.string().nullable().optional(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime()
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
