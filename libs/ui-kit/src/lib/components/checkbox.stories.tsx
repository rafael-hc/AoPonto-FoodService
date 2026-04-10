import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './checkbox'

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Components/Checkbox',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    }
  }
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    label: 'Aceitar termos e condições'
  }
}

export const Checked: Story = {
  args: {
    label: 'Inscrição realizada',
    checked: true
  }
}

export const WithDescription: Story = {
  args: {
    label: 'Notificações por e-mail',
    description: 'Receba atualizações semanais sobre seus pedidos.',
    checked: true
  }
}

export const Disabled: Story = {
  args: {
    label: 'Opção indisponível',
    disabled: true
  }
}

export const DisabledChecked: Story = {
  args: {
    label: 'Opção travada',
    disabled: true,
    checked: true
  }
}
