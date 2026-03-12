import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './avatar'

const meta: Meta<typeof Avatar.Root> = {
  component: Avatar.Root,
  title: 'Components/Avatar',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Avatar.Root>

export const DefaultImage: Story = {
  render: () => (
    <Avatar.Root>
      <Avatar.Image
        src="https://api.dicebear.com/7.x/notionists/svg?seed=Admin&backgroundColor=f97316"
        alt="Avatar"
      />
      <Avatar.Fallback>AD</Avatar.Fallback>
    </Avatar.Root>
  )
}

export const FallbackOnly: Story = {
  render: () => (
    <Avatar.Root>
      <Avatar.Fallback>RA</Avatar.Fallback>
    </Avatar.Root>
  )
}

export const LargeAvatar: Story = {
  render: () => (
    <Avatar.Root className="h-20 w-20 text-2xl font-bold">
      <Avatar.Image
        src="https://api.dicebear.com/7.x/notionists/svg?seed=Manager"
        alt="Avatar"
      />
      <Avatar.Fallback>MG</Avatar.Fallback>
    </Avatar.Root>
  )
}
