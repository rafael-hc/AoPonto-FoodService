import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

// Seguindo as regras do zod-4.md: usar error em vez de message e APIs top-level
const registerProductSchema = z.object({
  code: z.number().int({ error: 'O código deve ser um número inteiro' }).optional(),
  barcode: z.string().optional(),
  name: z.string().min(1, { error: 'O nome é obrigatório' }),
  price: z.number().min(0, { error: 'O preço não pode ser negativo' }),
  description: z.string().optional(),
  methodOfPreparation: z.string().optional(),
  costPrice: z.number().optional(),
  minStock: z.number().optional(),
  active: z.boolean().optional(),
  unitId: z.uuid({ error: 'ID de unidade é obrigatório' }),
  kitchenId: z.uuid({ error: 'ID de cozinha inválido' }).optional().nullable(),
  labelId: z.uuid({ error: 'ID de etiqueta é obrigatório' }),
  productTypeId: z.uuid({ error: 'ID de tipo de produto é obrigatório' }),
  isKitchenItem: z.boolean().optional(),
  useMobileComanda: z.boolean().optional(),
  useDigitalMenu: z.boolean().optional()
})


export class RegisterProductDto extends createZodDto(registerProductSchema) {}
