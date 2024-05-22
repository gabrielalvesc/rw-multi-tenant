import { render } from '@redwoodjs/testing/web'

import PublicAgentLayout from './PublicAgentLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PublicAgentLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PublicAgentLayout />)
    }).not.toThrow()
  })
})
