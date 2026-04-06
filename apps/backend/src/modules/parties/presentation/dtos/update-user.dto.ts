import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'
import { userRoleSchema } from '@/shared/presentation/dtos/common.dto'
import { ApiProperty } from '@nestjs/swagger'
import { UserRole } from '@/parties/domain/entities/user'

const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  document: z.string().min(1).optional(),
  login: z.string().min(3).optional(),
  password: z.string().min(6).optional(),
  role: userRoleSchema.optional(),
  active: z.boolean().optional()
})

export class UpdateUserDto extends createZodDto(updateUserSchema) {
  @ApiProperty({ enum: UserRole, enumName: 'UserRole', required: false })
  declare role?: UserRole
}
