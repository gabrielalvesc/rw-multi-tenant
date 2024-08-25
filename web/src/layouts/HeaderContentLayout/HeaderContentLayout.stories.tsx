import type { Meta, StoryObj } from '@storybook/react'

import ListLayout from './HeaderContentLayout'

const meta: Meta<typeof ListLayout> = {
  component: ListLayout,
}

export default meta

type Story = StoryObj<typeof ListLayout>

export const Primary: Story = {}
