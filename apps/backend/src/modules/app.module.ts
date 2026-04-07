import { Module, OnModuleInit, Logger } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { CatalogModule } from './catalog/catalog.module'
import { PartiesModule } from './parties/parties.module'
import { SystemSettingsModule } from './system-settings/system-settings.module'
import { DatabaseModule } from './shared/database/database.module'
import { PrismaService } from './shared/database/prisma/prisma.service'
import { Role } from '@prisma/client'

@Module({
  imports: [DatabaseModule, PartiesModule, CatalogModule, AuthModule, SystemSettingsModule],
  controllers: [],
  providers: []
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name)

  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    this.logger.log('Inicializando seed de Permissões RBAC (Híbrido)...')
    const requiredPermissions = [
      { code: 'module:financeiro', module: 'financeiro', description: 'Acesso ao módulo financeiro' },
      { code: 'module:configuracoes', module: 'configuracoes', description: 'Acesso ao módulo de configurações' }
    ]

    for (const perm of requiredPermissions) {
      const dbPerm = await this.prisma.permission.upsert({
        where: { code: perm.code },
        update: {},
        create: perm
      })

      // Garante que o ADMIN default tenha acesso aos módulos base
      await this.prisma.rolePermission.upsert({
        where: { role_permissionId: { role: Role.ADMIN, permissionId: dbPerm.id } },
        update: {},
        create: { role: Role.ADMIN, permissionId: dbPerm.id }
      })
    }
    this.logger.log('Seed de permissões finalizado.')
  }
}
