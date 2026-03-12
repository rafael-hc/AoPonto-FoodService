import type { Meta, StoryObj } from '@storybook/react'
import { Topbar } from './topbar'
import { Input } from './input'
import { Search, Bell, MenuSquare } from 'lucide-react'

const meta: Meta<typeof Topbar.Root> = {
  component: Topbar.Root,
  title: 'Layout/Topbar',
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Topbar.Root>

export const Default: Story = {
  render: () => (
    <div className="bg-slate-50 h-64 p-4">
      <Topbar.Root>
        <Topbar.Title>
          <MenuSquare size={24} className="text-orange-500" />
          Módulo de Caixa
        </Topbar.Title>
        <Topbar.Actions>
          <div className="relative w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10"
              size={16}
            />
            <Input
              type="text"
              placeholder="Pesquisar..."
              className="pl-9 bg-slate-100 border-transparent focus:bg-white text-sm"
            />
          </div>
          <div className="w-px h-6 bg-slate-200"></div>
          <button className="relative p-2 text-slate-400 hover:text-orange-500 rounded-lg hover:bg-orange-50 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white"></span>
          </button>
        </Topbar.Actions>
      </Topbar.Root>
    </div>
  )
}
