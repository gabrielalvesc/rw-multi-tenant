import { render } from '@redwoodjs/testing/web'

import CitizensPage from './CitizensPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CitizensPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CitizensPage />)
    }).not.toThrow()
  })
})
