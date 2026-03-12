import type { Meta, StoryObj } from '@storybook/react'
import { ChefHat, LogOut, Settings, ShoppingCart, Users } from 'lucide-react'
import { Avatar } from './avatar'
import { Sidebar } from './sidebar'

const meta: Meta<typeof Sidebar.Root> = {
  component: Sidebar.Root,
  title: 'Layout/Sidebar',
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Sidebar.Root>

export const Default: Story = {
  render: () => (
    <div className="h-screen bg-slate-50 flex">
      <Sidebar.Root>
        <Sidebar.Header>
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0">
            <ChefHat size={24} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight text-slate-900">
              AoPonto
            </h1>
            <p className="text-xs text-slate-500 font-medium">Food Service</p>
          </div>
        </Sidebar.Header>

        <Sidebar.Content>
          <Sidebar.GroupLabel>Menu Principal</Sidebar.GroupLabel>
          <Sidebar.Item active>
            <ShoppingCart size={20} className="text-orange-400" />
            Pedidos
          </Sidebar.Item>
          <Sidebar.Item>
            <Users size={20} />
            Equipe
          </Sidebar.Item>
          <Sidebar.Item>
            <Settings size={20} />
            Configurações
          </Sidebar.Item>
        </Sidebar.Content>

        <Sidebar.Footer>
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-50 border border-slate-100 mb-2">
            <Avatar.Root className="w-9 h-9">
              <Avatar.Fallback>AD</Avatar.Fallback>
            </Avatar.Root>
            <div className="text-left overflow-hidden">
              <p className="text-sm font-bold text-slate-800">Admin</p>
              <p className="text-xs text-slate-500">Gerente</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-medium">
            <LogOut size={16} />
            Sair
          </button>
        </Sidebar.Footer>
      </Sidebar.Root>
      <div className="flex-1 p-8">Conteúdo principal do sistema</div>
    </div>
  )
}
