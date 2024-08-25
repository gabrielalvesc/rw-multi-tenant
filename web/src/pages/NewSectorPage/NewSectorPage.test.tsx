import { render } from '@redwoodjs/testing/web'

import NewSectorPage from './NewSectorPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('NewSectorPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewSectorPage />)
    }).not.toThrow()
  })
})
