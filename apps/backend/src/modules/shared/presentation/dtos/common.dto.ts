import { z } from 'zod'
import { UserRole } from '@/parties/domain/entities/user'

export const userRoleSchema = z.enum(UserRole).describe('UserRole')
