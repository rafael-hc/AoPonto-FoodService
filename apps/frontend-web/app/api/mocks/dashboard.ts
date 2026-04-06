export interface StatItem {
  title: string
  value: string
  trend: string
  isPositive: boolean
}

export interface RecentOrder {
  id: string
  customer: string
  items: string
  total: string
  status: 'novo' | 'preparando' | 'pronto' | 'concluido'
  time: string
}

export interface TopItem {
  name: string
  sales: number
  revenue: string
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
