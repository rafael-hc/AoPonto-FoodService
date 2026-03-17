import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'
import { UserRole } from '@/parties/domain/entities/user'

export const userResponseSchema = z.object({
  id: z.string().uuid(),
  login: z.string(),
  role: z.enum(UserRole),
  active: z.boolean(),
  name: z.string(),
  email: z.string().email(),
  document: z.string(),
  contactId: z.string().uuid()
})

export class UserResponseDto extends createZodDto(userResponseSchema) {}

export class FetchUsersResponseDto extends createZodDto(
  z.object({
    users: z.array(userResponseSchema)
  })
) {}

export class GetProfileResponseDto extends createZodDto(
  z.object({
    user: userResponseSchema
  })
) {}
