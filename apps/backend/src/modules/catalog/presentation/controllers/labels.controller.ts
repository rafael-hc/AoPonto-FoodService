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
import { DeleteLabelUseCase } from '@/catalog/application/use-cases/delete-label.use-case'
import { EditLabelUseCase } from '@/catalog/application/use-cases/edit-label.use-case'
import { FetchLabelsUseCase } from '@/catalog/application/use-cases/fetch-labels.use-case'
import { RegisterLabelUseCase } from '@/catalog/application/use-cases/register-label.use-case'
import { EditLabelDto } from '@/catalog/presentation/dtos/edit-label.dto'
import {
  FetchLabelsResponseDto,
  SingleLabelResponseDto
} from '@/catalog/presentation/dtos/label-response.dto'
import { RegisterLabelDto } from '@/catalog/presentation/dtos/register-label.dto'
import { ZodValidationErrorDto } from '@/catalog/presentation/dtos/zod-validation-error.dto'
import { LabelPresenter } from '@/catalog/presentation/presenters/label.presenter'

@ApiTags('Labels')
@Controller('labels')
export class LabelsController {
  constructor(
    private registerLabel: RegisterLabelUseCase,
    private fetchLabels: FetchLabelsUseCase,
    private editLabel: EditLabelUseCase,
    private deleteLabel: DeleteLabelUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: 'Register a label' })
  @ApiCreatedResponse({ type: SingleLabelResponseDto })
  @ApiBadRequestResponse({
    description: 'Invalid payload',
    type: ZodValidationErrorDto
  })
  async register(@Body() body: RegisterLabelDto) {
    const { label } = await this.registerLabel.execute(body)
    return { label: LabelPresenter.toHTTP(label) }
  }

  @Get()
  @ApiOperation({ summary: 'List all labels' })
  @ApiOkResponse({ type: FetchLabelsResponseDto })
  async fetch() {
    const { labels } = await this.fetchLabels.execute()
    return { labels: labels.map(LabelPresenter.toHTTP) }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit a label by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({ type: SingleLabelResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  @ApiNotFoundResponse({ description: 'Label not found' })
  async edit(@Param('id') id: string, @Body() body: EditLabelDto) {
    const { label } = await this.editLabel.execute({
      id,
      ...body
    })
    return { label: LabelPresenter.toHTTP(label) }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a label by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Deleted with success' })
  @ApiNotFoundResponse({ description: 'Label not found' })
  @HttpCode(204)
  async deleteOne(@Param('id') id: string) {
    await this.deleteLabel.execute({ id })
  }
}
