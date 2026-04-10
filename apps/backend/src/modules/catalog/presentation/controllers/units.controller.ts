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
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { DeleteUnitUseCase } from '@/catalog/application/use-cases/delete-unit.use-case'
import { EditUnitUseCase } from '@/catalog/application/use-cases/edit-unit.use-case'
import { FetchUnitsUseCase } from '@/catalog/application/use-cases/fetch-units.use-case'
import { RegisterUnitUseCase } from '@/catalog/application/use-cases/register-unit.use-case'
import { EditUnitDto } from '@/catalog/presentation/dtos/edit-unit.dto'
import { RegisterUnitDto } from '@/catalog/presentation/dtos/register-unit.dto'
import {
  FetchUnitsResponseDto,
  SingleUnitResponseDto
} from '@/catalog/presentation/dtos/unit-response.dto'
import { UnitPresenter } from '@/catalog/presentation/presenters/unit.presenter'
import { ZodValidationErrorDto } from '@/catalog/presentation/dtos/zod-validation-error.dto'

@ApiTags('Units')
@Controller('units')
export class UnitsController {
  constructor(
    private registerUnit: RegisterUnitUseCase,
    private fetchUnits: FetchUnitsUseCase,
    private editUnit: EditUnitUseCase,
    private deleteUnit: DeleteUnitUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: 'Register a unit' })
  @ApiCreatedResponse({ type: SingleUnitResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid payload', type: ZodValidationErrorDto })
  async register(@Body() body: RegisterUnitDto) {
    const { unit } = await this.registerUnit.execute(body)
    return { unit: UnitPresenter.toHTTP(unit) }
  }

  @Get()
  @ApiOperation({ summary: 'List all units' })
  @ApiOkResponse({ type: FetchUnitsResponseDto })
  async fetch() {
    const { units } = await this.fetchUnits.execute()
    return { units: units.map(UnitPresenter.toHTTP) }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit a unit by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({ type: SingleUnitResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  @ApiNotFoundResponse({ description: 'Unit not found' })
  async edit(@Param('id') id: string, @Body() body: EditUnitDto) {
    const { unit } = await this.editUnit.execute({
      id,
      ...body
    })
    return { unit: UnitPresenter.toHTTP(unit) }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a unit by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Deleted with success' })
  @ApiNotFoundResponse({ description: 'Unit not found' })
  @HttpCode(204)
  async deleteOne(@Param('id') id: string) {
    await this.deleteUnit.execute({ id })
  }
}
