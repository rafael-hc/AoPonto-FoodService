import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put
} from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { DeleteKitchenUseCase } from '@/catalog/application/use-cases/delete-kitchen.use-case'
import { EditKitchenUseCase } from '@/catalog/application/use-cases/edit-kitchen.use-case'
import { FetchKitchensUseCase } from '@/catalog/application/use-cases/fetch-kitchens.use-case'
import { RegisterKitchenUseCase } from '@/catalog/application/use-cases/register-kitchen.use-case'
import { EditKitchenDto } from '@/catalog/presentation/dtos/edit-kitchen.dto'
import {
  FetchKitchensResponseDto,
  SingleKitchenResponseDto
} from '@/catalog/presentation/dtos/kitchen-response.dto'
import { RegisterKitchenDto } from '@/catalog/presentation/dtos/register-kitchen.dto'
import { KitchenPresenter } from '@/catalog/presentation/presenters/kitchen.presenter'

@ApiTags('Kitchens')
@Controller('kitchens')
export class KitchensController {
  constructor(
    private registerKitchen: RegisterKitchenUseCase,
    private fetchKitchens: FetchKitchensUseCase,
    private editKitchen: EditKitchenUseCase,
    private deleteKitchen: DeleteKitchenUseCase
  ) {}

  @Post()
  @ApiOkResponse({ type: SingleKitchenResponseDto })
  async register(@Body() body: RegisterKitchenDto) {
    const { kitchen } = await this.registerKitchen.execute(body)
    return { kitchen: KitchenPresenter.toHTTP(kitchen) }
  }

  @Get()
  @ApiOkResponse({ type: FetchKitchensResponseDto })
  async fetch() {
    const { kitchens } = await this.fetchKitchens.execute()
    return { kitchens: kitchens.map(KitchenPresenter.toHTTP) }
  }

  @Put(':id')
  @ApiOkResponse({ type: SingleKitchenResponseDto })
  async edit(@Param('id') id: string, @Body() body: EditKitchenDto) {
    const { kitchen } = await this.editKitchen.execute({
      id,
      ...body
    })
    return { kitchen: KitchenPresenter.toHTTP(kitchen) }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteOne(@Param('id') id: string) {
    await this.deleteKitchen.execute({ id })
  }
}
