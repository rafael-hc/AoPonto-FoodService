import {
  LayoutDashboard,
  Package,
  Percent,
  CreditCard,
  BarChart2,
  Globe,
  Settings,
  Store,
  Armchair,
  Truck,
  MonitorSmartphone,
  Users,
  CalendarClock,
  Smartphone,
  User,
  MessageCircle,
  PlusCircle,
  FileText,
  Tags,
  Ruler,
  HelpCircle,
  Carrot,
  Network,
  Edit3,
  FileCode,
  Award,
  Ticket,
  MessageSquare,
  Bell,
  Bookmark,
  ArrowRightLeft,
  Wallet,
  QrCode,
  Trophy,
  History,
  DollarSign,
  FileSpreadsheet,
  ArrowLeftRight,
  CalendarDays,
  PieChart,
  Phone,
  MapPin,
  SquareTerminal,
  Scale,
  MonitorUp,
  Wifi,
  FileBadge,
  Hash,
  Printer,
  UsersRound,
  KeyRound,
  DatabaseBackup,
  Server,
  ScrollText,
  ListTodo,
  FileSignature,
  LifeBuoy,
  Stethoscope,
  Clock
} from 'lucide-react'
import { ModuleConfigMap, StatItem, RecentOrder, TopItem } from './types'

export const modulesConfig: ModuleConfigMap = {
  principal: {
    id: 'principal',
    title: 'Principal',
    icon: LayoutDashboard,
    groups: [
      {
        name: 'Caixa',
        items: [{ name: 'Abrir / Fechar', icon: Store, id: 'dashboard' }]
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
      { name: 'Produtos', items: [{ name: 'Produtos', icon: Package }] },
      {
        name: 'Organização de Produtos',
        items: [
          { name: 'Complementos', icon: PlusCircle },
          { name: 'Observações', icon: FileText },
          { name: 'Categorias', icon: Tags },
          { name: 'Tipos e Tamanhos', icon: Ruler },
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
    groups: [
      {
        name: 'Configurações',
        items: [
          { name: 'Config. do Sistema', icon: Settings },
          { name: 'Numeração Pedidos', icon: Hash },
          { name: 'Impressora', icon: Printer },
          { name: 'Colaboradores', icon: UsersRound },
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

export const stats: StatItem[] = [
  {
    title: 'Receita Hoje',
    value: 'R$ 4.250,00',
    trend: '+12.5%',
    isPositive: true
  },
  {
    title: 'Pedidos Realizados',
    value: '142',
    trend: '+5.2%',
    isPositive: true
  },
  {
    title: 'Ticket Médio',
    value: 'R$ 85,90',
    trend: '-1.4%',
    isPositive: false
  },
  { title: 'Mesas Ocupadas', value: '12 / 20', trend: 'Alta', isPositive: true }
]

export const recentOrders: RecentOrder[] = [
  {
    id: '#1042',
    customer: 'Mesa 04',
    items: '2x Burger AoPonto, 1x Fritas',
    total: 'R$ 115,00',
    status: 'preparando',
    time: '12 min'
  },
  {
    id: '#1043',
    customer: 'Delivery (João P.)',
    items: '1x Salada Caesar, 1x Suco Laranja',
    total: 'R$ 45,00',
    status: 'novo',
    time: '2 min'
  },
  {
    id: '#1041',
    customer: 'Mesa 12',
    items: '1x Risoto de Funghi, 1x Vinho Tinto',
    total: 'R$ 189,00',
    status: 'pronto',
    time: '25 min'
  },
  {
    id: '#1040',
    customer: 'Takeaway (Maria Silva)',
    items: '3x Coxinha Premium',
    total: 'R$ 36,00',
    status: 'concluido',
    time: '30 min'
  },
  {
    id: '#1044',
    customer: 'Mesa 07',
    items: '1x Picanha na Chapa (Para 2)',
    total: 'R$ 210,00',
    status: 'preparando',
    time: '15 min'
  }
]

export const topItems: TopItem[] = [
  { name: 'Burger AoPonto', sales: 45, revenue: 'R$ 2.205,00' },
  { name: 'Risoto de Funghi', sales: 28, revenue: 'R$ 1.932,00' },
  { name: 'Fritas Rústicas', sales: 62, revenue: 'R$ 1.116,00' }
]
