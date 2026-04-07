import { Controller, Get, Put, Body, Query, UseGuards } from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery
} from '@nestjs/swagger'
import { JwtAuthGuard } from '@/auth/presentation/guards/jwt-auth.guard'
import { FetchSettingsByGroupUseCase } from '../../application/use-cases/fetch-settings-by-group.use-case'
import { SaveSystemSettingUseCase } from '../../application/use-cases/save-system-setting.use-case'
import { SaveSettingDto } from '../dtos/save-setting.dto'
import { SettingResponseDto } from '../dtos/setting-response.dto'

@ApiTags('System Settings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('system-settings')
export class SystemSettingsController {
  constructor(
    private readonly saveUseCase: SaveSystemSettingUseCase,
    private readonly fetchByGroupUseCase: FetchSettingsByGroupUseCase
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Busca todas as configurações pertencentes a um grupo específico'
  })
  @ApiQuery({ name: 'group', required: true, example: 'Configuração Geral' })
  @ApiResponse({ status: 200, type: [SettingResponseDto] })
  async findByGroup(
    @Query('group') group: string
  ): Promise<SettingResponseDto[]> {
    const settings = await this.fetchByGroupUseCase.execute({ group })
    return settings.map(SettingResponseDto.fromDomain)
  }

  @Put()
  @ApiOperation({
    summary: 'Salva ou atualiza uma configuração (Upsert baseada no parametro)'
  })
  @ApiResponse({ status: 200, type: SettingResponseDto })
  async save(@Body() dto: SaveSettingDto): Promise<SettingResponseDto> {
    const setting = await this.saveUseCase.execute(dto)
    return SettingResponseDto.fromDomain(setting)
  }
}
