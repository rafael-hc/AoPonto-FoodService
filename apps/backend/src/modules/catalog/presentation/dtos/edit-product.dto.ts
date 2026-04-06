import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const editProductSchema = z.object({
  name: z.string().min(1, { error: 'O nome deve ter ao menos 1 caractere' }).optional(),
  barcode: z.string().optional(),
  description: z.string().optional(),
  methodOfPreparation: z.string().optional(),
  price: z.number().min(0, { error: 'O preço não pode ser negativo' }).optional(),
  costPrice: z.number().optional(),
  minStock: z.number().int({ error: 'O estoque mínimo deve ser um inteiro' }).optional(),
  active: z.boolean().optional(),
  discontinued: z.boolean().optional(),
  labelId: z.uuid({ error: 'ID de categoria inválido' }).optional(),
  unitId: z.uuid({ error: 'ID de unidade inválido' }).optional(),
  kitchenId: z.uuid({ error: 'ID de cozinha inválido' }).optional().nullable(),
  productTypeId: z.uuid({ error: 'ID de tipo de produto inválido' }).optional(),
  isKitchenItem: z.boolean().optional(),
  useMobileComanda: z.boolean().optional(),
  useDigitalMenu: z.boolean().optional()
})

export class EditProductDto extends createZodDto(editProductSchema) {}
