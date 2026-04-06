import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'
import { userRoleSchema } from '@/shared/presentation/dtos/common.dto'
import { UserRole } from '@/parties/domain/entities/user'
import { ApiProperty } from '@nestjs/swagger'

export const userResponseSchema = z.object({
  id: z.string().uuid(),
  login: z.string(),
  role: userRoleSchema,
  active: z.boolean(),
  name: z.string(),
  email: z.string().email(),
  document: z.string(),
  contactId: z.string().uuid(),
  permissions: z.array(z.string()).optional()
})

export class UserResponseDto extends createZodDto(userResponseSchema) {
  @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
  declare role: UserRole
}

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
