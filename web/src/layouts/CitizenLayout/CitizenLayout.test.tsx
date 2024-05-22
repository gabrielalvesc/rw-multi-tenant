import { render } from '@redwoodjs/testing/web'

import CitizenLayout from './CitizenLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CitizenLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CitizenLayout />)
    }).not.toThrow()
  })
})
