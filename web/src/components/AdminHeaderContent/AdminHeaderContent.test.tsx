import { render } from '@redwoodjs/testing/web'

import AdminHeaderContent from './AdminHeaderContent'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AdminHeaderContent', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminHeaderContent />)
    }).not.toThrow()
  })
})
