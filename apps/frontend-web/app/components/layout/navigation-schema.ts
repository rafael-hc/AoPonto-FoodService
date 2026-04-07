import {
  Armchair,
  ArrowLeftRight,
  ArrowRightLeft,
  Award,
  BarChart2,
  Bell,
  Bookmark,
  CalendarClock,
  CalendarDays,
  Carrot,
  Clock,
  CreditCard,
  DatabaseBackup,
  DollarSign,
  Edit3,
  FileBadge,
  FileCode,
  FileSignature,
  FileSpreadsheet,
  FileText,
  Globe,
  Hash,
  HelpCircle,
  History,
  KeyRound,
  LayoutDashboard,
  LifeBuoy,
  ListTodo,
  MapPin,
  MessageCircle,
  MessageSquare,
  MonitorSmartphone,
  MonitorUp,
  Network,
  Package,
  Percent,
  Phone,
  PieChart,
  PlusCircle,
  Printer,
  QrCode,
  Ruler,
  Scale,
  ScrollText,
  Server,
  Settings,
  Smartphone,
  SquareTerminal,
  Stethoscope,
  Store,
  Tags,
  Ticket,
  Trophy,
  Truck,
  User,
  Users,
  UsersRound,
  Wallet,
  Wifi
} from 'lucide-react'
import type { ModuleConfigMap } from './types'

export const modulesConfig: ModuleConfigMap = {
  principal: {
    id: 'principal',
    title: 'Principal',
    icon: LayoutDashboard,
    groups: [
      {
        name: 'Caixa',
        items: [
          {
            name: 'Abrir / Fechar',
            icon: Store,
            id: 'dashboard',
            actionType: 'modal'
          }
        ]
      },
      {
        name: 'Pedidos',
        items: [
          {
            name: 'Mesas / Comandas',
            icon: Armchair,
            shortcut: 'F3',
            id: 'pedidos'
          },
          { name: 'Delivery', icon: Truck, shortcut: 'F4' },
          { name: 'Caixa / PDV', icon: MonitorSmartphone, shortcut: 'F5' },
          { name: 'Fila de Atendimento', icon: Users },
          { name: 'Agendados', icon: CalendarClock },
          { name: 'Cardápio Digital', icon: Smartphone }
        ]
      },
      {
        name: 'Clientes',
        items: [{ name: 'Clientes', icon: User, shortcut: 'F11' }]
      },
      {
        name: 'Atendimento',
        items: [{ name: 'Bot WhatsApp', icon: MessageCircle }]
      }
    ]
  },
  produtos: {
    id: 'produtos',
    title: 'Produtos',
    icon: Package,
    groups: [
      {
        name: 'Produtos',
        items: [
          {
            name: 'Produtos',
            icon: Package,
            id: 'produtos',
            actionType: 'route'
          }
        ]
      },
      {
        name: 'Organização de Produtos',
        items: [
          {
            name: 'Complementos',
            icon: PlusCircle,
            id: 'complementos',
            actionType: 'route'
          },
          { name: 'Observações', icon: FileText },
          {
            name: 'Categorias',
            icon: Tags,
            id: 'labels',
            actionType: 'route'
          },
          {
            name: 'Tipos de Produto',
            icon: Ruler,
            id: 'tipos-produto',
            actionType: 'route'
          },
          { name: 'Perguntas', icon: HelpCircle }
        ]
      },
      {
        name: 'Insumos',
        items: [
          { name: 'Insumos', icon: Carrot },
          { name: 'Categorias', icon: Network }
        ]
      },
      {
        name: 'Estoque',
        items: [
          { name: 'Alterar em Lote', icon: Edit3 },
          { name: 'Alterar com NFe', icon: FileCode }
        ]
      }
    ]
  },
  marketing: {
    id: 'marketing',
    title: 'Marketing',
    icon: Percent,
    groups: [
      {
        name: 'Benefícios',
        items: [
          { name: 'Promoções', icon: Percent },
          { name: 'Fidelidade', icon: Award },
          { name: 'Cupons', icon: Ticket }
        ]
      },
      { name: 'Divulgação', items: [{ name: 'SMS', icon: MessageSquare }] },
      {
        name: 'Relacionamento',
        items: [{ name: 'Disparador Intelig.', icon: Bell }]
      }
    ]
  },
  financeiro: {
    id: 'financeiro',
    title: 'Financeiro',
    icon: CreditCard,
    permissions: ['module:financeiro'],
    groups: [
      {
        name: 'Organização de Contas',
        items: [
          { name: 'Formas de Pagam.', icon: CreditCard },
          { name: 'Categoria de Contas', icon: Bookmark },
          { name: 'Fornecedores', icon: Truck }
        ]
      },
      {
        name: 'Contas a Pagar / Receber',
        items: [
          { name: 'Contas a Pagar', icon: ArrowRightLeft },
          { name: 'Contas a Receber', icon: ArrowRightLeft }
        ]
      },
      { name: 'Fiado', items: [{ name: 'Conta Corrente', icon: Wallet }] },
      { name: 'Integrações', items: [{ name: 'Pix Online', icon: QrCode }] }
    ]
  },
  relatorios: {
    id: 'relatorios',
    title: 'Relatórios',
    icon: BarChart2,
    groups: [
      {
        name: 'Vendas',
        items: [
          { name: 'Mais Vendidos', icon: Trophy },
          { name: 'Hist. de Pedidos', icon: History },
          { name: 'Hist. Itens Vendidos', icon: History },
          { name: 'Rank Atendimentos', icon: Users }
        ]
      },
      { name: 'Caixa', items: [{ name: 'Hist. do Caixa', icon: Clock }] },
      {
        name: 'Financeiro',
        items: [
          { name: 'Meu Negócio', icon: BarChart2 },
          { name: 'Meu Delivery', icon: PieChart },
          { name: 'Recebimentos', icon: DollarSign },
          { name: 'Resumo Financeiro', icon: FileSpreadsheet },
          { name: 'DRE Simplificado', icon: FileText }
        ]
      },
      {
        name: 'Estoque',
        items: [
          { name: 'Entradas e Saídas', icon: ArrowLeftRight },
          { name: 'Posição por Data', icon: CalendarDays }
        ]
      }
    ]
  },
  apps: {
    id: 'apps',
    title: 'Apps',
    icon: Globe,
    groups: [
      {
        name: 'Ferramentas',
        items: [
          { name: 'Bina', icon: Phone },
          { name: 'Mapas', icon: MapPin },
          { name: 'Painel de Senhas', icon: SquareTerminal },
          { name: 'Balança', icon: Scale }
        ]
      },
      {
        name: 'Módulos (Recursos Premium)',
        items: [
          { name: 'Mobile', icon: Smartphone },
          { name: 'Pedidos Online', icon: Globe },
          { name: 'Totem', icon: MonitorUp },
          { name: 'Connect', icon: Wifi },
          { name: 'Emissão Fiscal', icon: FileBadge },
          { name: 'TEF', icon: CreditCard }
        ]
      }
    ]
  },
  configuracoes: {
    id: 'configuracoes',
    title: 'Configurações',
    icon: Settings,
    permissions: ['module:configuracoes'],
    groups: [
      {
        name: 'Configurações',
        items: [
          {
            name: 'Config. do Sistema',
            icon: Settings,
            id: 'system-settings',
            actionType: 'modal'
          },
          { name: 'Numeração Pedidos', icon: Hash },
          {
            name: 'Impressora',
            icon: Printer,
            id: 'cozinhas',
            actionType: 'route'
          },
          {
            name: 'Colaboradores',
            icon: UsersRound,
            id: 'colaboradores',
            actionType: 'route'
          },
          { name: 'Alterar Senha', icon: KeyRound },
          { name: 'Backup', icon: DatabaseBackup }
        ]
      },
      {
        name: 'Rede - Servidor',
        items: [{ name: 'Info do Servidor', icon: Server }]
      },
      {
        name: 'Logs e Eventos',
        items: [
          { name: 'Logs', icon: ScrollText },
          { name: 'Fila de Eventos', icon: ListTodo }
        ]
      },
      {
        name: 'Versão Premium',
        items: [{ name: 'Minha Assinatura', icon: FileSignature }]
      },
      {
        name: 'Ajuda e Suporte',
        items: [
          { name: 'Ajuda e Suporte', icon: LifeBuoy },
          { name: 'Diagnóstico', icon: Stethoscope }
        ]
      }
    ]
  }
}
