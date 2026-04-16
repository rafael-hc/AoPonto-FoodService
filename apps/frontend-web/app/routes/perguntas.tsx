import { Badge, Button, Card } from '@aoponto/ui-kit'
import {
  HelpCircle,
  Info,
  Layers,
  Pencil,
  Plus,
  Search,
  Settings2,
  Trash2
} from 'lucide-react'
import { useState } from 'react'
import { FetchWizardQuestionsResponseDtoWizardQuestionsItem as WizardQuestion } from '../api/generated/model/fetchWizardQuestionsResponseDtoWizardQuestionsItem'
import {
  useWizardQuestionsControllerDeleteOne,
  useWizardQuestionsControllerList
} from '../api/generated/wizard-questions-global-bank/wizard-questions-global-bank'
import { CatalogTableLayout } from '../components/catalog/CatalogTableLayout'
import { WizardQuestionModal } from '../components/wizard/WizardQuestionModal'

interface QuestionRowProps {
  question: WizardQuestion
  onEdit: (question: WizardQuestion) => void
  onDelete: (id: string) => void
}

function QuestionRow({ question, onEdit, onDelete }: QuestionRowProps) {
  const optionsCount = question.options?.length || 0

  return (
    <tr className="hover:bg-slate-50/50 transition-colors group border-b border-slate-50 last:border-0 text-sm">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-50 text-orange-600 rounded-lg group-hover:bg-orange-100 transition-colors">
            <HelpCircle size={16} />
          </div>
          <span className="font-bold text-slate-900 truncate max-w-[300px]">
            {question.description}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="font-mono text-[11px] font-black text-slate-500 bg-slate-100 px-1.5 py-1 rounded w-fit">
          #{String(question.internalCode).padStart(4, '0')}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-tight">
            <Settings2 size={12} className="text-slate-400" />
            <span>
              Respostas: {question.minResponses} a {question.maxResponses}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
            <Layers size={12} className="text-slate-300" />
            <span>
              Itens: {question.minItems} a {question.maxItems}
            </span>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <Badge
          variant="outline"
          className="font-bold text-[10px] uppercase border-blue-100 bg-blue-50 text-blue-600 py-0.5 px-2"
        >
          {optionsCount} {optionsCount === 1 ? 'Opção' : 'Opções'}
        </Badge>
      </td>
      <td className="px-6 py-4">
        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 font-black text-[10px] uppercase tracking-wider">
          Ativo
        </Badge>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 text-slate-400 hover:text-orange-600 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 transition-all shadow-sm"
            onClick={() => onEdit(question)}
          >
            <Pencil size={15} />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 transition-all shadow-sm"
            onClick={() => onDelete(question.id)}
          >
            <Trash2 size={15} />
          </Button>
        </div>
      </td>
    </tr>
  )
}

export default function PerguntasPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedQuestion, setSelectedQuestion] =
    useState<WizardQuestion | null>(null)

  const { data, isLoading, refetch } = useWizardQuestionsControllerList({
    search: searchTerm
  })

  const wizardQuestions = data?.wizardQuestions ?? []

  const { mutate: deleteQuestion } = useWizardQuestionsControllerDeleteOne({
    mutation: {
      onSuccess: () => refetch()
    }
  })

  const handleDelete = (id: string) => {
    if (confirm('Deseja realmente arquivar esta pergunta?')) {
      deleteQuestion({ id })
    }
  }

  const handleEdit = (question: WizardQuestion) => {
    setSelectedQuestion(question)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setSelectedQuestion(null)
    setIsModalOpen(true)
  }

  const tableHeaders = [
    'Descrição da Pergunta',
    'Cód. Pergunta',
    'Configurações (Min/Max)',
    'Qtd. Opções',
    'Status',
    'Ações'
  ]

  return (
    <CatalogTableLayout.Root
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      isLoading={isLoading}
    >
      <CatalogTableLayout.Header
        title="Banco de Perguntas"
        description="Gerencie o fluxo de perguntas, complementos e combos do autoatendimento."
        totalCount={wizardQuestions.length}
        newButtonLabel="Nova Pergunta"
        onNewClick={handleCreate}
      />

      <CatalogTableLayout.Table
        headers={tableHeaders}
        isEmpty={wizardQuestions.length === 0}
        emptyState={
          <CatalogTableLayout.EmptyState
            icon={HelpCircle}
            title="Nenhuma pergunta encontrada"
            description="Crie perguntas globais para oferecer opcionais, escolher pontos de carne ou montar combos."
            buttonLabel="Criar minha primeira pergunta"
            onButtonClick={handleCreate}
          />
        }
      >
        {wizardQuestions.map((question) => (
          <QuestionRow
            key={question.id}
            question={question}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </CatalogTableLayout.Table>

      <WizardQuestionModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        question={selectedQuestion}
        onSuccess={() => refetch()}
      />
    </CatalogTableLayout.Root>
  )
}
