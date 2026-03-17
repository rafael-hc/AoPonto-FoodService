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
  @ApiOkResponse({ type: SingleUnitResponseDto })
  async register(@Body() body: RegisterUnitDto) {
    const { unit } = await this.registerUnit.execute(body)
    return { unit: UnitPresenter.toHTTP(unit) }
  }

  @Get()
  @ApiOkResponse({ type: FetchUnitsResponseDto })
  async fetch() {
    const { units } = await this.fetchUnits.execute()
    return { units: units.map(UnitPresenter.toHTTP) }
  }

  @Put(':id')
  @ApiOkResponse({ type: SingleUnitResponseDto })
  async edit(@Param('id') id: string, @Body() body: EditUnitDto) {
    const { unit } = await this.editUnit.execute({
      id,
      ...body
    })
    return { unit: UnitPresenter.toHTTP(unit) }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteOne(@Param('id') id: string) {
    await this.deleteUnit.execute({ id })
  }
}
