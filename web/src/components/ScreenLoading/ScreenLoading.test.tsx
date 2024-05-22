import { render } from '@redwoodjs/testing/web'

import ScreenLoading from './ScreenLoading'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ScreenLoading', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ScreenLoading />)
    }).not.toThrow()
  })
})
