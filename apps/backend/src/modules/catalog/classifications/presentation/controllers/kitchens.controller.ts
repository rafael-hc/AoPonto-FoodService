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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags
} from '@nestjs/swagger'
import { DeleteKitchenUseCase } from '@/catalog/classifications/application/use-cases/delete-kitchen.use-case'
import { EditKitchenUseCase } from '@/catalog/classifications/application/use-cases/edit-kitchen.use-case'
import { FetchKitchensUseCase } from '@/catalog/classifications/application/use-cases/fetch-kitchens.use-case'
import { RegisterKitchenUseCase } from '@/catalog/classifications/application/use-cases/register-kitchen.use-case'
import { EditKitchenDto } from '@/catalog/classifications/presentation/dtos/edit-kitchen.dto'
import {
  FetchKitchensResponseDto,
  SingleKitchenResponseDto
} from '@/catalog/classifications/presentation/dtos/kitchen-response.dto'
import { RegisterKitchenDto } from '@/catalog/classifications/presentation/dtos/register-kitchen.dto'
import { KitchenPresenter } from '@/catalog/classifications/presentation/presenters/kitchen.presenter'
import { ZodValidationErrorDto } from '@/catalog/products/presentation/dtos/zod-validation-error.dto'

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
  @ApiOperation({ summary: 'Register a kitchen' })
  @ApiCreatedResponse({ type: SingleKitchenResponseDto })
  @ApiBadRequestResponse({
    description: 'Invalid payload',
    type: ZodValidationErrorDto
  })
  async register(@Body() body: RegisterKitchenDto) {
    const { kitchen } = await this.registerKitchen.execute(body)
    return { kitchen: KitchenPresenter.toHTTP(kitchen) }
  }

  @Get()
  @ApiOperation({ summary: 'List all kitchens' })
  @ApiOkResponse({ type: FetchKitchensResponseDto })
  async fetch() {
    const { kitchens } = await this.fetchKitchens.execute()
    return { kitchens: kitchens.map(KitchenPresenter.toHTTP) }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit a kitchen by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({ type: SingleKitchenResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  @ApiNotFoundResponse({ description: 'Kitchen not found' })
  async edit(@Param('id') id: string, @Body() body: EditKitchenDto) {
    const { kitchen } = await this.editKitchen.execute({
      id,
      ...body
    })
    return { kitchen: KitchenPresenter.toHTTP(kitchen) }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a kitchen by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Deleted with success' })
  @ApiNotFoundResponse({ description: 'Kitchen not found' })
  @HttpCode(204)
  async deleteOne(@Param('id') id: string) {
    await this.deleteKitchen.execute({ id })
  }
}
