import type { Meta, StoryObj } from '@storybook/react'

import CitizensPage from './CitizensPage'

const meta: Meta<typeof CitizensPage> = {
  component: CitizensPage,
}

export default meta

type Story = StoryObj<typeof CitizensPage>

export const Primary: Story = {}
