import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { CatalogModule } from './catalog/catalog.module'
import { PartiesModule } from './parties/parties.module'
import { DatabaseModule } from './shared/database/database.module'

@Module({
  imports: [DatabaseModule, PartiesModule, CatalogModule, AuthModule],
  controllers: [],
  providers: []
})
export class AppModule {}
