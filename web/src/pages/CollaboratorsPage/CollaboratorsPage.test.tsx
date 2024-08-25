import { render } from '@redwoodjs/testing/web'

import CollaboratorsPage from './CollaboratorsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CollaboratorsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CollaboratorsPage />)
    }).not.toThrow()
  })
})
