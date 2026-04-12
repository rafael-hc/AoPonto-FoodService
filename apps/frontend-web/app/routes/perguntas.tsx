import { Badge, Button, Card } from '@aoponto/ui-kit'
import {
  HelpCircle,
  Plus,
  Search,
  Pencil,
  Trash2,
  Settings2,
  Layers,
  Info
} from 'lucide-react'
import { useState } from 'react'
import { useWizardQuestionsControllerList, useWizardQuestionsControllerDeleteOne } from '../api/generated/wizard-questions-global-bank/wizard-questions-global-bank'
import { FetchWizardQuestionsResponseDtoWizardQuestionsItem as WizardQuestion } from '../api/generated/model/fetchWizardQuestionsResponseDtoWizardQuestionsItem'
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
             <span>Respostas: {question.minResponses} a {question.maxResponses}</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
             <Layers size={12} className="text-slate-300" />
             <span>Itens: {question.minItems} a {question.maxItems}</span>
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
        <Badge
          className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 font-black text-[10px] uppercase tracking-wider"
        >
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

const LOADING_SKELETON_COUNT = [1, 2, 3, 4]

export default function PerguntasPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<WizardQuestion | null>(null)

  const { data, isLoading, refetch } = useWizardQuestionsControllerList({
     search: searchTerm
  })
  
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

  const wizardQuestions = data?.wizardQuestions ?? []
  
  return (
    <div className="flex flex-col h-full bg-slate-50/50 p-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Banco de Perguntas
            </h1>
            <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 uppercase font-black text-[10px] tracking-widest">
              Wizard Global
            </Badge>
          </div>
          <p className="text-slate-500 font-medium">
            Gerencie o fluxo de perguntas, complementos e combos do auto-atendimento.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Buscar por nome ou código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all w-full md:w-80 shadow-sm"
            />
          </div>

          <Button
            onClick={handleCreate}
            className="h-[46px] px-6 gap-2 shadow-xl shadow-orange-500/20 active:scale-95 transition-all text-sm font-bold"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Nova Pergunta</span>
          </Button>
        </div>
      </div>

      {/* Main Content Card */}
      <Card.Root className="overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/40 rounded-2xl bg-white">
        <div className="border-b border-slate-100 bg-orange-50/30 px-6 py-3 flex items-center gap-2">
           <Info size={14} className="text-orange-400" />
           <p className="text-[11px] font-bold text-orange-600 uppercase tracking-wider">
             Estas perguntas podem ser vinculadas a qualquer produto do catálogo.
           </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap min-w-[300px]">
                  Descrição da Pergunta
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
                  Cód. Pergunta
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
                  Configurações (Min/Max)
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
                  Qtd. Opções
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-32">
                  Status
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-32">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading
                ? LOADING_SKELETON_COUNT.map((skeletonKey) => (
                    <tr key={skeletonKey} className="animate-pulse bg-white border-b border-slate-50">
                      <td className="px-6 py-5">
                        <div className="flex gap-3 items-center">
                          <div className="h-8 w-8 bg-slate-100 rounded-lg" />
                          <div className="h-4 w-48 bg-slate-100 rounded" />
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="h-4 w-12 bg-slate-50 rounded" />
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col gap-1">
                          <div className="h-3 w-32 bg-slate-50 rounded" />
                          <div className="h-3 w-28 bg-slate-50 rounded" />
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="h-4 w-16 bg-blue-50/50 rounded" />
                      </td>
                      <td className="px-6 py-5">
                        <div className="h-4 w-12 bg-slate-100 rounded" />
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <div className="h-8 w-8 bg-slate-100 rounded-lg" />
                          <div className="h-8 w-8 bg-slate-100 rounded-lg" />
                        </div>
                      </td>
                    </tr>
                  ))
                : wizardQuestions.length > 0
                  ? wizardQuestions.map((question) => (
                      <QuestionRow
                        key={question.id}
                        question={question}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))
                  : null}
            </tbody>
          </table>
        </div>

        {!isLoading && wizardQuestions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
            <div className="w-20 h-20 bg-orange-50 text-orange-200 rounded-4xl flex items-center justify-center mb-6 transform rotate-6 scale-110 shadow-inner">
              <HelpCircle size={40} className="transform -rotate-6" />
            </div>
            <h3 className="text-slate-900 font-extrabold text-xl tracking-tight">
              Nenhuma pergunta cadastrada
            </h3>
            <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto leading-relaxed">
              Crie perguntas globais para oferecer opcionais, escolher pontos de carne ou montar combos.
            </p>
            <Button
              variant="outline"
              onClick={handleCreate}
              className="mt-8 border-slate-200 text-slate-700 hover:bg-slate-50 font-bold"
            >
              Começar Banco de Perguntas
            </Button>
          </div>
        )}
      </Card.Root>

      <WizardQuestionModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        question={selectedQuestion}
        onSuccess={() => refetch()}
      />
    </div>
  )
}
