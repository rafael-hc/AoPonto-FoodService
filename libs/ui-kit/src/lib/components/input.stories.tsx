import type { Meta, StoryObj } from '@storybook/react'
import { Mail, Search, User as UserIcon } from 'lucide-react'
import { Input } from './input'

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'Components/Input',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Input>

// História de Componente Legado / Base (compatibilidade)
export const Default: Story = {
  args: {
    placeholder: 'Digite algo...'
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Apenas leitura...',
    value: 'Inalterável'
  }
}

export const WithPasswordType: Story = {
  args: {
    type: 'password',
    defaultValue: 'senhasecreta'
  }
}

// Histórias usando o novo padrão de Composição
export const CompositionPattern = () => (
  <Input.Wrapper className="w-[300px]">
    <Input.Label htmlFor="composite-input">
      <UserIcon size={12} />
      Nome de Usuário
    </Input.Label>
    <Input.Root>
      <Input.Control id="composite-input" placeholder="seu.login" />
    </Input.Root>
  </Input.Wrapper>
)

export const CompositionWithError = () => (
  <Input.Wrapper className="w-[300px]">
    <Input.Label htmlFor="error-input">E-mail</Input.Label>
    <Input.Root error>
      <Input.Control
        id="error-input"
        type="email"
        defaultValue="email-invalido"
      />
    </Input.Root>
    <Input.Message>Formato de e-mail incorreto.</Input.Message>
  </Input.Wrapper>
)

export const CompositionWithIcon = () => (
  <div className="flex flex-col gap-4">
    <Input.Wrapper className="w-[300px]">
      <Input.Root>
        <Input.Icon>
          <Search size={16} />
        </Input.Icon>
        <Input.Control placeholder="Pesquisar..." />
      </Input.Root>
    </Input.Wrapper>

    <Input.Wrapper className="w-[300px]">
      <Input.Label htmlFor="icon-email">
        <Mail size={12} /> E-mail de Contato
      </Input.Label>
      <Input.Root>
        <Input.Control id="icon-email" placeholder="contato@exemplo.com" />
      </Input.Root>
    </Input.Wrapper>
  </div>
)
