import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query
} from '@nestjs/common'
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { SynchronizeWizardQuestionUseCase } from '@/catalog/application/use-cases/synchronize-wizard-question.use-case'
import { ListWizardQuestionsUseCase } from '@/catalog/application/use-cases/list-wizard-questions.use-case'
import { GetWizardQuestionUseCase } from '@/catalog/application/use-cases/get-wizard-question.use-case'
import { DeleteWizardQuestionUseCase } from '@/catalog/application/use-cases/delete-wizard-question.use-case'
import { SynchronizeWizardQuestionDto } from '../dtos/synchronize-wizard-question.dto'
import { SingleWizardQuestionResponseDto, FetchWizardQuestionsResponseDto } from '../dtos/wizard-question-response.dto'
import { WizardQuestionPresenter } from '../presenters/wizard-question.presenter'
import { ZodValidationErrorDto } from '../dtos/zod-validation-error.dto'

@ApiTags('Wizard Questions (Global Bank)')
@Controller('/wizard-questions')
export class WizardQuestionsController {
  constructor(
    private synchronizeWizardQuestion: SynchronizeWizardQuestionUseCase,
    private listWizardQuestions: ListWizardQuestionsUseCase,
    private getWizardQuestion: GetWizardQuestionUseCase,
    private deleteWizardQuestion: DeleteWizardQuestionUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: 'Synchronize (Create/Update) a wizard question with its options' })
  @ApiCreatedResponse({ type: SingleWizardQuestionResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid payload', type: ZodValidationErrorDto })
  async sync(@Body() body: SynchronizeWizardQuestionDto) {
    const { wizardQuestion } = await this.synchronizeWizardQuestion.execute(body)

    return {
      wizardQuestion: WizardQuestionPresenter.toHTTP(wizardQuestion)
    }
  }

  @Get()
  @ApiOperation({ summary: 'List all available wizard questions' })
  @ApiOkResponse({ type: FetchWizardQuestionsResponseDto })
  async list(@Query('search') search?: string) {
    const { wizardQuestions } = await this.listWizardQuestions.execute({ search })

    return {
      wizardQuestions: wizardQuestions.map(WizardQuestionPresenter.toHTTP)
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a wizard question by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({ type: SingleWizardQuestionResponseDto })
  @ApiNotFoundResponse({ description: 'Question not found' })
  async getOne(@Param('id') id: string) {
    const { wizardQuestion } = await this.getWizardQuestion.execute({ id })

    return {
      wizardQuestion: WizardQuestionPresenter.toHTTP(wizardQuestion)
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a wizard question by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Deleted with success' })
  @ApiNotFoundResponse({ description: 'Question not found' })
  @HttpCode(204)
  async deleteOne(@Param('id') id: string) {
    await this.deleteWizardQuestion.execute({ id })
  }
}
