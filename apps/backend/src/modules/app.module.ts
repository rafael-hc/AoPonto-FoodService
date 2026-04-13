import { Logger, Module, OnModuleInit } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { Role } from '@prisma/client'
import { AuthModule } from './auth/auth.module'
import { JwtAuthGuard } from './auth/presentation/guards/jwt-auth.guard'
import { CatalogModule } from './catalog/catalog.module'
import { OrdersModule } from './orders/orders.module'
import { PartiesModule } from './parties/parties.module'
import { DatabaseModule } from './shared/database/database.module'
import { PrismaService } from './shared/database/prisma/prisma.service'
import { RedisModule } from './shared/redis/redis.module'
import { SystemSettingsModule } from './system-settings/system-settings.module'

@Module({
  imports: [
    DatabaseModule,
    PartiesModule,
    CatalogModule,
    AuthModule,
    SystemSettingsModule,
    OrdersModule,
    RedisModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100
      }
    ])
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name)

  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    this.logger.log('Inicializando seed de Permissões RBAC (Híbrido)...')
    const requiredPermissions = [
      {
        code: 'module:financeiro',
        module: 'financeiro',
        description: 'Acesso ao módulo financeiro'
      },
      {
        code: 'module:configuracoes',
        module: 'configuracoes',
        description: 'Acesso ao módulo de configurações'
      }
    ]

    for (const perm of requiredPermissions) {
      const dbPerm = await this.prisma.permission.upsert({
        where: { code: perm.code },
        update: {},
        create: perm
      })

      // Garante que o ADMIN default tenha acesso aos módulos base
      await this.prisma.rolePermission.upsert({
        where: {
          role_permissionId: { role: Role.ADMIN, permissionId: dbPerm.id }
        },
        update: {},
        create: { role: Role.ADMIN, permissionId: dbPerm.id }
      })
    }
    this.logger.log('Seed de permissões finalizado.')
  }
}
