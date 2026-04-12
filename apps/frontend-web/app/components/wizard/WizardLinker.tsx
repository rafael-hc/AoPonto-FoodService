import { Badge, Button, Input } from '@aoponto/ui-kit'
import {
  ArrowDown,
  ArrowUp,
  ChevronRight,
  HelpCircle,
  Plus,
  Search,
  Trash2,
  X
} from 'lucide-react'
import React, { useMemo, useState } from 'react'
import { useWizardQuestionsControllerList } from '../../api/generated/wizard-questions-global-bank/wizard-questions-global-bank'
import {
  useProductWizardsControllerFetch,
  useProductWizardsControllerSync
} from '../../api/generated/product-wizards-linkage/product-wizards-linkage'
import { FetchWizardQuestionsResponseDtoWizardQuestionsItem } from '../../api/generated/model/fetchWizardQuestionsResponseDtoWizardQuestionsItem'

interface WizardLinkerProps {
  productId: string
}

export const WizardLinker: React.FC<WizardLinkerProps> = ({ productId }) => {
  const [search, setSearch] = useState('')

  // 1. Buscar perguntas globais
  const { data: globalBank, isLoading: isLoadingBank } =
    useWizardQuestionsControllerList({ search: '' })

  // 2. Buscar vínculos atuais
  const {
    data: currentLinks,
    isLoading: isLoadingLinks,
    refetch: refetchLinks
  } = useProductWizardsControllerFetch(productId)

  // 3. Mutação de Sincronização
  const { mutate: syncLinks, isPending: isSyncing } =
    useProductWizardsControllerSync({
      mutation: {
        onSuccess: () => {
          refetchLinks()
        }
      }
    })

  // Estado local para manipulação antes de salvar
  const [selectedQuestions, setSelectedQuestions] = useState<
    FetchWizardQuestionsResponseDtoWizardQuestionsItem[]
  >([])

  // Sincronizar estado local com os dados do banco quando carregarem
  React.useEffect(() => {
    if (currentLinks?.productWizards) {
      const sorted = [...currentLinks.productWizards]
        .sort((a, b) => a.order - b.order)
        .map((link) => link.wizardQuestion)
        .filter((q): q is FetchWizardQuestionsResponseDtoWizardQuestionsItem => !!q)
      
      setSelectedQuestions(sorted)
    }
  }, [currentLinks])

  // Filtragem do banco global (remove os já selecionados e aplica busca)
  const availableQuestions = useMemo(() => {
    if (!globalBank?.wizardQuestions) return []
    const selectedIds = new Set(selectedQuestions.map((q) => q.id))
    return globalBank.wizardQuestions.filter(
      (q) =>
        !selectedIds.has(q.id) &&
        q.description.toLowerCase().includes(search.toLowerCase())
    )
  }, [globalBank, selectedQuestions, search])

  // Ações
  const addQuestion = (question: FetchWizardQuestionsResponseDtoWizardQuestionsItem) => {
    setSelectedQuestions((prev) => [...prev, question])
  }

  const removeQuestion = (id: string) => {
    setSelectedQuestions((prev) => prev.filter((q) => q.id !== id))
  }

  const moveUp = (index: number) => {
    if (index === 0) return
    const newItems = [...selectedQuestions]
    const [movedItem] = newItems.splice(index, 1)
    newItems.splice(index - 1, 0, movedItem)
    setSelectedQuestions(newItems)
  }

  const moveDown = (index: number) => {
    if (index === selectedQuestions.length - 1) return
    const newItems = [...selectedQuestions]
    const [movedItem] = newItems.splice(index, 1)
    newItems.splice(index + 1, 0, movedItem)
    setSelectedQuestions(newItems)
  }

  const handleSave = () => {
    syncLinks({
      data: {
        productDetailId: productId,
        wizardQuestionIds: selectedQuestions.map((q) => q.id)
      }
    })
  }

  if (isLoadingBank || isLoadingLinks) {
    return (
      <div className="p-8 flex items-center justify-center space-x-2">
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-.3s]" />
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-.5s]" />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-slate-50/30 rounded-xl">
      <div className="grid grid-cols-2 gap-8 p-6 flex-1 overflow-hidden">
        {/* BANCO GLOBAL */}
        <div className="flex flex-col gap-4 overflow-hidden border-r border-slate-200 pr-8">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <HelpCircle size={18} className="text-orange-500" />
              Perguntas Disponíveis
            </h3>
            <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-tight">
              Banco Global
            </span>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Buscar pergunta..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none"
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {availableQuestions.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-slate-400 grayscale opacity-50">
                <Search size={32} strokeWidth={1.5} className="mb-2" />
                <p className="text-sm font-medium">Nenhuma pergunta encontrada</p>
              </div>
            ) : (
              availableQuestions.map((q) => (
                <div
                  key={q.id}
                  className="group p-3 bg-white border border-slate-200 rounded-xl hover:border-orange-300 hover:shadow-md hover:shadow-orange-500/5 transition-all cursor-default"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-bold text-slate-800 truncate mb-1">
                        {q.description}
                      </p>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-[9px] h-4 py-0 text-slate-500 lowercase">
                          min: {q.minResponses} • max: {q.maxResponses}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addQuestion(q)}
                      className="h-8 w-8 p-0 rounded-lg border-slate-200 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600 transition-all"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* SEQUÊNCIA DO PRODUTO */}
        <div className="flex flex-col gap-4 overflow-hidden">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <ChevronRight size={18} className="text-orange-500" />
              Sequência de Exibição
            </h3>
            <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-tight">
              {selectedQuestions.length} Perguntas
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {selectedQuestions.length === 0 ? (
              <div className="h-full border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 p-8">
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 mb-4">
                  <Plus size={24} className="text-orange-300" />
                </div>
                <p className="text-sm font-bold text-slate-600 text-center max-w-[200px]">
                  Selecione perguntas à esquerda para compor o Wizard deste item
                </p>
              </div>
            ) : (
              selectedQuestions.map((q, index) => (
                <div
                  key={q.id}
                  className="relative p-4 bg-white border border-orange-100 rounded-xl shadow-sm ring-1 ring-orange-500/5"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => moveUp(index)}
                        className={`p-1 rounded hover:bg-slate-100 transition-colors ${index === 0 ? 'text-slate-200 cursor-not-allowed' : 'text-slate-400 hover:text-orange-600'}`}
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        type="button"
                        disabled={index === selectedQuestions.length - 1}
                        onClick={() => moveDown(index)}
                        className={`p-1 rounded hover:bg-slate-100 transition-colors ${index === selectedQuestions.length - 1 ? 'text-slate-200 cursor-not-allowed' : 'text-slate-400 hover:text-orange-600'}`}
                      >
                        <ArrowDown size={14} />
                      </button>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="flex items-center justify-center w-5 h-5 bg-orange-600 text-white text-[10px] font-black rounded-lg">
                          {index + 1}
                        </span>
                        <p className="text-sm font-extrabold text-slate-900 tracking-tight">
                          {q.description}
                        </p>
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium">
                        Cód Interno: {q.internalCode}
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeQuestion(q.id)}
                      className="h-8 shadow-none border-transparent text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-100"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between rounded-b-xl">
        <p className="text-[11px] text-slate-500 italic max-w-[300px]">
          * Defina a ordem correta para guiar o cliente no autoatendimento.
        </p>
        <Button
          onClick={handleSave}
          disabled={isSyncing}
          className="px-8 shadow-lg shadow-orange-500/20"
        >
          {isSyncing ? 'Sincronizando...' : 'Confirmar Vínculos'}
        </Button>
      </div>
    </div>
  )
}
