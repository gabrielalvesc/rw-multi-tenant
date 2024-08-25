import type { Meta, StoryObj } from '@storybook/react'

import NewSectorPage from './NewSectorPage'

const meta: Meta<typeof NewSectorPage> = {
  component: NewSectorPage,
}

export default meta

type Story = StoryObj<typeof NewSectorPage>

export const Primary: Story = {}
