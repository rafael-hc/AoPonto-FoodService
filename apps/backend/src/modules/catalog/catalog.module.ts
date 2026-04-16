import { Module } from '@nestjs/common'
import { ClassificationsModule } from './classifications/classifications.module'
import { ProductsModule } from './products/products.module'
import { WizardModule } from './wizard/wizard.module'

@Module({
  imports: [ProductsModule, ClassificationsModule, WizardModule],
  exports: [ProductsModule, ClassificationsModule, WizardModule]
})
export class CatalogModule {}
