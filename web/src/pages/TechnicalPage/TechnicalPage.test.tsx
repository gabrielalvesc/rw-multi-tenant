import { render } from '@redwoodjs/testing/web'

import TechnicalPage from './TechnicalPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TechnicalPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TechnicalPage />)
    }).not.toThrow()
  })
})
