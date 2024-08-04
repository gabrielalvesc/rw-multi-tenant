import { render } from '@redwoodjs/testing/web'

import ListLayout from './ListLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ListLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ListLayout />)
    }).not.toThrow()
  })
})
